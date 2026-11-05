// Executes the real Supabase migration in an in-process Postgres (PGlite) with
// emulated Supabase roles and auth.uid(), then attempts cross-family, sibling,
// child-to-parent and browser-to-secret access. All identities are fictional.
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import test, { before, after } from 'node:test'
import { PGlite } from '@electric-sql/pglite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const migrationDir = path.join(root, 'supabase/migrations')
const migrations = fs.readdirSync(migrationDir).filter((name) => name.endsWith('.sql') && !name.startsWith('._')).sort()

const id = (n) => `00000000-0000-4000-8000-${String(n).padStart(12, '0')}`
const FAMILY_A = id(1)
const FAMILY_B = id(2)
const PARENT_A = id(11)
const CHILD_A1 = id(12)
const CHILD_A2 = id(13)
const PARENT_B = id(21)
const CHILD_B1 = id(22)
const NEW_PARENT = id(31)
const UNCONFIRMED_PARENT = id(32)

let db

// Minimal stand-in for the Supabase platform objects the migration relies on.
const supabaseShim = `
  create role anon nologin;
  create role authenticated nologin;
  create role service_role nologin bypassrls;
  create schema auth;
  create table auth.users (id uuid primary key, email_confirmed_at timestamptz);
  create table auth.sessions (id uuid primary key, user_id uuid not null references auth.users (id) on delete cascade);
  create table auth.refresh_tokens (id bigserial primary key, token varchar(255), user_id varchar(255), session_id uuid references auth.sessions (id) on delete cascade);
  create function auth.uid() returns uuid language sql stable as $$
    select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
  $$;
  grant usage on schema auth to anon, authenticated, service_role;
  grant usage on schema public to anon, authenticated, service_role;
  alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
  alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
`

async function as(role, userId, sql, params = []) {
  await db.query(`select set_config('request.jwt.claim.sub', $1, false)`, [userId ?? ''])
  await db.exec(`set role ${role}`)
  try {
    return (await db.query(sql, params)).rows
  } finally {
    await db.exec('reset role')
    await db.query(`select set_config('request.jwt.claim.sub', '', false)`)
  }
}

const asChild = (userId, sql, params) => as('authenticated', userId, sql, params)
const asParent = asChild
const ids = (rows, key = 'child_id') => rows.map((row) => row[key]).sort()

before(async () => {
  db = new PGlite()
  await db.exec(supabaseShim)
  for (const name of migrations) await db.exec(fs.readFileSync(path.join(migrationDir, name), 'utf8'))

  await db.exec(`
    insert into auth.users (id, email_confirmed_at) values ('${PARENT_A}', now()), ('${CHILD_A1}', now()), ('${CHILD_A2}', now()), ('${PARENT_B}', now()), ('${CHILD_B1}', now()),
      ('${NEW_PARENT}', now()), ('${UNCONFIRMED_PARENT}', null);
    insert into public.families (id, name) values ('${FAMILY_A}', 'Fictional family A'), ('${FAMILY_B}', 'Fictional family B');
    insert into public.family_members (family_id, user_id, role) values
      ('${FAMILY_A}', '${PARENT_A}', 'parent'), ('${FAMILY_A}', '${CHILD_A1}', 'child'), ('${FAMILY_A}', '${CHILD_A2}', 'child'),
      ('${FAMILY_B}', '${PARENT_B}', 'parent'), ('${FAMILY_B}', '${CHILD_B1}', 'child');
    insert into public.profiles (user_id, family_id, role, display_name) values
      ('${PARENT_A}', '${FAMILY_A}', 'parent', 'Parent A'), ('${CHILD_A1}', '${FAMILY_A}', 'child', 'Child A1'),
      ('${CHILD_A2}', '${FAMILY_A}', 'child', 'Child A2'), ('${PARENT_B}', '${FAMILY_B}', 'parent', 'Parent B'),
      ('${CHILD_B1}', '${FAMILY_B}', 'child', 'Child B1');
    insert into public.child_profiles (user_id, family_id, display_name) values
      ('${CHILD_A1}', '${FAMILY_A}', 'Child A1'), ('${CHILD_A2}', '${FAMILY_A}', 'Child A2'), ('${CHILD_B1}', '${FAMILY_B}', 'Child B1');
    insert into public.chat_messages (family_id, child_id, direction, safety_state, content) values
      ('${FAMILY_A}', '${CHILD_A1}', 'child', 'allowed', 'A1 fictional question'),
      ('${FAMILY_A}', '${CHILD_A2}', 'child', 'allowed', 'A2 fictional question'),
      ('${FAMILY_B}', '${CHILD_B1}', 'child', 'allowed', 'B1 fictional question');
    insert into public.safety_events (family_id, child_id, state, category, context_summary, protected) values
      ('${FAMILY_A}', '${CHILD_A1}', 'blocked', 'unsafe-instructions', 'Fictional blocked request', false),
      ('${FAMILY_A}', '${CHILD_A1}', 'urgent', 'protected-escalation', '', true),
      ('${FAMILY_B}', '${CHILD_B1}', 'approval', 'medical-topic', 'Fictional approval topic', false);
    insert into public.approval_requests (family_id, child_id, category, context_summary) values
      ('${FAMILY_A}', '${CHILD_A1}', 'medical-topic', 'Fictional A1 request'),
      ('${FAMILY_A}', '${CHILD_A2}', 'medical-topic', 'Fictional A2 request'),
      ('${FAMILY_B}', '${CHILD_B1}', 'medical-topic', 'Fictional B1 request');
    insert into public.access_settings (family_id, child_id) values
      ('${FAMILY_A}', '${CHILD_A1}'), ('${FAMILY_A}', '${CHILD_A2}'), ('${FAMILY_B}', '${CHILD_B1}');
  `)
  await as('service_role', null, `select public.store_provider_credential($1, 'openai', 'AB12', 'fictional-ciphertext', 'fictional-iv', 'fictional-tag', 1)`, [FAMILY_A])
  await as('service_role', null, `select public.store_provider_credential($1, 'anthropic', 'CD34', 'fictional-ciphertext', 'fictional-iv', 'fictional-tag', 1)`, [FAMILY_B])
})

