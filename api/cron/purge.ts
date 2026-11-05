import { serviceClient } from '../_lib/auth.js'
import type { JsonResponse } from '../_lib/response.js'
import { json } from '../_lib/response.js'

type RequestLike = { method?: string; headers?: Record<string, string | string[] | undefined> }

export default async function handler(request: RequestLike, response: JsonResponse) {
  if (request.method !== 'GET' && request.method !== 'POST') return json(response, 405, { error: 'method_not_allowed' })
  const expected = process.env.CRON_SECRET
  const raw = request.headers?.authorization ?? request.headers?.Authorization
  const authorization = Array.isArray(raw) ? raw[0] : raw
  if (!expected || authorization !== `Bearer ${expected}`) return json(response, 401, { error: 'authentication_required' })
  const service = serviceClient()
  if (!service) return json(response, 503, { error: 'secure_backend_not_configured' })
  const { data, error } = await service.rpc('purge_expired_family_data')
  if (error) return json(response, 502, { error: 'retention_purge_failed' })
  return json(response, 200, { purged: data })
}
