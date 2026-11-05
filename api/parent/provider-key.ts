import { requireRole, serviceClient, type HeaderRequest } from '../_lib/auth.js'
import { encryptionConfig, encryptProviderKey, isProvider, maskProviderKey } from '../_lib/provider-key.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'

type RequestLike = HeaderRequest & { method?: string; body?: unknown }

const KEY_SHAPE = /^[\x21-\x7e]{16,4096}$/

// POST stores or rotates the family's provider key (encrypted, server-side only).
// DELETE removes it. Raw key material is never returned, logged or echoed.
export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'POST' && request.method !== 'DELETE') return json(response, 405, { error: 'method_not_allowed' })
  try {
    const auth = await requireRole(request, 'parent')
    if (!auth.ok) return json(response, auth.status, { error: auth.error })
    const { familyId } = auth.user

    const service = serviceClient()
    if (!service) return json(response, 503, { error: 'secure_backend_not_configured' })

    if (request.method === 'DELETE') {
      const { error } = await service.rpc('remove_provider_credential', { target_family_id: familyId })
      if (error) return json(response, 502, { error: 'provider_storage_failed' })
      return json(response, 200, { removed: true })
    }

    const body = (request.body && typeof request.body === 'object' ? request.body : {}) as { provider?: unknown; apiKey?: unknown }
    const provider = body.provider
    const apiKey = typeof body.apiKey === 'string' ? body.apiKey.trim() : ''
    if (!isProvider(provider) || !KEY_SHAPE.test(apiKey)) return json(response, 400, { error: 'invalid_provider_key_request' })

    const encryption = encryptionConfig()
    if (!encryption) return json(response, 503, { error: 'secure_backend_not_configured' })
    const encrypted = encryptProviderKey(apiKey, encryption.secret, encryption.keyVersion, familyId, provider)
    const maskedEnding = maskProviderKey(apiKey)

    const { error } = await service.rpc('store_provider_credential', {
      target_family_id: familyId,
      target_provider: provider,
      target_masked_ending: maskedEnding,
      encrypted_ciphertext: encrypted.ciphertext,
      encrypted_iv: encrypted.iv,
      encrypted_auth_tag: encrypted.authTag,
      encryption_key_version: encrypted.keyVersion,
    })
    if (error) return json(response, 502, { error: 'provider_storage_failed' })
    // Stored as "disabled": no provider connection or key test exists yet.
    return json(response, 200, { metadata: { provider, maskedEnding, status: 'disabled' } })
  } catch {
    return json(response, 500, { error: 'internal_error' })
  }
}
