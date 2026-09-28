import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchRemoteCatalog } from '../src/lib/catalog'

describe('fetchRemoteCatalog', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns null when no URL is given (local data is used instead)', async () => {
    expect(await fetchRemoteCatalog(undefined)).toBeNull()
    expect(await fetchRemoteCatalog('')).toBeNull()
  })

  it('returns the parsed catalog when the response is valid', async () => {
    const payload = { projects: [], certifications: [] }
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve(payload) }),
    )
    expect(await fetchRemoteCatalog('https://example.test/catalog.json')).toEqual(payload)
  })

  it('falls back to null on a non-2xx response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }))
    expect(await fetchRemoteCatalog('https://example.test/catalog.json')).toBeNull()
  })

  it('falls back to null when the shape does not match the schema', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ foo: 'bar' }) }),
    )
    expect(await fetchRemoteCatalog('https://example.test/catalog.json')).toBeNull()
  })

  it('falls back to null when the network call throws', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')))
    expect(await fetchRemoteCatalog('https://example.test/catalog.json')).toBeNull()
  })
})
