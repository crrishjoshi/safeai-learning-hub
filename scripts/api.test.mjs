// Exercises the Vercel API handlers with a fake Supabase backend served through
// a stubbed fetch. Tokens, users and the provider key are fictional test values.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import { registerHooks } from 'node:module'
import test, { beforeEach, afterEach } from 'node:test'
import { fileURLToPath } from 'node:url'

// The API sources import siblings as `.js`, which is what Vercel's compiled
// ESM output needs at runtime; resolve those to the .ts files so Node's type
// stripping can load them here.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith('.') && context.parentURL?.includes('/api/')) {
      const base = specifier.endsWith('.js') ? specifier.slice(0, -3) : specifier
      if (base !== specifier || !/\.[a-z]+$/.test(specifier)) {
        const candidate = new URL(`${base}.ts`, context.parentURL)
        if (fs.existsSync(fileURLToPath(candidate))) return nextResolve(candidate.href, context)
      }
    }
    return nextResolve(specifier, context)
  },
})

const { default: providerKey } = await import('../api/parent/provider-key.ts')
const { default: children } = await import('../api/parent/children.ts')
const { default: childPassword } = await import('../api/parent/child-password.ts')
const { default: access } = await import('../api/parent/access.ts')
const { default: chat } = await import('../api/ai/chat.ts')
const { default: providerTest } = await import('../api/parent/provider-test.ts')
const { decryptProviderKey, encryptProviderKey } = await import('../api/_lib/provider-key.ts')
const { classifyProviderError, generateProviderText, ProviderRequestError } = await import('../api/_lib/ai-provider.ts')

const SUPABASE = 'https://fictional-project.supabase.test'
const token = (name) => [name, 'fictional', 'signature'].join('.')
const PARENT = { id: '00000000-0000-4000-8000-000000000011', family: '00000000-0000-4000-8000-000000000001', role: 'parent' }
const CHILD = { id: '00000000-0000-4000-8000-000000000012', family: '00000000-0000-4000-8000-000000000001', role: 'child' }
const sessions = { [token('parent')]: PARENT, [token('child')]: CHILD }
const FAKE_PROVIDER_KEY = ['fictional', 'provider', 'test', 'value', 'WXYZ'].join('-')
const FAKE_CHILD_PASSWORD = ['fictional', 'child', 'credential', '123'].join('-')
const CREATED_CHILD = '00000000-0000-4000-8000-000000000022'
const SECOND_CREATED_CHILD = '00000000-0000-4000-8000-000000000023'
const OTHER_FAMILY_CHILD = '00000000-0000-4000-8000-000000000032'
const NEW_CHILD_PASSWORD = ['fictional', 'replacement', 'credential', '456'].join('-')
// Fake child_profiles table. The service role sees every row; a user session
// only sees its own family's rows, as RLS would allow.
const CHILD_ROWS = [
  { user_id: CHILD.id, family_id: CHILD.family, display_name: 'Account child', disabled_at: null, school_year: 'Not set' },
  { user_id: OTHER_FAMILY_CHILD, family_id: '00000000-0000-4000-8000-000000000002', display_name: 'Other family child', disabled_at: null, school_year: 'Not set' },
]

let calls
let childCount
let createUserError
let updateUserError
let revokeError
let blockedTopics
const realFetch = globalThis.fetch
const savedEnv = { ...process.env }

function reply(status, body) {
  return new Response(body === undefined ? null : JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } })
}