after(async () => { await db?.close() })

test('anonymous visitors cannot read any table or call helpers', async () => {
  for (const table of ['families', 'family_members', 'profiles', 'child_profiles', 'chat_messages', 'safety_events', 'approval_requests', 'parent_decisions', 'access_settings', 'provider_settings']) {
    await assert.rejects(as('anon', null, `select * from public.${table}`), /permission denied/, table)
  }
  await assert.rejects(as('anon', null, `select private.is_family_parent($1)`, [FAMILY_A]), /permission denied/)
  await assert.rejects(as('anon', null, `select * from private.provider_credentials`), /permission denied/)
})

test('a child sees only their own rows and never a sibling', async () => {
  assert.deepEqual(ids(await asChild(CHILD_A1, 'select child_id from public.chat_messages')), [CHILD_A1])
  assert.deepEqual(ids(await asChild(CHILD_A1, 'select child_id from public.approval_requests')), [CHILD_A1])
  assert.deepEqual(ids(await asChild(CHILD_A1, 'select child_id from public.access_settings')), [CHILD_A1])
  assert.ok((await asChild(CHILD_A1, 'select child_id from public.safety_events')).every((row) => row.child_id === CHILD_A1))
  assert.deepEqual(ids(await asChild(CHILD_A1, 'select user_id from public.child_profiles'), 'user_id'), [CHILD_A1])
  assert.deepEqual(ids(await asChild(CHILD_A1, 'select user_id from public.profiles'), 'user_id'), [CHILD_A1])
  assert.deepEqual(ids(await asChild(CHILD_A1, 'select user_id from public.family_members'), 'user_id'), [CHILD_A1])
  assert.equal((await asChild(CHILD_A1, 'select id from public.families')).length, 0)
  assert.equal((await asChild(CHILD_A1, `select id from public.chat_messages where child_id = $1`, [CHILD_A2])).length, 0)
})

test('parent-selected safety topics stay scoped to one child and reject unknown topics', async () => {
  await asParent(PARENT_A, `update public.access_settings set blocked_topics = array['personal-health', 'public-posting']::text[] where family_id = $1 and child_id = $2`, [FAMILY_A, CHILD_A1])
  const selected = await asParent(PARENT_A, `select child_id, blocked_topics from public.access_settings where child_id = $1`, [CHILD_A1])
  assert.deepEqual(selected, [{ child_id: CHILD_A1, blocked_topics: ['personal-health', 'public-posting'] }])
  const childView = await asChild(CHILD_A1, `select blocked_topics from public.access_settings where child_id = $1`, [CHILD_A1])
  assert.deepEqual(childView, [{ blocked_topics: ['personal-health', 'public-posting'] }])
  assert.equal((await asChild(CHILD_A2, `select blocked_topics from public.access_settings where child_id = $1`, [CHILD_A1])).length, 0)
  await assert.rejects(asParent(PARENT_A, `update public.access_settings set blocked_topics = array['unknown-topic']::text[] where child_id = $1`, [CHILD_A1]), /check constraint/)
})

