import type { SupabaseClient } from '@supabase/supabase-js'
import { decryptProviderKey, encryptionConfig, type Provider, type EncryptedKey } from './provider-key.js'

// Candidate models per provider, tried in order. A model the key cannot use
// (retired, renamed or not enabled for the account) falls through to the next
// candidate, so one deprecation never breaks every family. An env override is
// always tried first.
const DEFAULT_MODELS: Record<Provider, string[]> = {
  openai: ['gpt-4o-mini', 'gpt-5-mini', 'gpt-6-luna'],
  anthropic: ['claude-haiku-5-5', 'claude-haiku-4-5'],
  google: ['gemini-3.6-flash', 'gemini-flash-latest', 'gemini-3.5-flash-lite'],
}
const MODEL_ENV: Record<Provider, string> = { openai: 'OPENAI_MODEL', anthropic: 'ANTHROPIC_MODEL', google: 'GOOGLE_MODEL' }
const REQUEST_TIMEOUT_MS = 25_000

// The model that last worked for each provider on this warm instance, so later
// requests skip candidates that already failed.
const workingModel: Partial<Record<Provider, string>> = {}

export function providerModels(provider: Provider): string[] {
  const override = process.env[MODEL_ENV[provider]]?.trim()
  const preferred = workingModel[provider]
  return [...new Set([preferred, override, ...DEFAULT_MODELS[provider]].filter((model): model is string => Boolean(model)))]
}

export class ProviderRequestError extends Error {
  readonly code: string
  readonly status: number

  constructor(code: string, status = 502) {
    super(code)
    this.code = code
    this.status = status
  }
}

// Codes that mean the next candidate model may still work with the same key.
// Overload and rate limits are per model (Gemini often returns 503 for one
// model while another answers), so they fall through too. Timeouts do not,
// to keep the total wait bounded.
const MODEL_RETRY_CODES = new Set(['provider_model_unavailable', 'provider_bad_request', 'provider_overloaded', 'provider_rate_limited', 'provider_empty_response'])

type ProviderErrorBody = { error?: { code?: unknown; type?: unknown; status?: unknown; message?: unknown; details?: unknown } | unknown; type?: unknown }

// Maps a provider error response to a stable code. The provider's message is
// only pattern-matched, never returned or logged, because it can echo request
// details.
export function classifyProviderError(status: number, body: unknown): string {
  const parsed = (body && typeof body === 'object' ? body : {}) as ProviderErrorBody
  const error = (parsed.error && typeof parsed.error === 'object' ? parsed.error : {}) as { code?: unknown; type?: unknown; status?: unknown; message?: unknown; details?: unknown }
  const code = typeof error.code === 'string' ? error.code : ''
  const type = typeof error.type === 'string' ? error.type : ''
  const googleStatus = typeof error.status === 'string' ? error.status : ''
  const message = typeof error.message === 'string' ? error.message.toLowerCase() : ''
  const reasons = Array.isArray(error.details) ? error.details.map((detail) => (detail && typeof detail === 'object' ? String((detail as { reason?: unknown }).reason ?? '') : '')) : []

  if (code === 'invalid_api_key' || type === 'authentication_error' || reasons.includes('API_KEY_INVALID') || /api key (not valid|is invalid|expired)|invalid (x-)?api[- ]key|incorrect api key/.test(message)) return 'provider_authentication_failed'
  if (code === 'insufficient_quota' || code === 'billing_hard_limit_reached' || /credit balance|billing|exceeded your current quota|insufficient.?quota/.test(message)) return 'provider_quota_exceeded'
  if (code === 'model_not_found' || type === 'not_found_error' || status === 404 || /model.*(not found|does not exist|not supported|is not available|unsupported|no access|deprecated|retired)|(unknown|invalid|unsupported) model|do(es)? not have access to (the )?model/.test(message)) return 'provider_model_unavailable'
  if (status === 401 || type === 'permission_error' || googleStatus === 'PERMISSION_DENIED' || googleStatus === 'UNAUTHENTICATED' || status === 403) return 'provider_authentication_failed'
  if (status === 429 || type === 'rate_limit_error' || googleStatus === 'RESOURCE_EXHAUSTED') return 'provider_rate_limited'
  if (status === 529 || type === 'overloaded_error' || status === 503 || googleStatus === 'UNAVAILABLE') return 'provider_overloaded'
  if (status === 400 || status === 422) return 'provider_bad_request'
  return 'provider_request_failed'
}

export async function readProviderCredential(service: SupabaseClient, familyId: string, options: { requireActive?: boolean } = {}): Promise<{ provider: Provider; apiKey: string } | null> {
  const encryption = encryptionConfig()
  if (!encryption) return null
  if (options.requireActive !== false) {
    const { data: settings, error: settingsError } = await service.from('provider_settings').select('status').eq('family_id', familyId).maybeSingle()
    if (settingsError || settings?.status !== 'active') return null
  }
  // The private schema is not exposed to the Data API; a service-role-only
  // function is the read path for the encrypted credential.
  const { data: rows, error } = await service.rpc('read_provider_credential', { target_family_id: familyId })
  const data = Array.isArray(rows) ? (rows[0] as { provider: string; ciphertext: string; iv: string; auth_tag: string; key_version: number } | undefined) : undefined
  if (error || !data) return null
  const provider = data.provider as Provider
  const encrypted: EncryptedKey = { ciphertext: data.ciphertext, iv: data.iv, authTag: data.auth_tag, keyVersion: data.key_version }
  return { provider, apiKey: decryptProviderKey(encrypted, encryption.secret, familyId, provider) }
}

