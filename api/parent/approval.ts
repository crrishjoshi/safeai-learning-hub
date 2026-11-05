import { requireRole, serviceClient, type HeaderRequest } from '../_lib/auth.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'
import { createNotification } from '../_lib/operations.js'

type RequestLike = HeaderRequest & { method?: string; body?: unknown }
type Body = { approvalId?: unknown; status?: unknown; note?: unknown }
const STATUSES = new Set(['approved', 'rejected', 'discuss-later'])

export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'POST') return json(response, 405, { error: 'method_not_allowed' })
  try {
    const auth = await requireRole(request, 'parent')
    if (!auth.ok) return json(response, auth.status, { error: auth.error })
    const body = (request.body && typeof request.body === 'object' ? request.body : {}) as Body
    const approvalId = typeof body.approvalId === 'string' ? body.approvalId : ''
    const status = typeof body.status === 'string' ? body.status : ''
    const note = typeof body.note === 'string' ? body.note.trim().slice(0, 500) : null
    if (!/^[0-9a-f-]{36}$/i.test(approvalId) || !STATUSES.has(status)) return json(response, 400, { error: 'invalid_approval_decision' })
    const client = auth.user.client
    const { data: updated, error: updateError } = await client.from('approval_requests').update({ status, resolved_at: new Date().toISOString() }).eq('id', approvalId).eq('family_id', auth.user.familyId).eq('status', 'pending').select('id').maybeSingle()
    if (updateError) return json(response, 502, { error: 'family_backend_unavailable' })
    if (!updated) return json(response, 404, { error: 'approval_not_found' })
    const { error: decisionError } = await client.from('parent_decisions').insert({ approval_request_id: approvalId, parent_id: auth.user.userId, decision: status, note })
    if (decisionError) return json(response, 502, { error: 'family_backend_unavailable' })
    const { data: requestRow } = await client.from('approval_requests').select('child_id').eq('id', approvalId).eq('family_id', auth.user.familyId).maybeSingle()
    if (requestRow?.child_id) {
      await createNotification(serviceClient(), {
        familyId: auth.user.familyId,
        childId: requestRow.child_id,
        recipientRole: 'child',
        kind: 'approval-resolved',
        title: 'Your parent reviewed a topic',
        body: status === 'approved' ? 'Your parent approved this topic. You can talk about it together.' : status === 'rejected' ? 'Your parent asked you not to continue this topic here.' : 'Your parent would like to discuss this topic with you.',
      })
    }
    return json(response, 200, { updated: true, status })
  } catch {
    return json(response, 500, { error: 'internal_error' })
  }
}

