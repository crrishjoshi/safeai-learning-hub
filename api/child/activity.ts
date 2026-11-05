import { requireRole, type HeaderRequest } from '../_lib/auth.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'

type RequestLike = HeaderRequest & { method?: string }

export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'GET') return json(response, 405, { error: 'method_not_allowed' })
  try {
    const auth = await requireRole(request, 'child')
    if (!auth.ok) return json(response, auth.status, { error: auth.error })
    const client = auth.user.client
    const [{ data: messages, error: messagesError }, { data: safetyEvents, error: safetyEventsError }, { data: approvals, error: approvalError }, { data: settings, error: settingsError }, { data: notifications, error: notificationsError }] = await Promise.all([
      client.from('chat_messages').select('id, direction, safety_state, content, created_at').eq('child_id', auth.user.userId).order('created_at', { ascending: false }).limit(200),
      client.from('safety_events').select('id, state, created_at').eq('child_id', auth.user.userId).eq('state', 'urgent').order('created_at', { ascending: false }).limit(50),
      client.from('approval_requests').select('id, category, status, resolved_at').eq('child_id', auth.user.userId).order('created_at', { ascending: false }).limit(50),
      client.from('access_settings').select('chatbot_paused').eq('child_id', auth.user.userId).maybeSingle(),
      client.from('family_notifications').select('id, kind, title, body, read_at, created_at').eq('child_id', auth.user.userId).eq('recipient_role', 'child').order('created_at', { ascending: false }).limit(20),
    ])
    if (messagesError || safetyEventsError || approvalError || settingsError || notificationsError) return json(response, 502, { error: 'family_backend_unavailable' })
    const history = [
      ...(messages ?? []).filter((message) => message.direction === 'child').map((message) => ({
        id: message.id,
        childId: auth.user.userId,
        state: message.safety_state,
        title: message.safety_state === 'allowed' ? 'Learning question' : message.safety_state === 'safe-support' ? 'Sensitive topic' : message.safety_state === 'approval' ? 'Parent review requested' : 'Safety boundary used',
        summary: message.content,
        time: message.created_at,
      })),
      ...(safetyEvents ?? []).map((event) => ({
        id: event.id,
        childId: auth.user.userId,
        state: event.state,
        title: 'Protected support receipt',
        summary: 'A protected support flow was recorded without saving the disclosure text.',
        time: event.created_at,
      })),
    ].sort((left, right) => new Date(right.time).getTime() - new Date(left.time).getTime())
    return json(response, 200, { history, approvals: approvals ?? [], chatPaused: Boolean(settings?.chatbot_paused), notifications: (notifications ?? []).map((notification) => ({ id: notification.id, kind: notification.kind, title: notification.title, body: notification.body, readAt: notification.read_at, time: notification.created_at })) })
  } catch {
    return json(response, 500, { error: 'internal_error' })
  }
}

