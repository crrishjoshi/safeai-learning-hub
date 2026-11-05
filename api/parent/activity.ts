import { requireRole, type HeaderRequest } from '../_lib/auth.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'

type RequestLike = HeaderRequest & { method?: string }

export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'GET') return json(response, 405, { error: 'method_not_allowed' })
  try {
    const auth = await requireRole(request, 'parent')
    if (!auth.ok) return json(response, auth.status, { error: auth.error })
    const client = auth.user.client
    const [{ data: children, error: childrenError }, { data: messages, error: messagesError }, { data: approvals, error: approvalsError }, { data: decisions, error: decisionsError }, { data: alerts, error: alertsError }, { data: access, error: accessError }, { data: notifications, error: notificationsError }, { data: metrics, error: metricsError }] = await Promise.all([
      client.from('child_profiles').select('user_id, display_name').eq('family_id', auth.user.familyId),
      client.from('chat_messages').select('id, child_id, direction, safety_state, content, created_at').eq('family_id', auth.user.familyId).order('created_at', { ascending: false }).limit(200),
      client.from('approval_requests').select('id, child_id, category, context_summary, status, created_at, resolved_at').eq('family_id', auth.user.familyId).order('created_at', { ascending: false }).limit(100),
      client.from('parent_decisions').select('approval_request_id, decision, note, created_at').order('created_at', { ascending: false }).limit(100),
      client.from('safety_events').select('id, child_id, state, category, context_summary, protected, created_at').eq('family_id', auth.user.familyId).order('created_at', { ascending: false }).limit(100),
      client.from('access_settings').select('child_id, chatbot_paused, ordinary_notifications, flagged_notifications, blocked_topics').eq('family_id', auth.user.familyId),
      client.from('family_notifications').select('id, child_id, kind, title, body, read_at, created_at').eq('family_id', auth.user.familyId).eq('recipient_role', 'parent').order('created_at', { ascending: false }).limit(50),
      client.from('family_metrics').select('allowed_count, support_count, approval_count, blocked_count, urgent_count, lessons_started, updated_at').eq('family_id', auth.user.familyId).maybeSingle(),
    ])
    if (childrenError || messagesError || approvalsError || decisionsError || alertsError || accessError || notificationsError || metricsError) return json(response, 502, { error: 'family_backend_unavailable' })
    const names = new Map((children ?? []).map((child) => [child.user_id, child.display_name]))
    const decisionByRequest = new Map((decisions ?? []).map((decision) => [decision.approval_request_id, decision]))
    const history = (messages ?? []).filter((message) => message.direction === 'child').map((message) => ({
      id: message.id,
      childId: message.child_id,
      state: message.safety_state,
      title: message.safety_state === 'allowed' ? 'Learning question' : message.safety_state === 'safe-support' ? 'Sensitive topic' : 'Safety decision',
      summary: message.content,
      time: message.created_at,
      childName: names.get(message.child_id) ?? 'Linked child',
    }))
    const approvalRows = (approvals ?? []).map((approval) => {
      const decision = decisionByRequest.get(approval.id)
      return {
        id: approval.id,
        childId: approval.child_id,
        childName: names.get(approval.child_id) ?? 'Linked child',
        category: approval.category,
        contextSummary: approval.context_summary,
        status: decision?.decision ?? approval.status,
        time: approval.created_at,
        note: decision?.note ?? undefined,
      }
    })
    return json(response, 200, {
      history,
      approvals: approvalRows,
      alerts: (alerts ?? []).map((alert) => ({ id: alert.id, childId: alert.child_id, childName: names.get(alert.child_id) ?? 'Linked child', state: alert.state, category: alert.category, contextSummary: alert.context_summary, protected: alert.protected, time: alert.created_at })),
      access: (access ?? []).map((row) => ({ childId: row.child_id, chatbotPaused: Boolean(row.chatbot_paused), ordinaryNotifications: Boolean(row.ordinary_notifications), flaggedNotifications: Boolean(row.flagged_notifications), blockedTopics: Array.isArray(row.blocked_topics) ? row.blocked_topics : [] })),
      notifications: (notifications ?? []).map((notification) => ({ id: notification.id, childId: notification.child_id ?? null, childName: notification.child_id ? names.get(notification.child_id) ?? 'Linked child' : null, kind: notification.kind, title: notification.title, body: notification.body, readAt: notification.read_at, time: notification.created_at })),
      metrics: metrics ?? { allowed_count: 0, support_count: 0, approval_count: 0, blocked_count: 0, urgent_count: 0, lessons_started: 0, updated_at: null },
    })
  } catch {
    return json(response, 500, { error: 'internal_error' })
  }
}

