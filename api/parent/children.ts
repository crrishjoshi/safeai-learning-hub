import { requireRole, serviceClient, type HeaderRequest } from '../_lib/auth.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'

type RequestLike = HeaderRequest & { method?: string; body?: unknown }
type ChildAccountBody = { displayName?: unknown; email?: unknown; password?: unknown; schoolYear?: unknown }

const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PASSWORD_MINIMUM = 12
const TEXT_LIMIT = 80
const CHILD_LIMIT = 10
const validText = (value: unknown) => typeof value === 'string' && value.trim().length > 0 && value.trim().length <= TEXT_LIMIT

// GET lists the signed-in parent's children. POST creates a child Auth user
// and family-scoped profile from the server boundary; child sign-up is never
// exposed on the child site.
export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'GET' && request.method !== 'POST') return json(response, 405, { error: 'method_not_allowed' })
  try {
    const auth = await requireRole(request, 'parent')
    if (!auth.ok) return json(response, auth.status, { error: auth.error })

    if (request.method === 'POST') {
      const service = serviceClient()
      if (!service) return json(response, 503, { error: 'secure_backend_not_configured' })
      const body = (request.body && typeof request.body === 'object' ? request.body : {}) as ChildAccountBody
      const displayName = typeof body.displayName === 'string' ? body.displayName.trim() : ''
      const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : ''
      const password = typeof body.password === 'string' ? body.password : ''
      const schoolYear = typeof body.schoolYear === 'string' ? body.schoolYear.trim() : ''
      if (!validText(displayName) || !EMAIL_SHAPE.test(email) || password.length < PASSWORD_MINIMUM || !validText(schoolYear)) {
        return json(response, 400, { error: 'invalid_child_account' })
      }

      // Caps how many accounts one parent session can create.
      const { count, error: countError } = await service.from('child_profiles').select('user_id', { count: 'exact', head: true }).eq('family_id', auth.user.familyId)
      if (countError) return json(response, 502, { error: 'family_backend_unavailable' })
      if ((count ?? 0) >= CHILD_LIMIT) return json(response, 409, { error: 'child_limit_reached' })

      let childId: string | null = null
      try {
        // Supabase Auth stores only a bcrypt hash of the password. The parent
        // owns the address, so it is marked confirmed. A taken email gets the
        // same error as any other failure, so the route cannot be used to
        // discover who has an account.
        const { data: created, error: userError } = await service.auth.admin.createUser({ email, password, email_confirm: true })
        if (userError || !created.user) {
          const weakPassword = /password/i.test(userError?.message ?? '')
          return json(response, 400, { error: weakPassword ? 'child_password_rejected' : 'child_account_create_failed' })
        }
        childId = created.user.id
        const { error: membershipError } = await service.from('family_members').insert({ family_id: auth.user.familyId, user_id: childId, role: 'child' })
        if (membershipError) throw new Error('membership_create_failed')
        const { error: profileError } = await service.from('profiles').insert({ user_id: childId, family_id: auth.user.familyId, role: 'child', display_name: displayName })
        if (profileError) throw new Error('profile_create_failed')
        const { error: childProfileError } = await service.from('child_profiles').insert({ user_id: childId, family_id: auth.user.familyId, display_name: displayName, school_year: schoolYear })
        if (childProfileError) throw new Error('child_profile_create_failed')
        const { error: accessError } = await service.from('access_settings').insert({ family_id: auth.user.familyId, child_id: childId })
        if (accessError) throw new Error('access_settings_create_failed')
        return json(response, 201, { child: { id: childId, displayName, email, disabled: false, schoolYear } })
      } catch {
        if (childId) await service.auth.admin.deleteUser(childId)
        return json(response, 500, { error: 'child_account_create_failed' })
      }
    }

    const { data, error } = await auth.user.client
      .from('child_profiles')
      .select('user_id, display_name, disabled_at, school_year')
      .eq('family_id', auth.user.familyId)
      .order('display_name')
    if (error) return json(response, 502, { error: 'family_backend_unavailable' })
    return json(response, 200, {
      children: (data ?? []).map((row) => ({ id: row.user_id, displayName: row.display_name, disabled: Boolean(row.disabled_at), schoolYear: row.school_year })),
    })
  } catch {
    return json(response, 500, { error: 'internal_error' })
  }
}
