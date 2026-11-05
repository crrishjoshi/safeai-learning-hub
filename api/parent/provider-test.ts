import { requireRole, serviceClient, type HeaderRequest } from '../_lib/auth.js'
import { readProviderCredential, testProviderConnection, ProviderRequestError } from '../_lib/ai-provider.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'

type RequestLike = HeaderRequest & { method?: string }

export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'POST') return json(response, 405, { error: 'method_not_allowed' })
  try {
    const auth = await requireRole(request, 'parent')
    if (!auth.ok) return json(response, auth.status, { error: auth.error })
    const service = serviceClient()
    if (!service) return json(response, 503, { error: 'secure_backend_not_configured' })
    const credential = await readProviderCredential(service, auth.user.familyId, { requireActive: false })
    if (!credential) return json(response, 409, { error: 'provider_not_configured' })
    try {
      await testProviderConnection(credential.provider, credential.apiKey)
      const testedAt = new Date().toISOString()
      const { error } = await service.from('provider_settings').update({ status: 'active', last_tested_at: testedAt }).eq('family_id', auth.user.familyId)
      if (error) return json(response, 502, { error: 'provider_status_update_failed' })
      return json(response, 200, { provider: credential.provider, status: 'active', lastTested: testedAt })
    } catch (caught) {
      const error = caught instanceof ProviderRequestError ? caught.code : 'provider_request_failed'
      // A rejected key is marked as an error. Transient failures (rate limits,
      // timeouts, outages) leave a previously working provider active.
      const update = error === 'provider_authentication_failed' ? { status: 'error', last_tested_at: new Date().toISOString() } : { last_tested_at: new Date().toISOString() }
      await service.from('provider_settings').update(update).eq('family_id', auth.user.familyId)
      return json(response, 502, { error })
    }
  } catch {
    return json(response, 500, { error: 'internal_error' })
  }
}