test('a child cannot reach parent API settings or key material', async () => {
  assert.equal((await asChild(CHILD_A1, 'select * from public.provider_settings')).length, 0)
  await assert.rejects(asChild(CHILD_A1, 'select * from private.provider_credentials'), /permission denied/)
  await assert.rejects(asChild(CHILD_A1, `select public.store_provider_credential($1, 'openai', 'ZZZZ', 'x', 'x', 'x', 1)`, [FAMILY_A]), /permission denied/)
  await assert.rejects(asChild(CHILD_A1, `select public.remove_provider_credential($1)`, [FAMILY_A]), /permission denied/)
})

test('a child cannot forge history, safety events or approvals', async () => {
  await assert.rejects(asChild(CHILD_A1, `insert into public.chat_messages (family_id, child_id, direction, safety_state, content) values ($1, $2, 'assistant', 'allowed', 'forged')`, [FAMILY_A, CHILD_A1]), /permission denied/)
  await assert.rejects(asChild(CHILD_A1, `insert into public.safety_events (family_id, child_id, state, category, context_summary) values ($1, $2, 'allowed', 'x', 'x')`, [FAMILY_A, CHILD_A1]), /permission denied/)
  await assert.rejects(asChild(CHILD_A1, `insert into public.approval_requests (family_id, child_id, category, context_summary, status, resolved_at) values ($1, $2, 'x', 'x', 'approved', now())`, [FAMILY_A, CHILD_A1]), /permission denied/)
  const updated = await asChild(CHILD_A1, `update public.approval_requests set status = 'approved', resolved_at = now() where child_id = $1 returning id`, [CHILD_A1])
  assert.equal(updated.length, 0)
  const settingUpdate = await asChild(CHILD_A1, `update public.access_settings set chatbot_paused = false, retention_days = 365 where child_id = $1 returning child_id`, [CHILD_A1])
  assert.equal(settingUpdate.length, 0, 'children cannot change their own access settings')
  const historyDelete = await asChild(CHILD_A1, `delete from public.chat_messages where child_id = $1 returning id`, [CHILD_A1])
  assert.equal(historyDelete.length, 0, 'children cannot erase their own history')
  assert.equal((await db.query(`select 1 from public.chat_messages where child_id = $1`, [CHILD_A1])).rows.length, 1)
})

test('a parent sees their own family and never another family', async () => {
  assert.deepEqual(ids(await asParent(PARENT_A, 'select child_id from public.chat_messages')), [CHILD_A1, CHILD_A2].sort())
  assert.deepEqual(ids(await asParent(PARENT_A, 'select user_id from public.child_profiles'), 'user_id'), [CHILD_A1, CHILD_A2].sort())
  assert.deepEqual(ids(await asParent(PARENT_A, 'select id from public.families'), 'id'), [FAMILY_A])
  for (const table of ['chat_messages', 'safety_events', 'approval_requests', 'access_settings', 'provider_settings', 'family_members', 'profiles']) {
    const rows = await asParent(PARENT_A, `select family_id from public.${table} where family_id = $1`, [FAMILY_B])
    assert.equal(rows.length, 0, table)
  }
  const resolved = await asParent(PARENT_A, `update public.approval_requests set status = 'approved', resolved_at = now() where child_id = $1 returning id`, [CHILD_B1])
  assert.equal(resolved.length, 0)
  const deleted = await asParent(PARENT_B, `delete from public.chat_messages where family_id = $1 returning id`, [FAMILY_A])
  assert.equal(deleted.length, 0)
})

test('a parent cannot attach another family’s child to their own family rows', async () => {
  await assert.rejects(asParent(PARENT_A, `insert into public.access_settings (family_id, child_id) values ($1, $2)`, [FAMILY_A, CHILD_B1]), /foreign key|violates/)
  await assert.rejects(asParent(PARENT_A, `insert into public.access_settings (family_id, child_id) values ($1, $2)`, [FAMILY_B, CHILD_B1]), /row-level security|violates/)
  await assert.rejects(db.query(`insert into public.chat_messages (family_id, child_id, direction, safety_state, content) values ($1, $2, 'child', 'allowed', 'mismatch')`, [FAMILY_A, CHILD_B1]), /foreign key/)
  await assert.rejects(db.query(`insert into public.family_members (family_id, user_id, role) values ($1, $2, 'parent')`, [FAMILY_B, PARENT_A]), /duplicate key|unique/)
})