beforeEach(() => {
  calls = []
  childCount = 1
  createUserError = null
  updateUserError = null
  revokeError = null
  blockedTopics = []
  Object.assign(process.env, {
    SUPABASE_URL: SUPABASE,
    SUPABASE_PUBLISHABLE_KEY: 'fictional-publishable',
    SUPABASE_SERVICE_ROLE_KEY: 'fictional-service',
    API_KEY_ENCRYPTION_SECRET: ['fictional', 'encryption', 'material'].join('-').padEnd(48, '.'),
    API_KEY_ENCRYPTION_KEY_VERSION: '3',
  })
  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url)
    const headers = new Headers(init.headers)
    const body = init.body ? JSON.parse(init.body) : undefined
    calls.push({ path: url.pathname, search: url.search, method: init.method ?? 'GET', apikey: headers.get('apikey'), authorization: headers.get('authorization'), body })
    const caller = sessions[(headers.get('authorization') ?? '').replace(/^Bearer /, '')]
    if (url.pathname === '/auth/v1/admin/users' && init.method === 'POST') {
      if (createUserError) return reply(422, createUserError)
      return reply(201, { user: { id: body?.email === 'second@example.test' ? SECOND_CREATED_CHILD : CREATED_CHILD } })
    }
    if (url.pathname.startsWith('/auth/v1/admin/users/') && init.method === 'DELETE') return reply(204)
    if (url.pathname.startsWith('/auth/v1/admin/users/') && init.method === 'PUT') return updateUserError ? reply(422, updateUserError) : reply(200, { id: url.pathname.split('/').pop() })
    if (url.pathname === '/auth/v1/user') return caller ? reply(200, { id: caller.id, aud: 'authenticated', role: 'authenticated', user_metadata: { role: 'parent' } }) : reply(401, { message: 'invalid' })
    if (url.pathname === '/rest/v1/family_members' && init.method === 'POST') return reply(201, {})
    if (url.pathname === '/rest/v1/profiles' && init.method === 'POST') return reply(201, {})
    if (url.pathname === '/rest/v1/child_profiles' && init.method === 'POST') return reply(201, {})
    if (url.pathname === '/rest/v1/child_profiles' && init.method === 'HEAD') return new Response(null, { status: 200, headers: { 'content-range': `*/${childCount}` } })
    if (url.pathname === '/rest/v1/access_settings' && init.method === 'POST') return reply(201, {})
    if (url.pathname === '/rest/v1/access_settings' && init.method === 'GET') return reply(200, caller?.role === 'child' ? [{ chatbot_paused: false, blocked_topics: blockedTopics }] : [])
    if (url.pathname === '/rest/v1/family_members') return reply(200, caller ? [{ family_id: caller.family, role: caller.role }] : [])
    if (url.pathname === '/rest/v1/child_profiles' && init.method === 'GET') {
      const eq = (column) => url.searchParams.get(column)?.replace(/^eq\./, '')
      const rows = CHILD_ROWS.filter((row) => (!caller || row.family_id === caller.family) && (!eq('user_id') || row.user_id === eq('user_id')) && (!eq('family_id') || row.family_id === eq('family_id')))
      return reply(200, rows.map(({ family_id, ...row }) => row))
    }
    if (url.pathname === '/rest/v1/rpc/revoke_child_sessions' && revokeError) return reply(400, revokeError)
    if (url.pathname.startsWith('/rest/v1/rpc/')) return reply(204)
    return reply(404, {})
  }
})

afterEach(() => {
  globalThis.fetch = realFetch
  for (const key of Object.keys(process.env)) if (!(key in savedEnv)) delete process.env[key]
  Object.assign(process.env, savedEnv)
})

async function call(handler, { method = 'POST', auth, body } = {}) {
  const result = { status: 0, body: undefined, headers: {} }
  const response = {
    status(code) { result.status = code; return response },
    json(payload) { result.body = payload },
    setHeader(name, value) { result.headers[name.toLowerCase()] = value },
  }
  await handler({ method, headers: auth ? { authorization: `Bearer ${auth}` } : {}, body }, response)
  return result
}

test('every route rejects missing or invalid sessions before doing work', async () => {
  for (const [handler, method] of [[providerKey, 'POST'], [providerKey, 'DELETE'], [children, 'GET'], [childPassword, 'POST'], [chat, 'POST']]) {
    assert.equal((await call(handler, { method })).status, 401)
    assert.equal((await call(handler, { method, auth: token('stranger') })).status, 401)
  }
  assert.ok(calls.every((entry) => !entry.path.includes('/rpc/')), 'no storage call without a session')
})

test('roles come from family_members, not editable user metadata', async () => {
  // The fake auth server sets user_metadata.role = "parent" for everyone.
  assert.equal((await call(providerKey, { auth: token('child'), body: { provider: 'openai', apiKey: FAKE_PROVIDER_KEY } })).status, 403)
  assert.equal((await call(providerKey, { method: 'DELETE', auth: token('child') })).status, 403)
  assert.equal((await call(children, { method: 'GET', auth: token('child') })).status, 403)
  assert.equal((await call(chat, { auth: token('parent') })).status, 403)
  assert.ok(calls.every((entry) => !entry.path.includes('/rpc/')))
})

