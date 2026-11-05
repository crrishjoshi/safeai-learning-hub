import { requireRole, serviceClient, type HeaderRequest } from '../_lib/auth.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'

type RequestLike = HeaderRequest & { method?: string; body?: unknown }

export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'POST') return json(response, 405, { error: 'method_not_allowed' })
  try {
    const auth = await requireRole(request, 'parent')
    if (!auth.ok) return json(response, auth.status, { error: auth.error })
    const body = (request.body && typeof request.body === 'object' ? request.body : {}) as { confirmation?: unknown }
    if (body.confirmation !== 'DELETE MY FAMILY DATA') return json(response, 400, { error: 'deletion_confirmation_required' })
    const service = serviceClient()
    if (!service) return json(response, 503, { error: 'secure_backend_not_configured' })
    const { data, error } = await service.rpc('delete_family_data', { target_family_id: auth.user.familyId })
    if (error || data !== true) return json(response, 502, { error: 'family_deletion_failed' })
    return json(response, 200, { deleted: true })
  } catch {
    return json(response, 500, { error: 'internal_error' })
  }
}
