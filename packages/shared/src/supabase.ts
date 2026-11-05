import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { ApprovalStatus, ChildActivity, ParentActivity, PreviewApproval, SafetyOutcome } from './types.ts'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined

export const supabaseConfigured = Boolean(url && publishableKey)

// Sessions live in sessionStorage, so closing the tab on a shared family device
// signs the account out. PKCE avoids tokens in URL fragments. Only the
// single-use PKCE code verifier goes to localStorage, so an email confirmation
// or password-reset link opened in a new tab can still complete; the verifier
// is useless without the emailed code and is removed once exchanged.
const isVerifierKey = (key: string) => key.endsWith('-code-verifier')
const sessionStore = typeof window === 'undefined'
  ? undefined
  : {
      getItem: (key: string) => (isVerifierKey(key) ? window.localStorage : window.sessionStorage).getItem(key),
      setItem: (key: string, value: string) => (isVerifierKey(key) ? window.localStorage : window.sessionStorage).setItem(key, value),
      removeItem: (key: string) => (isVerifierKey(key) ? window.localStorage : window.sessionStorage).removeItem(key),
    }

export const supabase: SupabaseClient | null = supabaseConfigured && url && publishableKey
  ? createClient(url, publishableKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'pkce', storage: sessionStore },
    })
  : null

export type FamilyRole = 'parent' | 'child'
export type AccountProfile = { userId: string; displayName: string; role: FamilyRole }

// Supabase Auth treats email identifiers case-insensitively, while form and
// password-manager input can include harmless surrounding whitespace. Keep
// password bytes untouched, but canonicalise the identifier at the boundary
// so a parent-created account can be used reliably on the separate child site.
export function normalizeAuthEmail(email: string) {
  return email.trim().toLowerCase()
}

// One generic message: never reveal whether an email exists.
const SIGN_IN_FAILED = 'We could not sign you in. Check your details or ask your parent or guardian.'
const AUTH_SERVICE_REJECTED = 'This deployment’s Supabase key was rejected. The host must use this project’s publishable key in VITE_SUPABASE_PUBLISHABLE_KEY, not a secret or service-role key, then redeploy.'
const AUTH_RATE_LIMITED = 'Too many account attempts were made from this browser or network. Wait a moment, then try again.'

export async function signIn(email: string, password: string) {
  if (!supabase) throw new Error('Supabase is not configured for this deployment.')
  const { error } = await supabase.auth.signInWithPassword({ email: normalizeAuthEmail(email), password })
  if (error) throw new Error(error.status === 401 ? AUTH_SERVICE_REJECTED : SIGN_IN_FAILED)
}

export const PASSWORD_MINIMUM = 12

// Supabase Auth creates the account and stores only a bcrypt hash of the
// password in auth.users; SafeAI never stores or logs it. With email
// confirmation on (required for production), an existing email gets the same
// "check your email" result as a new one, so the form cannot be used to find
// out who has an account.
export type ParentSignUpResult = 'check-email' | 'signed-in'
export async function signUpParent(email: string, password: string): Promise<ParentSignUpResult> {
  if (!supabase) throw new Error('Supabase is not configured for this deployment.')
  if (password.length < PASSWORD_MINIMUM) throw new Error(`Use a password of at least ${PASSWORD_MINIMUM} characters.`)
  const { data, error } = await supabase.auth.signUp({
    email: normalizeAuthEmail(email),
    password,
    options: { emailRedirectTo: `${window.location.origin}/?auth=confirm` },
  })
  if (error) {
    if (error.status === 401) throw new Error(AUTH_SERVICE_REJECTED)
    if (error.status === 429) throw new Error(AUTH_RATE_LIMITED)
    throw new Error(/password/i.test(error.message) ? 'Choose a stronger password: longer, and not one used on other sites.' : 'We could not create the account. If you already have one, sign in or reset your password.')
  }
  return data.session ? 'signed-in' : 'check-email'
}