test('a parent stores an encrypted, family-bound key and never gets the raw key back', async () => {
  const result = await call(providerKey, { auth: token('parent'), body: { provider: 'openai', apiKey: FAKE_PROVIDER_KEY } })
  assert.equal(result.status, 200)
  assert.equal(result.headers['cache-control'], 'no-store')
  assert.deepEqual(result.body, { metadata: { provider: 'openai', maskedEnding: 'WXYZ', status: 'disabled' } })
  assert.doesNotMatch(JSON.stringify(result.body), /fictional-provider/)

  const rpc = calls.find((entry) => entry.path === '/rest/v1/rpc/store_provider_credential')
  assert.ok(rpc, 'storage RPC called')
  assert.equal(rpc.apikey, 'fictional-service')
  assert.equal(rpc.body.target_family_id, PARENT.family, 'family comes from the verified session')
  assert.equal(rpc.body.encryption_key_version, 3)
  assert.doesNotMatch(JSON.stringify(rpc.body), /fictional-provider/)
  const encrypted = { ciphertext: rpc.body.encrypted_ciphertext, iv: rpc.body.encrypted_iv, authTag: rpc.body.encrypted_auth_tag, keyVersion: 3 }
  const secret = process.env.API_KEY_ENCRYPTION_SECRET
  assert.equal(decryptProviderKey(encrypted, secret, PARENT.family, 'openai'), FAKE_PROVIDER_KEY)
  assert.throws(() => decryptProviderKey(encrypted, secret, '00000000-0000-4000-8000-000000000002', 'openai'))
  assert.throws(() => decryptProviderKey(encrypted, secret, PARENT.family, 'anthropic'))
})

test('provider key requests are validated and removable', async () => {
  for (const body of [{ provider: 'unknown', apiKey: FAKE_PROVIDER_KEY }, { provider: 'openai', apiKey: 'short' }, { provider: 'openai', apiKey: 'has spaces in the middle of it' }, { provider: 'openai', apiKey: 'x'.repeat(5000) }, null]) {
    const result = await call(providerKey, { auth: token('parent'), body })
    assert.equal(result.status, 400)
    assert.deepEqual(result.body, { error: 'invalid_provider_key_request' })
  }
  const removed = await call(providerKey, { method: 'DELETE', auth: token('parent') })
  assert.equal(removed.status, 200)
  assert.equal(calls.filter((entry) => entry.path === '/rest/v1/rpc/remove_provider_credential')[0].body.target_family_id, PARENT.family)
  assert.equal((await call(providerKey, { method: 'GET', auth: token('parent') })).status, 405)
})

test('missing server configuration fails closed without leaking detail', async () => {
  process.env.API_KEY_ENCRYPTION_SECRET = 'too-short'
  const weak = await call(providerKey, { auth: token('parent'), body: { provider: 'openai', apiKey: FAKE_PROVIDER_KEY } })
  assert.deepEqual([weak.status, weak.body], [503, { error: 'secure_backend_not_configured' }])
  delete process.env.SUPABASE_SERVICE_ROLE_KEY
  assert.equal((await call(providerKey, { method: 'DELETE', auth: token('parent') })).status, 503)
  delete process.env.SUPABASE_URL
  assert.deepEqual((await call(children, { method: 'GET', auth: token('parent') })).body, { error: 'auth_backend_not_configured' })
})

test('parent child listing runs with the parent session, not the service role', async () => {
  const result = await call(children, { method: 'GET', auth: token('parent') })
  assert.equal(result.status, 200)
  assert.deepEqual(result.body, { children: [{ id: CHILD.id, displayName: 'Account child', disabled: false, schoolYear: 'Not set' }] })
  const query = calls.find((entry) => entry.path === '/rest/v1/child_profiles')
  assert.equal(query.apikey, 'fictional-publishable')
  assert.equal(query.authorization, `Bearer ${token('parent')}`)
})

test('only a parent session can create a child account', async () => {
  const childBody = { displayName: 'Account child', email: '  CHILD@example.test  ', password: FAKE_CHILD_PASSWORD, schoolYear: 'Year 8' }
  assert.equal((await call(children, { method: 'POST', auth: token('child'), body: childBody })).status, 403)
  const result = await call(children, { method: 'POST', auth: token('parent'), body: childBody })
  assert.equal(result.status, 201)
  assert.deepEqual(result.body, { child: { id: CREATED_CHILD, displayName: 'Account child', email: 'child@example.test', disabled: false, schoolYear: 'Year 8' } })
  assert.doesNotMatch(JSON.stringify(result.body), new RegExp(FAKE_CHILD_PASSWORD))
  const authCreate = calls.find((entry) => entry.path === '/auth/v1/admin/users' && entry.method === 'POST')
  assert.deepEqual(authCreate.body, { email: 'child@example.test', password: FAKE_CHILD_PASSWORD, email_confirm: true })
  assert.ok(calls.some((entry) => entry.path === '/rest/v1/child_profiles' && entry.method === 'POST'))
})

