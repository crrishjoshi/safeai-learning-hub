import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const migrationName = fs.readdirSync(path.join(root, 'supabase/migrations')).find((name) => name.endsWith('.sql') && !name.startsWith('._'))
const migration = fs.readFileSync(path.join(root, 'supabase/migrations', migrationName), 'utf8')

test('prepared migration enables RLS on every public data table', () => {
  const tables = [...migration.matchAll(/create table public\.([a-z_]+)/g)].map((match) => match[1])
  assert.ok(tables.length >= 9)
  for (const table of tables) assert.match(migration, new RegExp(`alter table public\\.${table} enable row level security`))
  assert.match(migration, /revoke all on table private\.provider_credentials from (public, )?anon, authenticated/)
})

test('prepared policies use family or child ownership and not authentication alone', () => {
  const policyLines = migration.split('\n').filter((line) => line.includes('create policy'))
  assert.ok(policyLines.length >= 15)
  for (const line of policyLines) assert.doesNotMatch(line, /to authenticated using \(true\)/i)
  assert.match(migration, /private\.is_family_parent/)
  assert.match(migration, /private\.is_child/)
  assert.match(migration, /create table private\.provider_credentials/)
})

test('authorization never relies on editable user metadata and key functions are server-only', () => {
  assert.doesNotMatch(migration, /user_metadata|raw_user_meta_data/)
  for (const fn of ['store_provider_credential', 'remove_provider_credential', 'purge_expired_chat_messages']) {
    assert.match(migration, new RegExp(`revoke all on function public\\.${fn}\\([^)]*\\) from public, anon, authenticated`))
    assert.match(migration, new RegExp(`grant execute on function public\\.${fn}\\([^)]*\\) to service_role`))
  }
})
