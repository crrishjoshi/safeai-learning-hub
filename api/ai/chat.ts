import { requireRole, serviceClient, type HeaderRequest } from '../_lib/auth.js'
import { generateProviderText, readProviderCredential, ProviderRequestError } from '../_lib/ai-provider.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'
import { classifySafety, outcomeForState } from '../../packages/shared/src/safety.js'
import { createNotification, incrementMetric } from '../_lib/operations.js'

type RequestLike = HeaderRequest & { method?: string; body?: unknown }

const QUESTION_LIMIT = 300
// Shown when a saved provider fails; the prepared "connection is switched off"
// text would be wrong here.
const providerFailureText = (code: string) => code === 'provider_authentication_failed' || code === 'provider_quota_exceeded'
  ? 'I could not get an answer from the AI helper because its connection needs checking. Ask your parent or guardian to look at Parent Settings.'
  : 'The AI helper is very busy right now, so I could not answer this one. Please send your question again in a moment.'
const fallbackSummary = (state: string) => state === 'allowed' ? 'Learning question answered.' : state === 'safe-support' ? 'Sensitive personal topic handled with adult-support guidance.' : 'SafeAI applied a safety boundary.'

async function recordOutcome(service: ReturnType<typeof serviceClient>, familyId: string, childId: string, question: string, state: ReturnType<typeof classifySafety>, assistantText: string, title: string, saveQuestion: boolean) {
  if (!service) return
  if (state === 'urgent' || state === 'blocked') {
    const { data: event } = await service.from('safety_events').insert({ family_id: familyId, child_id: childId, state, category: state === 'urgent' ? 'protected-escalation' : 'blocked-request', context_summary: state === 'urgent' ? '' : 'A blocked safety category was detected.', protected: state === 'urgent' }).select('id').maybeSingle()
    if (state === 'urgent' && event?.id) {
      await service.rpc('create_safeguarding_case', { target_safety_event_id: event.id, target_family_id: familyId, target_child_id: childId })
    }
    await incrementMetric(service, familyId, state === 'urgent' ? 'urgent_count' : 'blocked_count')
    if (state === 'blocked') await createNotification(service, { familyId, childId, recipientRole: 'parent', kind: 'safety-flag', title: 'A safety boundary was used', body: 'A linked child question was blocked without saving its wording.' })
    // Blocked requests still receive a durable, redacted conversation receipt so
    // the child and parent can see that an attempt occurred. The prompt itself
    // never enters history. Urgent disclosures remain only in the protected
    // safety channel and are intentionally excluded from ordinary chat history.
    if (state === 'blocked') {
      await service.from('chat_messages').insert([
        { family_id: familyId, child_id: childId, direction: 'child', safety_state: state, content: fallbackSummary(state) },
        { family_id: familyId, child_id: childId, direction: 'assistant', safety_state: state, content: assistantText },
      ])
    }
    return
  }
  if (state === 'approval') {
    await service.from('approval_requests').insert({ family_id: familyId, child_id: childId, category: title, context_summary: 'A sensitive topic needs parent or guardian review.' })
    await incrementMetric(service, familyId, 'approval_count')
    await createNotification(service, { familyId, childId, recipientRole: 'parent', kind: 'approval-created', title: 'A parent review is waiting', body: 'A sensitive topic from a linked child is waiting in the approval centre. The child wording is not included in this notification.' })
  }
  await incrementMetric(service, familyId, state === 'allowed' ? 'allowed_count' : 'support_count')
  const childContent = saveQuestion ? question : fallbackSummary(state)
  await service.from('chat_messages').insert([
    { family_id: familyId, child_id: childId, direction: 'child', safety_state: state, content: childContent },
    { family_id: familyId, child_id: childId, direction: 'assistant', safety_state: state, content: assistantText },
  ])
}

export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'POST') return json(response, 405, { error: 'method_not_allowed' })
  try {
    const auth = await requireRole(request, 'child')
    if (!auth.ok) return json(response, auth.status, { error: auth.error })
    const body = (request.body && typeof request.body === 'object' ? request.body : {}) as { question?: unknown }
    const question = typeof body.question === 'string' ? body.question.trim() : ''
    if (!question || question.length > QUESTION_LIMIT) return json(response, 400, { error: 'invalid_question' })

    const { data: access } = await auth.user.client.from('access_settings').select('chatbot_paused, blocked_topics').eq('family_id', auth.user.familyId).eq('child_id', auth.user.userId).maybeSingle()
    if (access?.chatbot_paused) return json(response, 423, { error: 'chat_paused' })

    const state = classifySafety(question, Array.isArray(access?.blocked_topics) ? access.blocked_topics : [])
    const outcome = outcomeForState(state)
    const service = serviceClient()
    if (state === 'urgent' || state === 'blocked' || state === 'approval') {
      await recordOutcome(service, auth.user.familyId, auth.user.userId, question, state, outcome.response, outcome.title, false)
      return json(response, 200, { outcome, assistantText: outcome.response, providerConfigured: false })
    }

    let assistantText = outcome.response
    let providerConfigured = false
    if (service) {
      const credential = await readProviderCredential(service, auth.user.familyId)
      if (credential) {
        providerConfigured = true
        try {
          assistantText = await generateProviderText(credential.provider, credential.apiKey, question)
          const outputState = classifySafety(assistantText)
          if (outputState === 'urgent' || outputState === 'blocked') assistantText = outcome.response
        } catch (caught) {
          const code = caught instanceof ProviderRequestError ? caught.code : 'provider_request_failed'
          // Only a rejected key disables the provider; rate limits, timeouts and
          // outages are transient and must not switch the family to fallback.
          if (code === 'provider_authentication_failed') await service.from('provider_settings').update({ status: 'error' }).eq('family_id', auth.user.familyId)
          const failureText = state === 'allowed' ? providerFailureText(code) : outcome.response
          await recordOutcome(service, auth.user.familyId, auth.user.userId, question, state, failureText, outcome.title, true)
          return json(response, 502, { error: code, outcome, assistantText: failureText, providerConfigured: true })
        }
      }
    }
    await recordOutcome(service, auth.user.familyId, auth.user.userId, question, state, assistantText, outcome.title, true)
    return json(response, 200, { outcome, assistantText, providerConfigured })
  } catch {
    return json(response, 500, { error: 'internal_error' })
  }
}