test('multiple child account creation keeps each normalized email and password independent', async () => {
  childCount = 0
  const first = await call(children, { method: 'POST', auth: token('parent'), body: { displayName: 'First child', email: 'FIRST@example.test', password: FAKE_CHILD_PASSWORD, schoolYear: 'Year 7' } })
  childCount = 1
  const second = await call(children, { method: 'POST', auth: token('parent'), body: { displayName: 'Second child', email: 'second@example.test', password: NEW_CHILD_PASSWORD, schoolYear: 'Year 8' } })
  assert.deepEqual(first.body.child, { id: CREATED_CHILD, displayName: 'First child', email: 'first@example.test', disabled: false, schoolYear: 'Year 7' })
  assert.deepEqual(second.body.child, { id: SECOND_CREATED_CHILD, displayName: 'Second child', email: 'second@example.test', disabled: false, schoolYear: 'Year 8' })
  const authCreates = calls.filter((entry) => entry.path === '/auth/v1/admin/users' && entry.method === 'POST')
  assert.deepEqual(authCreates.map((entry) => entry.body), [
    { email: 'first@example.test', password: FAKE_CHILD_PASSWORD, email_confirm: true },
    { email: 'second@example.test', password: NEW_CHILD_PASSWORD, email_confirm: true },
  ])
})

test('child creation never reveals whether an email already has an account', async () => {
  const childBody = { displayName: 'Account child', email: 'taken@example.test', password: FAKE_CHILD_PASSWORD, schoolYear: 'Year 8' }
  createUserError = { code: 'email_exists', message: 'A user with this email address has already been registered' }
  const taken = await call(children, { method: 'POST', auth: token('parent'), body: childBody })
  createUserError = { code: 'unexpected_failure', message: 'Database error creating new user' }
  const other = await call(children, { method: 'POST', auth: token('parent'), body: childBody })
  assert.deepEqual([taken.status, taken.body], [400, { error: 'child_account_create_failed' }])
  assert.deepEqual([other.status, other.body], [taken.status, taken.body])
  assert.doesNotMatch(JSON.stringify(taken.body), /exist|registered|taken/i)
  assert.ok(calls.every((entry) => !(entry.path === '/rest/v1/family_members' && entry.method === 'POST')))
})

test('child creation reports a rejected password without echoing it', async () => {
  createUserError = { code: 'weak_password', message: 'Password is known to be weak and easy to guess' }
  const result = await call(children, { method: 'POST', auth: token('parent'), body: { displayName: 'Account child', email: 'child@example.test', password: FAKE_CHILD_PASSWORD, schoolYear: 'Year 8' } })
  assert.deepEqual([result.status, result.body], [400, { error: 'child_password_rejected' }])
  assert.doesNotMatch(JSON.stringify(result.body), new RegExp(FAKE_CHILD_PASSWORD))
})

test('a family cannot exceed the child account limit', async () => {
  childCount = 10
  const result = await call(children, { method: 'POST', auth: token('parent'), body: { displayName: 'Account child', email: 'child@example.test', password: FAKE_CHILD_PASSWORD, schoolYear: 'Year 8' } })
  assert.deepEqual([result.status, result.body], [409, { error: 'child_limit_reached' }])
  assert.ok(calls.every((entry) => entry.path !== '/auth/v1/admin/users'))
  const countQuery = calls.find((entry) => entry.path === '/rest/v1/child_profiles' && entry.method === 'HEAD')
  assert.match(countQuery.search, new RegExp(`family_id=eq.${PARENT.family}`))
})

test('short child passwords are refused before reaching Supabase Auth', async () => {
  const result = await call(children, { method: 'POST', auth: token('parent'), body: { displayName: 'Account child', email: 'child@example.test', password: 'short', schoolYear: 'Year 8' } })
  assert.deepEqual([result.status, result.body], [400, { error: 'invalid_child_account' }])
  assert.ok(calls.every((entry) => entry.path !== '/auth/v1/admin/users'))
})

const passwordUpdates = () => calls.filter((entry) => entry.path.startsWith('/auth/v1/admin/users/') && entry.method === 'PUT')
const sessionRevokes = () => calls.filter((entry) => entry.path === '/rest/v1/rpc/revoke_child_sessions')

