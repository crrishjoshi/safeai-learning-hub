import { requireRole, serviceClient, type HeaderRequest } from '../_lib/auth.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'
import { createNotification } from '../_lib/operations.js'
import { PARENT_SAFETY_RULES } from '../../packages/shared/src/safety.js'

type RequestLike = HeaderRequest & { method?: string; body?: unknown }
type Body = { childId?: unknown; chatbotPaused?: unknown; ordinaryNotifications?: unknown; flaggedNotifications?: unknown; blockedTopics?: unknown }

export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'POST') return json(response, 405, { error: 'method_not_allowed' })
  try {
    const auth = await requireRole(request, 'parent')
    if (!auth.ok) return json(response, auth.status, { error: auth.error })
    const body = (request.body && typeof request.body === 'object' ? request.body : {}) as Body
    const childId = typeof body.childId === 'string' ? body.childId : ''
    if (!/^[0-9a-f-]{36}$/i.test(childId)) return json(response, 400, { error: 'invalid_child' })
    const allowedTopics = new Set(PARENT_SAFETY_RULES.map((rule) => rule.id))
    const blockedTopics = Array.isArray(body.blockedTopics)
      ? [...new Set(body.blockedTopics.filter((topic): topic is string => typeof topic === 'string' && allowedTopics.has(topic as typeof PARENT_SAFETY_RULES[number]['id'])))]
      : []
    const values = {
      family_id: auth.user.familyId,
      child_id: childId,
      chatbot_paused: Boolean(body.chatbotPaused),
      ordinary_notifications: Boolean(body.ordinaryNotifications),
      flagged_notifications: Boolean(body.flaggedNotifications),
      blocked_topics: blockedTopics,
    }
    const { data: child } = await auth.user.client.from('child_profiles').select('user_id').eq('family_id', auth.user.familyId).eq('user_id', childId).maybeSingle()
    if (!child) return json(response, 404, { error: 'child_not_found' })
    const { error } = await auth.user.client.from('access_settings').upsert(values, { onConflict: 'family_id,child_id' })
    if (error) return json(response, 502, { error: 'family_backend_unavailable' })
    await createNotification(serviceClient(), { familyId: auth.user.familyId, childId, recipientRole: 'child', kind: 'access-change', title: values.chatbot_paused ? 'Chat access is paused' : 'Chat access is available', body: values.chatbot_paused ? 'Your parent has paused chat. Lessons and help remain available.' : 'Your parent has enabled chat again.' })
    return json(response, 200, { updated: true, settings: values })
  } catch {
    return json(response, 500, { error: 'internal_error' })
  }
}