const SETUP_FAILURES: Record<string, string> = {
  email_not_confirmed: 'Confirm your email address first, then sign in again.',
  family_already_exists: 'This account already belongs to a family space.',
  invalid_family_setup: 'Names must be between 1 and 80 characters.',
}

// Creates the signed-in parent's family, membership and profile in one database
// transaction. The family is always bound to the caller's own account.
export async function completeParentSetup(displayName: string, familyName: string) {
  if (!supabase) throw new Error('Supabase is not configured for this deployment.')
  const { error } = await supabase.rpc('create_parent_family', { display_name: displayName.trim(), family_name: familyName.trim() })
  if (error) throw new Error(SETUP_FAILURES[Object.keys(SETUP_FAILURES).find((code) => error.message.includes(code)) ?? ''] ?? 'We could not set up your family space. Try again.')
}

// Always reports the same outcome so the form never reveals whether an email
// has an account.
export async function requestPasswordReset(email: string) {
  if (!supabase) throw new Error('Supabase is not configured for this deployment.')
  await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/?auth=recovery` }).catch(() => undefined)
}

export async function updatePassword(password: string) {
  if (!supabase) throw new Error('Supabase is not configured for this deployment.')
  if (password.length < PASSWORD_MINIMUM) throw new Error(`Use a password of at least ${PASSWORD_MINIMUM} characters.`)
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw new Error(/password/i.test(error.message) ? 'Choose a stronger password: longer, and not one used on other sites.' : 'We could not update the password. Request a new reset link.')
}

export async function signOut() {
  if (supabase) await supabase.auth.signOut()
}

// The role comes from family_members (readable only by the member under RLS),
// never from editable user metadata. 'none' means a verified account with no
// family yet; anything unexpected is 'error'.
type Membership = { status: 'role'; role: FamilyRole } | { status: 'none' } | { status: 'error' }
async function readMembership(): Promise<Membership> {
  if (!supabase) return { status: 'error' }
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData.user) return { status: 'error' }
  const { data, error } = await supabase.from('family_members').select('role').eq('user_id', userData.user.id).maybeSingle()
  if (error) return { status: 'error' }
  if (!data) return { status: 'none' }
  return data.role === 'parent' || data.role === 'child' ? { status: 'role', role: data.role } : { status: 'error' }
}

export async function fetchFamilyRole(): Promise<FamilyRole | null> {
  const membership = await readMembership()
  return membership.status === 'role' ? membership.role : null
}

// Signs the session out unless it belongs to the role this site serves.
export async function confirmSiteRole(expected: FamilyRole): Promise<boolean> {
  const role = await fetchFamilyRole()
  if (role === expected) return true
  await signOut()
  return false
}

// Parent site only: a signed-in account with no family yet is sent to family
// setup instead of being signed out. Child accounts are always signed out.
export async function confirmParentAccess(): Promise<'allowed' | 'needs-family-setup' | 'denied'> {
  const membership = await readMembership()
  if (membership.status === 'role' && membership.role === 'parent') return 'allowed'
  if (membership.status === 'none') return 'needs-family-setup'
  await signOut()
  return 'denied'
}

export async function fetchMyProfile(): Promise<AccountProfile | null> {
  if (!supabase) return null
  const { data: userData, error: userError } = await supabase.auth.getUser()
  if (userError || !userData.user) return null
  const { data, error } = await supabase.from('profiles').select('user_id, display_name, role').eq('user_id', userData.user.id).maybeSingle()
  if (error || !data || (data.role !== 'parent' && data.role !== 'child')) return null
  return { userId: data.user_id, displayName: data.display_name, role: data.role }
}

// Realtime is a responsiveness layer only. Every event triggers a fresh
// family-scoped API read; no row payload is copied into React state directly.
// The app keeps its five-second polling fallback for disconnected tabs or
// projects where the publication has not been enabled yet.
export async function subscribeToFamilyRealtime(role: FamilyRole, childId: string | undefined, onChange: () => void): Promise<() => void> {
  if (!supabase) return () => undefined
  const { data: userData } = await supabase.auth.getUser()
  if (!userData.user) return () => undefined
  const { data: membership } = await supabase.from('family_members').select('family_id').eq('user_id', userData.user.id).maybeSingle()
  if (!membership?.family_id) return () => undefined

  const channel = supabase.channel(`safeai-${role}-${membership.family_id}-${childId ?? 'family'}`)
  const familyFilter = `family_id=eq.${membership.family_id}`
  const childFilter = childId ? `child_id=eq.${childId}` : undefined
  const add = (table: string, filter = familyFilter) => {
    channel.on('postgres_changes', { event: '*', schema: 'public', table, filter }, onChange)
  }
  if (role === 'parent') {
    add('chat_messages')
    add('approval_requests')
    add('parent_decisions')
    add('safety_events')
    add('access_settings')
    add('family_notifications')
  } else if (childFilter) {
    add('approval_requests', childFilter)
    add('access_settings', childFilter)
    add('family_notifications', childFilter)
  }
  await channel.subscribe()
  return () => { void supabase?.removeChannel(channel) }
}

async function authenticatedApiRequest(path: string, method: 'GET' | 'POST', body?: unknown) {
  if (!supabase) return { ok: false, status: 503, payload: { error: 'auth_backend_not_configured' } }
  const { data } = await supabase.auth.getSession()
  const accessToken = data.session?.access_token
  if (!accessToken) return { ok: false, status: 401, payload: { error: 'authentication_required' } }
  try {
    const response = await fetch(path, {
      method,
      headers: { authorization: `Bearer ${accessToken}`, ...(body ? { 'content-type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'omit',
      cache: 'no-store',
    })
    return { ok: response.ok, status: response.status, payload: await response.json().catch(() => ({})) as Record<string, unknown> }
  } catch {
    return { ok: false, status: 503, payload: { error: 'request_failed' } }
  }
}

export type ChildAccountInput = { displayName: string; email: string; password: string; schoolYear: string }

export async function fetchLinkedChildren() {
  const result = await authenticatedApiRequest('/api/parent/children', 'GET')
  if (!result.ok) throw new Error(typeof result.payload.error === 'string' ? result.payload.error : 'family_backend_unavailable')
  return Array.isArray(result.payload.children) ? result.payload.children as Array<{ id: string; displayName: string; disabled: boolean; schoolYear: string }> : []
}

export async function createChildAccount(input: ChildAccountInput) {
  const result = await authenticatedApiRequest('/api/parent/children', 'POST', input)
  if (!result.ok) throw new Error(typeof result.payload.error === 'string' ? result.payload.error : 'child_account_create_failed')
  return result.payload.child as { id: string; displayName: string; email?: string; disabled: boolean; schoolYear: string }
}

// Sends the new password once, over HTTPS, to the server route that hands it
// to Supabase Auth. Nothing is returned except success or an error code.
export async function setChildPassword(childId: string, password: string) {
  const result = await authenticatedApiRequest('/api/parent/child-password', 'POST', { childId, password })
  if (!result.ok) throw new Error(typeof result.payload.error === 'string' ? result.payload.error : 'child_password_update_failed')
}

export type ProviderKeyResult = { ok: true; maskedEnding?: string } | { ok: false; message: string }

const FAILURE_MESSAGES: Record<string, string> = {
  authentication_required: 'Your session has ended. Sign in again.',
  forbidden: 'Only a parent account can change provider settings.',
  invalid_provider_key_request: 'That key does not look valid. Nothing was stored.',
  secure_backend_not_configured: 'Secure key storage is not configured on this deployment yet. Nothing was stored.',
  auth_backend_not_configured: 'Sign-in is not configured on this deployment yet. Nothing was stored.',
}

// Sends the key once, over HTTPS, to the server route that encrypts it. The
// response only ever contains masked metadata.
async function providerKeyRequest(method: 'POST' | 'DELETE', body?: unknown): Promise<ProviderKeyResult> {
  if (!supabase) return { ok: false, message: 'Not signed in. Nothing was sent.' }
  const { data } = await supabase.auth.getSession()
  const accessToken = data.session?.access_token
  if (!accessToken) return { ok: false, message: FAILURE_MESSAGES.authentication_required }
  try {
    const response = await fetch('/api/parent/provider-key', {
      method,
      headers: { authorization: `Bearer ${accessToken}`, ...(body ? { 'content-type': 'application/json' } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      credentials: 'omit',
      cache: 'no-store',
    })
    const payload = (await response.json().catch(() => ({}))) as { error?: string; metadata?: { maskedEnding?: string } }
    if (!response.ok) return { ok: false, message: FAILURE_MESSAGES[payload.error ?? ''] ?? 'The request failed. Nothing was changed.' }
    return { ok: true, maskedEnding: payload.metadata?.maskedEnding }
  } catch {
    return { ok: false, message: 'The request failed. Nothing was changed.' }
  }
}

export const saveProviderKey = (provider: 'openai' | 'anthropic' | 'google', apiKey: string) =>
  providerKeyRequest('POST', { provider, apiKey })

export const removeProviderKey = () => providerKeyRequest('DELETE')

export type ProviderMetadata = { provider: 'openai' | 'anthropic' | 'google'; maskedEnding: string | null; status: 'disabled' | 'active' | 'error'; lastTested: string | null }

// Masked metadata only. RLS lets a parent read their own family's row; children
// and other families get nothing. The ciphertext table is not reachable here.
export async function fetchProviderMetadata(): Promise<ProviderMetadata | null> {
  if (!supabase) return null
  const { data, error } = await supabase.from('provider_settings').select('provider, masked_ending, status, last_tested_at').maybeSingle()
  if (error || !data) return null
  return { provider: data.provider, maskedEnding: data.masked_ending, status: data.status, lastTested: data.last_tested_at }
}

export type ProviderTestResult = { provider: 'openai' | 'anthropic' | 'google'; status: 'active'; lastTested: string }

// Plain-language explanations for the stable error codes the provider routes
// return. The provider's own error text never reaches the browser.
const PROVIDER_ERROR_MESSAGES: Record<string, string> = {
  provider_not_configured: 'Save a provider key first. Nothing was sent.',
  provider_authentication_failed: 'The provider rejected the saved key. Check that it was copied in full and is enabled, then save it again.',
  provider_quota_exceeded: 'The provider account has no remaining credit or quota. Add billing or credit with the provider, then test again.',
  provider_rate_limited: 'The provider is rate-limiting this key right now. Wait a minute and try again.',
  provider_model_unavailable: 'This key cannot use any of the supported models. Check that the provider account has model access enabled.',
  provider_bad_request: 'The provider refused the request. Check the key belongs to the provider you selected.',
  provider_overloaded: 'The provider is busy right now. Try again in a moment.',
  provider_timeout: 'The provider took too long to answer. Try again in a moment.',
  provider_unreachable: 'The server could not reach the provider. Try again in a moment.',
  provider_empty_response: 'The provider returned an empty answer. Try again.',
  provider_invalid_response: 'The provider returned an unusable answer. Try again.',
  provider_status_update_failed: 'The test passed but the result could not be saved. Try again.',
  secure_backend_not_configured: 'Secure key storage is not configured on this deployment yet.',
  auth_backend_not_configured: 'Sign-in is not configured on this deployment yet.',
  authentication_required: 'Your session has ended. Sign in again.',
}

export const providerErrorMessage = (code: string) =>
  PROVIDER_ERROR_MESSAGES[code] ?? 'The provider connection could not be verified. Nothing was changed.'

export async function testProviderConnection(): Promise<ProviderTestResult> {
  const result = await authenticatedApiRequest('/api/parent/provider-test', 'POST')
  if (!result.ok) throw new Error(typeof result.payload.error === 'string' ? result.payload.error : 'provider_request_failed')
  return result.payload as unknown as ProviderTestResult
}

export async function fetchParentActivity(): Promise<ParentActivity> {
  const result = await authenticatedApiRequest('/api/parent/activity', 'GET')
  if (!result.ok) throw new Error(typeof result.payload.error === 'string' ? result.payload.error : 'family_backend_unavailable')
  return {
    history: Array.isArray(result.payload.history) ? result.payload.history as ParentActivity['history'] : [],
    approvals: Array.isArray(result.payload.approvals) ? result.payload.approvals as PreviewApproval[] : [],
    alerts: Array.isArray(result.payload.alerts) ? result.payload.alerts as ParentActivity['alerts'] : [],
    access: Array.isArray(result.payload.access) ? result.payload.access as ParentActivity['access'] : [],
    notifications: Array.isArray(result.payload.notifications) ? result.payload.notifications as ParentActivity['notifications'] : [],
    metrics: (result.payload.metrics && typeof result.payload.metrics === 'object' ? result.payload.metrics : { allowed_count: 0, support_count: 0, approval_count: 0, blocked_count: 0, urgent_count: 0, lessons_started: 0, updated_at: null }) as ParentActivity['metrics'],
  }
}

export async function resolveParentApproval(approvalId: string, status: ApprovalStatus, note: string) {
  const result = await authenticatedApiRequest('/api/parent/approval', 'POST', { approvalId, status, note })
  if (!result.ok) throw new Error(typeof result.payload.error === 'string' ? result.payload.error : 'approval_update_failed')
}

export async function updateParentAccess(input: { childId: string; chatbotPaused: boolean; ordinaryNotifications: boolean; flaggedNotifications: boolean; blockedTopics: string[] }) {
  const result = await authenticatedApiRequest('/api/parent/access', 'POST', input)
  if (!result.ok) throw new Error(typeof result.payload.error === 'string' ? result.payload.error : 'access_update_failed')
}

export async function deleteFamilyData(confirmation: string) {
  const result = await authenticatedApiRequest('/api/parent/privacy-delete', 'POST', { confirmation })
  if (!result.ok) throw new Error(typeof result.payload.error === 'string' ? result.payload.error : 'family_deletion_failed')
}

export async function fetchChildActivity(): Promise<ChildActivity> {
  const result = await authenticatedApiRequest('/api/child/activity', 'GET')
  if (!result.ok) throw new Error(typeof result.payload.error === 'string' ? result.payload.error : 'family_backend_unavailable')
  return {
    history: Array.isArray(result.payload.history) ? result.payload.history as ChildActivity['history'] : [],
    approvals: Array.isArray(result.payload.approvals) ? result.payload.approvals as ChildActivity['approvals'] : [],
    chatPaused: Boolean(result.payload.chatPaused),
    notifications: Array.isArray(result.payload.notifications) ? result.payload.notifications as ChildActivity['notifications'] : [],
  }
}

export type ChildChatResult = {
  outcome?: SafetyOutcome
  assistantText?: string
  providerConfigured: boolean
  error?: string
}

export async function sendChildMessage(question: string): Promise<{ ok: boolean; status: number; result: ChildChatResult }> {
  const response = await authenticatedApiRequest('/api/ai/chat', 'POST', { question })
  return {
    ok: response.ok,
    status: response.status,
    result: {
      outcome: response.payload.outcome as SafetyOutcome | undefined,
      assistantText: typeof response.payload.assistantText === 'string' ? response.payload.assistantText : undefined,
      providerConfigured: Boolean(response.payload.providerConfigured),
      error: typeof response.payload.error === 'string' ? response.payload.error : undefined,
    },
  }
}