test('parent approval is limited to resolving pending requests in their family', async () => {
  await assert.rejects(asParent(PARENT_A, `update public.approval_requests set child_id = $1 where child_id = $2`, [CHILD_B1, CHILD_A1]), /permission denied/)
  await assert.rejects(asParent(PARENT_A, `update public.approval_requests set status = 'approved' where child_id = $1`, [CHILD_A1]), /violates/)
  const approved = await asParent(PARENT_A, `update public.approval_requests set status = 'approved', resolved_at = now() where child_id = $1 returning id`, [CHILD_A1])
  assert.equal(approved.length, 1)
  const reopened = await asParent(PARENT_A, `update public.approval_requests set status = 'pending', resolved_at = null where child_id = $1 returning id`, [CHILD_A1])
  assert.equal(reopened.length, 0)
  await asParent(PARENT_A, `insert into public.parent_decisions (approval_request_id, parent_id, decision) values ($1, $2, 'approved')`, [approved[0].id, PARENT_A])
  await assert.rejects(asParent(PARENT_A, `insert into public.parent_decisions (approval_request_id, parent_id, decision) values ($1, $2, 'approved')`, [approved[0].id, PARENT_B]), /row-level security/)
  assert.equal((await asParent(PARENT_B, 'select id from public.parent_decisions')).length, 0)
})

test('protected escalations never expose disclosure text and urgent content is not stored as history', async () => {
  const events = await asParent(PARENT_A, `select category, context_summary from public.safety_events where protected`)
  assert.equal(events.length, 1)
  assert.deepEqual(events[0], { category: 'protected-escalation', context_summary: '' })
  await assert.rejects(db.query(`insert into public.safety_events (family_id, child_id, state, category, context_summary, protected) values ($1, $2, 'urgent', 'abuse', 'disclosure text', true)`, [FAMILY_A, CHILD_A1]), /check constraint/)
  await assert.rejects(db.query(`insert into public.safety_events (family_id, child_id, state, category, context_summary, protected) values ($1, $2, 'urgent', 'protected-escalation', '', false)`, [FAMILY_A, CHILD_A1]), /check constraint/)
  await assert.rejects(db.query(`insert into public.chat_messages (family_id, child_id, direction, safety_state, content) values ($1, $2, 'child', 'urgent', 'not stored')`, [FAMILY_A, CHILD_A1]), /check constraint/)
})

test('provider metadata is parent read-only and credentials are removable by the server only', async () => {
  const metadata = await asParent(PARENT_A, 'select * from public.provider_settings')
  assert.equal(metadata.length, 1)
  assert.deepEqual(Object.keys(metadata[0]).sort(), ['family_id', 'last_tested_at', 'masked_ending', 'provider', 'status', 'updated_at'])
  await assert.rejects(asParent(PARENT_A, `update public.provider_settings set status = 'active'`), /permission denied/)
  await assert.rejects(asParent(PARENT_A, `insert into public.provider_settings (family_id, provider) values ($1, 'openai')`, [FAMILY_A]), /permission denied/)
  await assert.rejects(asParent(PARENT_A, 'select * from private.provider_credentials'), /permission denied/)
  await assert.rejects(asParent(PARENT_A, `select public.remove_provider_credential($1)`, [FAMILY_B]), /permission denied/)

  await as('service_role', null, `select public.store_provider_credential($1, 'openai', 'EF56', 'rotated-ciphertext', 'rotated-iv', 'rotated-tag', 2)`, [FAMILY_A])
  const rotated = (await db.query(`select key_version from private.provider_credentials where family_id = $1`, [FAMILY_A])).rows
  assert.deepEqual(rotated, [{ key_version: 2 }])
  assert.equal((await asParent(PARENT_A, 'select masked_ending from public.provider_settings'))[0].masked_ending, 'EF56')

  await as('service_role', null, `select public.remove_provider_credential($1)`, [FAMILY_A])
  assert.equal((await db.query(`select 1 from private.provider_credentials where family_id = $1`, [FAMILY_A])).rows.length, 0)
  assert.equal((await asParent(PARENT_A, 'select 1 from public.provider_settings')).length, 0)
  assert.equal((await db.query(`select 1 from private.provider_credentials where family_id = $1`, [FAMILY_B])).rows.length, 1)
})

