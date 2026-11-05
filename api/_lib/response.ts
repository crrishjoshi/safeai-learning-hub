export type JsonResponse = {
  status: (code: number) => JsonResponse
  json: (body: unknown) => void
  setHeader?: (name: string, value: string) => unknown
}

// API responses can carry family data or key metadata, so they are never cached.
export const json = (response: JsonResponse, status: number, body: unknown) => {
  response.setHeader?.('Cache-Control', 'no-store')
  return response.status(status).json(body)
}