async function providerFetch(provider: Provider, model: string, url: string, init: RequestInit) {
  let response: Response
  try {
    response = await fetch(url, { ...init, signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) })
  } catch (caught) {
    const timedOut = caught instanceof Error && (caught.name === 'TimeoutError' || caught.name === 'AbortError')
    throw new ProviderRequestError(timedOut ? 'provider_timeout' : 'provider_unreachable', 502)
  }
  if (!response.ok) {
    const body = await response.json().catch(() => null)
    const code = classifyProviderError(response.status, body)
    // Only non-sensitive fields: provider, model id, HTTP status and our code.
    console.warn(`provider_error provider=${provider} model=${model} status=${response.status} code=${code}`)
    throw new ProviderRequestError(code, 502)
  }
  return response.json() as Promise<Record<string, unknown>>
}

function extractText(provider: Provider, payload: Record<string, unknown>): string {
  if (provider === 'openai') {
    const choices = Array.isArray(payload.choices) ? payload.choices : []
    const content = (choices[0] as { message?: { content?: unknown } } | undefined)?.message?.content
    if (typeof content === 'string' && content.trim()) return content.trim()
  }
  if (provider === 'anthropic') {
    const content = Array.isArray(payload.content) ? payload.content : []
    const text = content
      .filter((part) => typeof part === 'object' && part !== null && (part as { type?: unknown }).type === 'text' && typeof (part as { text?: unknown }).text === 'string')
      .map((part) => (part as { text: string }).text)
      .join('')
      .trim()
    if (text) return text
  }
  if (provider === 'google') {
    const candidates = Array.isArray(payload.candidates) ? payload.candidates : []
    const parts = ((candidates[0] as { content?: { parts?: unknown[] } } | undefined)?.content?.parts ?? [])
    // Thinking models return thought summaries flagged `thought: true`; skip them.
    const text = parts
      .filter((part) => typeof part === 'object' && part !== null && typeof (part as { text?: unknown }).text === 'string' && (part as { thought?: unknown }).thought !== true)
      .map((part) => (part as { text: string }).text)
      .join('')
      .trim()
    if (text) return text
  }
  throw new ProviderRequestError('provider_empty_response', 502)
}

// Reasoning models reject `temperature` and spend part of the output budget on
// thinking, so they get a larger budget.
const isOpenAIReasoningModel = (model: string) => /^(o\d|gpt-[5-9])/.test(model)

async function requestModel(provider: Provider, model: string, apiKey: string, system: string, userText: string): Promise<string> {
  let payload: Record<string, unknown>
  if (provider === 'openai') {
    const reasoning = isOpenAIReasoningModel(model)
    payload = await providerFetch(provider, model, 'https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { authorization: `Bearer ${apiKey}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        model,
        ...(reasoning ? { reasoning_effort: 'low', max_completion_tokens: 2_000 } : { temperature: 0.2, max_completion_tokens: 500 }),
        messages: [{ role: 'system', content: system }, { role: 'user', content: userText }],
      }),
    })
  } else if (provider === 'anthropic') {
    payload = await providerFetch(provider, model, 'https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model, max_tokens: 1_024, system, messages: [{ role: 'user', content: userText }] }),
    })
  } else {
    payload = await providerFetch(provider, model, `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'x-goog-api-key': apiKey, 'content-type': 'application/json' },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: [{ role: 'user', parts: [{ text: userText }] }], generationConfig: { maxOutputTokens: 2_048 } }),
    })
  }
  return extractText(provider, payload)
}

export async function generateProviderText(provider: Provider, apiKey: string, userText: string): Promise<string> {
  const system = 'You are SafeAI, an age-appropriate learning assistant for young people aged 12 to 14. Be concise, kind and educational. Do not provide dangerous, illegal, sexual, self-harm, abuse, credential, privacy-invasive or evasion instructions. If a question needs professional or emergency help, say so and recommend a trusted adult. Never claim to be an emergency service.'
  let lastError: ProviderRequestError = new ProviderRequestError('provider_model_unavailable', 502)
  for (const model of providerModels(provider)) {
    try {
      const text = await requestModel(provider, model, apiKey, system, userText)
      if (text.length > 12_000) throw new ProviderRequestError('provider_invalid_response', 502)
      workingModel[provider] = model
      return text
    } catch (caught) {
      lastError = caught instanceof ProviderRequestError ? caught : new ProviderRequestError('provider_request_failed', 502)
      if (workingModel[provider] === model) delete workingModel[provider]
      if (!MODEL_RETRY_CODES.has(lastError.code)) throw lastError
    }
  }
  throw lastError
}

export async function testProviderConnection(provider: Provider, apiKey: string): Promise<void> {
  await generateProviderText(provider, apiKey, 'Reply with exactly: SafeAI connection test passed.')
}
