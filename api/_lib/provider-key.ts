import { createCipheriv, createDecipheriv, hkdfSync, randomBytes } from 'node:crypto'

export const PROVIDERS = ['openai', 'anthropic', 'google'] as const
export type Provider = (typeof PROVIDERS)[number]
export const isProvider = (value: unknown): value is Provider => typeof value === 'string' && (PROVIDERS as readonly string[]).includes(value)

export type EncryptedKey = { ciphertext: string; iv: string; authTag: string; keyVersion: number }

const MIN_SECRET_LENGTH = 32

export function encryptionConfig(): { secret: string; keyVersion: number } | null {
  const secret = process.env.API_KEY_ENCRYPTION_SECRET
  const keyVersion = Number(process.env.API_KEY_ENCRYPTION_KEY_VERSION ?? '1')
  if (!secret || secret.length < MIN_SECRET_LENGTH || !Number.isInteger(keyVersion) || keyVersion < 1) return null
  return { secret, keyVersion }
}

export function maskProviderKey(rawKey: string): string {
  return rawKey.slice(-4).replace(/[^a-zA-Z0-9]/g, '*').padStart(4, '*')
}

function deriveKey(secret: string, keyVersion: number): Buffer {
  return Buffer.from(hkdfSync('sha256', secret, 'safeai-provider-credentials', `provider-key-v${keyVersion}`, 32))
}

// Additional authenticated data binds a ciphertext to one family and provider,
// so a row copied to another family cannot be decrypted there.
const aad = (familyId: string, provider: Provider) => Buffer.from(`${familyId}:${provider}`, 'utf8')

export function encryptProviderKey(rawKey: string, secret: string, keyVersion: number, familyId: string, provider: Provider): EncryptedKey {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', deriveKey(secret, keyVersion), iv)
  cipher.setAAD(aad(familyId, provider))
  const ciphertext = Buffer.concat([cipher.update(rawKey, 'utf8'), cipher.final()])
  return { ciphertext: ciphertext.toString('base64url'), iv: iv.toString('base64url'), authTag: cipher.getAuthTag().toString('base64url'), keyVersion }
}

// Server-only. For the future provider call; the result must never be returned,
// logged or included in an error.
export function decryptProviderKey(encrypted: EncryptedKey, secret: string, familyId: string, provider: Provider): string {
  const decipher = createDecipheriv('aes-256-gcm', deriveKey(secret, encrypted.keyVersion), Buffer.from(encrypted.iv, 'base64url'))
  decipher.setAAD(aad(familyId, provider))
  decipher.setAuthTag(Buffer.from(encrypted.authTag, 'base64url'))
  return Buffer.concat([decipher.update(Buffer.from(encrypted.ciphertext, 'base64url')), decipher.final()]).toString('utf8')
}
