import { requireRole, serviceClient, type HeaderRequest } from '../_lib/auth.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'

type RequestLike = HeaderRequest & { method?: string; body?: unknown }
type ChildPasswordBody = { childId?: unknown; password?: unknown }

const UUID_SHAPE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const PASSWORD_MINIMUM = 12
// bcrypt, which Supabase Auth uses, ignores anything past 72 bytes.
const PASSWORD_MAXIMUM = 72

// POST sets a new password for one of the signed-in parent's own children.
// Children cannot reset their own password, so this is the recovery path.
// The password goes only to Supabase Auth and is never stored, logged or
// returned here. After it changes, every existing session of the child is
// revoked.
export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'POST') return json(response, 405, { error: 'method_not_allowed' })
  try {
    const auth = await requireRole(request, 'parent')
    if (!auth.ok) return json(response, auth.status, { error: auth.error })

    const service = serviceClient()
    if (!service) return json(response, 503, { error: 'secure_backend_not_configured' })
    const body = (request.body && typeof request.body === 'object' ? request.body : {}) as ChildPasswordBody
    const childId = typeof body.childId === 'string' ? body.childId.trim().toLowerCase() : ''
    const password = typeof body.password === 'string' ? body.password : ''
    if (password.length < PASSWORD_MINIMUM || password.length > PASSWORD_MAXIMUM || Buffer.byteLength(password, 'utf8') > PASSWORD_MAXIMUM) {
      return json(response, 400, { error: 'invalid_child_password' })
    }

    // The child must belong to the parent's family, read from the verified
    // session. Unknown, malformed and other-family ids get the same answer so
    // the route cannot be used to probe for accounts.
    if (!UUID_SHAPE.test(childId)) return json(response, 404, { error: 'child_not_found' })
    const { data: child, error: lookupError } = await service
      .from('child_profiles')
      .select('user_id')
      .eq('user_id', childId)
      .eq('family_id', auth.user.familyId)
      .maybeSingle()
    if (lookupError) return json(response, 502, { error: 'family_backend_unavailable' })
    if (!child) return json(response, 404, { error: 'child_not_found' })

    const { error: updateError } = await service.auth.admin.updateUserById(childId, { password })
    if (updateError) {
      const weakPassword = /password/i.test(updateError.message ?? '')
      return json(response, weakPassword ? 400 : 502, { error: weakPassword ? 'child_password_rejected' : 'child_password_update_failed' })
    }

    // Sign the child out everywhere so a device that is already signed in
    // cannot carry on with the old password. Auth has no admin sign-out by
    // user id, so a service-role-only database function deletes the sessions.
    const { error: revokeError } = await service.rpc('revoke_child_sessions', { target_child_id: childId })
    if (revokeError) return json(response, 502, { error: 'child_sessions_revoke_failed', updated: true })
    return json(response, 200, { updated: true })
  } catch {
    return json(response, 500, { error: 'internal_error' })
  }
}