test('history deletion and retention purge stay inside the family', async () => {
  await db.query(`insert into public.chat_messages (family_id, child_id, direction, safety_state, content, created_at) values ($1, $2, 'child', 'allowed', 'old fictional message', now() - interval '400 days')`, [FAMILY_B, CHILD_B1])
  const purged = await as('service_role', null, 'select public.purge_expired_chat_messages() as removed')
  assert.equal(purged[0].removed, 1)
  await assert.rejects(asParent(PARENT_A, 'select public.purge_expired_chat_messages()'), /permission denied/)

  const deleted = await asParent(PARENT_A, `delete from public.chat_messages returning child_id`)
  assert.deepEqual(ids(deleted), [CHILD_A1, CHILD_A2].sort())
  assert.equal((await db.query(`select 1 from public.chat_messages where family_id = $1`, [FAMILY_B])).rows.length, 1)
})

test('a confirmed new parent can create exactly one family, bound to their own account', async () => {
  const setup = `select public.create_parent_family($1, $2) as family_id`
  await assert.rejects(as('anon', null, setup, ['Fictional parent', 'Fictional family']), /permission denied/)
  await assert.rejects(as('authenticated', null, setup, ['Fictional parent', 'Fictional family']), /authentication_required/)
  await assert.rejects(as('authenticated', UNCONFIRMED_PARENT, setup, ['Fictional parent', 'Fictional family']), /email_not_confirmed/)
  await assert.rejects(as('authenticated', CHILD_A1, setup, ['Fictional child', 'Fictional family']), /family_already_exists/)
  await assert.rejects(as('authenticated', PARENT_B, setup, ['Parent B', 'Second family']), /family_already_exists/)
  await assert.rejects(as('authenticated', NEW_PARENT, setup, ['   ', 'Fictional family']), /invalid_family_setup/)
  await assert.rejects(as('authenticated', NEW_PARENT, setup, ['Fictional parent', 'x'.repeat(81)]), /invalid_family_setup/)

  const [{ family_id: created }] = await as('authenticated', NEW_PARENT, setup, ['  Fictional parent  ', 'Fictional family C'])
  assert.ok(created && created !== FAMILY_A && created !== FAMILY_B)
  const membership = await asParent(NEW_PARENT, 'select family_id, role from public.family_members')
  assert.deepEqual(membership, [{ family_id: created, role: 'parent' }])
  const profile = await asParent(NEW_PARENT, 'select display_name, role from public.profiles')
  assert.deepEqual(profile, [{ display_name: 'Fictional parent', role: 'parent' }])
  assert.equal((await asParent(NEW_PARENT, 'select 1 from public.child_profiles')).length, 0)
  assert.equal((await asParent(NEW_PARENT, 'select 1 from public.chat_messages')).length, 0)
  await assert.rejects(as('authenticated', NEW_PARENT, setup, ['Fictional parent', 'Another family']), /family_already_exists/)
  assert.equal((await db.query(`select 1 from public.family_members where user_id = $1`, [UNCONFIRMED_PARENT])).rows.length, 0)
})

test('only the server can sign a child out everywhere, and only that child', async () => {
  const session = (n) => `00000000-0000-4000-9000-${String(n).padStart(12, '0')}`
  await db.exec(`
    insert into auth.sessions (id, user_id) values ('${session(1)}', '${CHILD_A1}'), ('${session(2)}', '${CHILD_A1}'), ('${session(3)}', '${CHILD_A2}'), ('${session(4)}', '${PARENT_A}');
    insert into auth.refresh_tokens (token, user_id, session_id) values
      ('fictional-a1-1', '${CHILD_A1}', '${session(1)}'), ('fictional-a1-2', '${CHILD_A1}', '${session(2)}'), ('fictional-a1-legacy', '${CHILD_A1}', null),
      ('fictional-a2', '${CHILD_A2}', '${session(3)}'), ('fictional-parent', '${PARENT_A}', '${session(4)}');
  `)
  const revoke = 'select public.revoke_child_sessions($1)'
  await assert.rejects(as('anon', null, revoke, [CHILD_A1]), /permission denied/)
  await assert.rejects(asChild(CHILD_A1, revoke, [CHILD_A1]), /permission denied/)
  await assert.rejects(asParent(PARENT_A, revoke, [CHILD_A1]), /permission denied/)
  await assert.rejects(as('service_role', null, revoke, [PARENT_A]), /not_a_child_account/)
  await assert.rejects(as('service_role', null, revoke, [null]), /not_a_child_account/)

  await as('service_role', null, revoke, [CHILD_A1])
  const remaining = async (table) => (await db.query(`select user_id::text from auth.${table} order by user_id`)).rows.map((row) => row.user_id)
  assert.deepEqual(await remaining('sessions'), [CHILD_A2, PARENT_A].sort())
  assert.deepEqual(await remaining('refresh_tokens'), [CHILD_A2, PARENT_A].sort())
})
