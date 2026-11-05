import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export type FamilyRole = 'parent' | 'child'
export type HeaderRequest = { headers?: Record<string, string | string[] | undefined> }
export type AuthorizedUser = { userId: string; familyId: string; role: FamilyRole; client: SupabaseClient }
export type AuthResult = { ok: true; user: AuthorizedUser } | { ok: false; status: 401 | 403 | 503; error: string }

const JWT_SHAPE = /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/

export function bearerToken(request: HeaderRequest): string | null {
  const raw = request.headers?.authorization ?? request.headers?.Authorization
  const header = Array.isArray(raw) ? raw[0] : raw
  const match = typeof header === 'string' ? /^Bearer ([^\s]+)$/.exec(header.trim()) : null
  return match && match[1].length <= 8192 && JWT_SHAPE.test(match[1]) ? match[1] : null
}

// Verifies the caller's Supabase session server-side and reads their role from
// public.family_members under RLS as that user. Editable user metadata is never
// consulted for authorisation.
export async function requireRole(request: HeaderRequest, role: FamilyRole): Promise<AuthResult> {
  const token = bearerToken(request)
  if (!token) return { ok: false, status: 401, error: 'authentication_required' }
  const url = process.env.SUPABASE_URL
  const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY
  if (!url || !publishableKey) return { ok: false, status: 503, error: 'auth_backend_not_configured' }

  const client = createClient(url, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  })
  const { data: userData, error: userError } = await client.auth.getUser(token)
  if (userError || !userData.user) return { ok: false, status: 401, error: 'authentication_required' }

  const { data: membership, error: membershipError } = await client
    .from('family_members')
    .select('family_id, role')
    .eq('user_id', userData.user.id)
    .maybeSingle()
  if (membershipError || !membership || membership.role !== role) return { ok: false, status: 403, error: 'forbidden' }

  return { ok: true, user: { userId: userData.user.id, familyId: membership.family_id as string, role, client } }
}

// Service-role client for the few server-only RPCs (credential storage). Never
// import this module from app code.
export function serviceClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false } })
}