test('only a parent session can set a child password', async () => {
  const body = { childId: CHILD.id, password: NEW_CHILD_PASSWORD }
  assert.equal((await call(childPassword, { body })).status, 401)
  const asChild = await call(childPassword, { auth: token('child'), body })
  assert.deepEqual([asChild.status, asChild.body], [403, { error: 'forbidden' }])
  assert.equal(passwordUpdates().length, 0)
  assert.equal((await call(childPassword, { method: 'GET', auth: token('parent') })).status, 405)
})

test('a parent can set a new password for their own child and never gets it back', async () => {
  const result = await call(childPassword, { auth: token('parent'), body: { childId: CHILD.id, password: NEW_CHILD_PASSWORD } })
  assert.equal(result.status, 200)
  assert.equal(result.headers['cache-control'], 'no-store')
  assert.deepEqual(result.body, { updated: true })
  assert.doesNotMatch(JSON.stringify(result.body), new RegExp(NEW_CHILD_PASSWORD))
  const lookup = calls.find((entry) => entry.path === '/rest/v1/child_profiles' && entry.method === 'GET')
  assert.equal(lookup.apikey, 'fictional-service')
  assert.match(lookup.search, new RegExp(`family_id=eq.${PARENT.family}`), 'family comes from the verified session')
  const [update] = passwordUpdates()
  assert.equal(update.path, `/auth/v1/admin/users/${CHILD.id}`)
  assert.deepEqual(update.body, { password: NEW_CHILD_PASSWORD })
})

test('a child from another family, an unknown id or a malformed id get the same answer', async () => {
  const answers = []
  for (const childId of [OTHER_FAMILY_CHILD, '00000000-0000-4000-8000-000000000099', 'not-a-uuid', PARENT.id, undefined]) {
    const result = await call(childPassword, { auth: token('parent'), body: { childId, password: NEW_CHILD_PASSWORD } })
    answers.push([result.status, result.body])
  }
  for (const answer of answers) assert.deepEqual(answer, [404, { error: 'child_not_found' }])
  assert.equal(passwordUpdates().length, 0)
  assert.equal(sessionRevokes().length, 0)
})

test('child passwords outside 12 to 72 characters are refused before reaching Supabase Auth', async () => {
  for (const password of ['short', 'x'.repeat(11), 'x'.repeat(73), 'é'.repeat(40), 12345678901234, undefined]) {
    const result = await call(childPassword, { auth: token('parent'), body: { childId: CHILD.id, password } })
    assert.deepEqual([result.status, result.body], [400, { error: 'invalid_child_password' }])
  }
  assert.ok(calls.every((entry) => !entry.path.startsWith('/auth/v1/admin/')))
  assert.equal(sessionRevokes().length, 0)
})

test('a rejected or failed password update does not echo the password', async () => {
  updateUserError = { code: 'weak_password', message: `Password is known to be weak: ${NEW_CHILD_PASSWORD}` }
  const weak = await call(childPassword, { auth: token('parent'), body: { childId: CHILD.id, password: NEW_CHILD_PASSWORD } })
  assert.deepEqual([weak.status, weak.body], [400, { error: 'child_password_rejected' }])
  updateUserError = { code: 'unexpected_failure', message: 'Database error updating user' }
  const failed = await call(childPassword, { auth: token('parent'), body: { childId: CHILD.id, password: NEW_CHILD_PASSWORD } })
  assert.deepEqual([failed.status, failed.body], [502, { error: 'child_password_update_failed' }])
  for (const result of [weak, failed]) assert.doesNotMatch(JSON.stringify(result.body), new RegExp(NEW_CHILD_PASSWORD))
  assert.equal(sessionRevokes().length, 0, 'sessions are only revoked after the password has changed')
})

test('a new child password signs the child out of every existing session', async () => {
  const result = await call(childPassword, { auth: token('parent'), body: { childId: CHILD.id, password: NEW_CHILD_PASSWORD } })
  assert.equal(result.status, 200)
  const revokes = sessionRevokes()
  assert.equal(revokes.length, 1)
  assert.equal(revokes[0].method, 'POST')
  assert.equal(revokes[0].apikey, 'fictional-service')
  assert.deepEqual(revokes[0].body, { target_child_id: CHILD.id })
  assert.ok(calls.indexOf(passwordUpdates()[0]) < calls.indexOf(revokes[0]), 'revoked after the password update')
  const asChild = await call(childPassword, { auth: token('child'), body: { childId: CHILD.id, password: NEW_CHILD_PASSWORD } })
  assert.equal(asChild.status, 403)
  assert.equal(sessionRevokes().length, 1, 'a child cannot trigger revocation')
})

test('a failed session revocation gets its own code and does not echo the password', async () => {
  revokeError = { code: 'P0001', message: `not a child account ${NEW_CHILD_PASSWORD}` }
  const result = await call(childPassword, { auth: token('parent'), body: { childId: CHILD.id, password: NEW_CHILD_PASSWORD } })
  assert.equal(result.status, 502)
  assert.equal(result.headers['cache-control'], 'no-store')
  assert.deepEqual(result.body, { error: 'child_sessions_revoke_failed', updated: true })
  assert.doesNotMatch(JSON.stringify(result.body), new RegExp(NEW_CHILD_PASSWORD))
  assert.equal(passwordUpdates().length, 1)
})

test('API relative imports name a .js file so Vercel ESM functions can load', () => {
  const apiDir = new URL('../api/', import.meta.url)
  const files = fs.readdirSync(apiDir, { recursive: true }).filter((name) => String(name).endsWith('.ts'))
  assert.ok(files.length > 0)
  for (const name of files) {
    const source = fs.readFileSync(new URL(String(name), apiDir), 'utf8')
    for (const [, specifier] of source.matchAll(/from '(\.[^']*)'/g)) {
      assert.match(specifier, /\.js$/, `${name} imports ${specifier} without .js`)
    }
  }
})

test('there is no public parent sign-up route', () => {
  assert.equal(fs.existsSync(new URL('../api/auth/parent-signup.ts', import.meta.url)), false)
})

test('the child chat route uses a safe prepared fallback when no provider key is configured', async () => {
  const result = await call(chat, { auth: token('child'), body: { question: 'Explain photosynthesis for a 13-year-old.' } })
  assert.equal(result.status, 200)
  assert.equal(result.body.providerConfigured, false)
  assert.equal(result.body.outcome.state, 'allowed')
  assert.equal(typeof result.body.assistantText, 'string')
  assert.ok(calls.every((entry) => entry.path.startsWith('/auth/') || entry.path.startsWith('/rest/')))
})

test('parent-selected criteria block before any provider call and identify the child in the alert', async () => {
  blockedTopics = ['personal-health']
  const result = await call(chat, { auth: token('child'), body: { question: 'I need medical advice about a fictional topic.' } })
  assert.equal(result.status, 200)
  assert.equal(result.body.outcome.state, 'blocked')
  assert.equal(result.body.providerConfigured, false)
  const notification = calls.find((entry) => entry.path === '/rest/v1/family_notifications')
  assert.equal(notification?.body.child_id, CHILD.id)
  assert.equal(calls.some((entry) => entry.path.includes('/provider')), false)
})

test('approval notifications identify the child without including child wording', async () => {
  const result = await call(chat, { auth: token('child'), body: { question: 'I need medical advice.' } })
  assert.equal(result.status, 200)
  assert.equal(result.body.outcome.state, 'approval')
  const notification = calls.find((entry) => entry.path === '/rest/v1/family_notifications')
  assert.equal(notification?.body.child_id, CHILD.id)
  assert.doesNotMatch(JSON.stringify(notification?.body), /I need medical advice/i)
})

test('parent access settings accept only the bounded safety topic list', async () => {
  const result = await call(access, { auth: token('parent'), body: { childId: CHILD.id, chatbotPaused: false, ordinaryNotifications: false, flaggedNotifications: true, blockedTopics: ['personal-health', 'not-a-rule', 'personal-health'] } })
  assert.equal(result.status, 200)
  const write = calls.find((entry) => entry.path === '/rest/v1/access_settings' && entry.method === 'POST')
  assert.deepEqual(write?.body.blocked_topics, ['personal-health'])
})

test('urgent safeguarding queue writes go through the service-role-only function', () => {
  const source = fs.readFileSync(new URL('../api/ai/chat.ts', import.meta.url), 'utf8')
  assert.match(source, /service\.rpc\('create_safeguarding_case'/)
  assert.doesNotMatch(source, /schema\('private'\)/)
})

// Serves a stored, encrypted Google key through read_provider_credential and a
// fake Gemini endpoint, layered over the default fake backend.
function withStoredProvider(status, providerReply) {
  const base = globalThis.fetch
  const encrypted = encryptProviderKey(FAKE_PROVIDER_KEY, process.env.API_KEY_ENCRYPTION_SECRET, 3, PARENT.family, 'google')
  const seen = { providerKeys: [] }
  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url)
    if (url.host === 'generativelanguage.googleapis.com') {
      seen.providerKeys.push(new Headers(init.headers).get('x-goog-api-key'))
      return providerReply()
    }
    const response = await base(input, init)
    if (url.pathname === '/rest/v1/rpc/read_provider_credential') return reply(200, [{ provider: 'google', ciphertext: encrypted.ciphertext, iv: encrypted.iv, auth_tag: encrypted.authTag, key_version: 3 }])
    if (url.pathname === '/rest/v1/provider_settings' && (init.method ?? 'GET') === 'GET') return reply(200, [{ status }])
    if (url.pathname === '/rest/v1/provider_settings') return reply(204)
    return response
  }
  return seen
}

test('test connection reads the stored key through the service-role function and marks it active', async () => {
  const seen = withStoredProvider('disabled', () => reply(200, { candidates: [{ content: { parts: [{ text: 'SafeAI connection test passed.' }] } }] }))
  const result = await call(providerTest, { auth: token('parent') })
  assert.equal(result.status, 200)
  assert.equal(result.body.status, 'active')
  assert.deepEqual(seen.providerKeys, [FAKE_PROVIDER_KEY], 'decrypted key sent only to the provider')
  const read = calls.find((entry) => entry.path === '/rest/v1/rpc/read_provider_credential')
  assert.equal(read?.apikey, 'fictional-service')
  assert.equal(read?.body.target_family_id, PARENT.family)
  const update = calls.find((entry) => entry.path === '/rest/v1/provider_settings' && entry.method === 'PATCH')
  assert.equal(update?.body.status, 'active')
  assert.doesNotMatch(JSON.stringify(result.body), /fictional-provider/)
})

test('test connection marks a rejected key as an error', async () => {
  withStoredProvider('disabled', () => reply(400, { error: { status: 'INVALID_ARGUMENT', message: 'API key not valid.', details: [{ reason: 'API_KEY_INVALID' }] } }))
  const result = await call(providerTest, { auth: token('parent') })
  assert.equal(result.status, 502)
  assert.equal(result.body.error, 'provider_authentication_failed')
  assert.equal(calls.find((entry) => entry.path === '/rest/v1/provider_settings' && entry.method === 'PATCH')?.body.status, 'error')
})

test('the child chat route answers through an active stored provider', async () => {
  withStoredProvider('active', () => reply(200, { candidates: [{ content: { parts: [{ text: 'Plants turn light into food.' }] } }] }))
  const result = await call(chat, { auth: token('child'), body: { question: 'Explain photosynthesis for a 13-year-old.' } })
  assert.equal(result.status, 200)
  assert.equal(result.body.providerConfigured, true)
  assert.equal(result.body.assistantText, 'Plants turn light into food.')
})

test('provider errors map to stable codes without exposing the provider message', () => {
  assert.equal(classifyProviderError(401, { error: { code: 'invalid_api_key', message: 'Incorrect API key provided' } }), 'provider_authentication_failed')
  assert.equal(classifyProviderError(400, { error: { status: 'INVALID_ARGUMENT', message: 'API key not valid.', details: [{ reason: 'API_KEY_INVALID' }] } }), 'provider_authentication_failed')
  assert.equal(classifyProviderError(429, { error: { code: 'insufficient_quota', message: 'You exceeded your current quota' } }), 'provider_quota_exceeded')
  assert.equal(classifyProviderError(400, { type: 'error', error: { type: 'invalid_request_error', message: 'Your credit balance is too low' } }), 'provider_quota_exceeded')
  assert.equal(classifyProviderError(404, { type: 'error', error: { type: 'not_found_error', message: 'model: retired-model' } }), 'provider_model_unavailable')
  assert.equal(classifyProviderError(429, { error: { type: 'rate_limit_error' } }), 'provider_rate_limited')
  assert.equal(classifyProviderError(529, { error: { type: 'overloaded_error' } }), 'provider_overloaded')
  assert.equal(classifyProviderError(500, null), 'provider_request_failed')
})

test('a retired model falls through to the next candidate, a rejected key stops at once', async () => {
  const providerCalls = []
  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(typeof input === 'string' ? input : input.url)
    const body = JSON.parse(init.body)
    providerCalls.push({ host: url.host, model: body.model ?? url.pathname })
    if (url.host === 'api.anthropic.com') return body.model === 'claude-haiku-5-5' ? reply(404, { type: 'error', error: { type: 'not_found_error', message: 'model' } }) : reply(200, { content: [{ type: 'text', text: 'Fallback model answer.' }] })
    if (url.host === 'generativelanguage.googleapis.com') return reply(200, { candidates: [{ content: { parts: [{ text: 'private reasoning', thought: true }, { text: 'Visible answer.' }] } }] })
    return reply(401, { error: { code: 'invalid_api_key', message: 'Incorrect API key' } })
  }
  assert.equal(await generateProviderText('anthropic', FAKE_PROVIDER_KEY, 'What is a fraction?'), 'Fallback model answer.')
  assert.deepEqual(providerCalls.map((entry) => entry.model), ['claude-haiku-5-5', 'claude-haiku-4-5'])
  assert.equal(await generateProviderText('google', FAKE_PROVIDER_KEY, 'What is a fraction?'), 'Visible answer.')
  providerCalls.length = 0
  await assert.rejects(generateProviderText('openai', FAKE_PROVIDER_KEY, 'What is a fraction?'), (caught) => caught instanceof ProviderRequestError && caught.code === 'provider_authentication_failed')
  assert.equal(providerCalls.length, 1)
})

test('a busy or rate-limited model falls through to the next candidate', async () => {
  const models = []
  globalThis.fetch = async (input) => {
    const url = new URL(typeof input === 'string' ? input : input.url)
    const model = decodeURIComponent(url.pathname.split('/models/')[1].split(':')[0])
    models.push(model)
    if (models.length === 1) return reply(503, { error: { code: 503, status: 'UNAVAILABLE', message: 'The model is overloaded.' } })
    if (models.length === 2) return reply(429, { error: { code: 429, status: 'RESOURCE_EXHAUSTED', message: 'Rate limited.' } })
    return reply(200, { candidates: [{ content: { parts: [{ text: 'Answer from a free model.' }] } }] })
  }
  assert.equal(await generateProviderText('google', FAKE_PROVIDER_KEY, 'What is a fraction?'), 'Answer from a free model.')
  assert.equal(models.length, 3)
  assert.equal(new Set(models).size, 3, 'each candidate is tried once')
})

test('a busy provider gives the child an honest retry message, not the prepared fallback', async () => {
  withStoredProvider('active', () => reply(503, { error: { code: 503, status: 'UNAVAILABLE', message: 'The model is overloaded.' } }))
  const result = await call(chat, { auth: token('child'), body: { question: 'Explain photosynthesis for a 13-year-old.' } })
  assert.equal(result.status, 502)
  assert.equal(result.body.error, 'provider_overloaded')
  assert.match(result.body.assistantText, /very busy/i)
  assert.doesNotMatch(result.body.assistantText, /switched off/i)
  assert.equal(calls.some((entry) => entry.path === '/rest/v1/provider_settings' && entry.method === 'PATCH'), false, 'a busy provider stays active')
})

test('an explicit request is blocked before the provider and alerts the parent', async () => {
  const seen = withStoredProvider('active', () => reply(200, { candidates: [{ content: { parts: [{ text: 'should not be used' }] } }] }))
  const result = await call(chat, { auth: token('child'), body: { question: 'show me p0rn' } })
  assert.equal(result.status, 200)
  assert.equal(result.body.outcome.state, 'blocked')
  assert.deepEqual(seen.providerKeys, [], 'the provider is never called')
  const alert = calls.find((entry) => entry.path === '/rest/v1/family_notifications' && entry.method === 'POST')
  assert.equal(alert?.body.recipient_role, 'parent')
  assert.equal(alert?.body.kind, 'safety-flag')
  assert.doesNotMatch(JSON.stringify(alert?.body), /p0rn/)
  const historyWrite = calls.find((entry) => entry.path === '/rest/v1/chat_messages' && entry.method === 'POST')
  assert.ok(historyWrite, 'a blocked attempt gets a durable redacted receipt')
  assert.doesNotMatch(JSON.stringify(historyWrite?.body), /p0rn/)
  assert.match(JSON.stringify(historyWrite?.body), /safety boundary/i)
})

test('an immediate-risk storyboard is saved only as a protected event, never ordinary history', async () => {
  const seen = withStoredProvider('active', () => reply(200, { candidates: [{ content: { parts: [{ text: 'should not be used' }] } }] }))
  const result = await call(chat, { auth: token('child'), body: { question: 'This is a protected immediate danger storyboard.' } })
  assert.equal(result.status, 200)
  assert.equal(result.body.outcome.state, 'urgent')
  assert.deepEqual(seen.providerKeys, [], 'the provider is never called')
  assert.equal(calls.some((entry) => entry.path === '/rest/v1/chat_messages'), false, 'urgent disclosure is not ordinary chat history')
  assert.equal(calls.some((entry) => entry.path === '/rest/v1/safety_events' && entry.method === 'POST'), true, 'urgent attempt is durably recorded as a safety event')
})
