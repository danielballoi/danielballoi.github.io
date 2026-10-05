import { describe, expect, it } from 'vitest'
import { DEFAULT_MEDIA_BASE_URL, mediaUrl } from '../src/lib/media'

describe('mediaUrl', () => {
  it('uses CloudFront as the default base', () => {
    expect(mediaUrl('/video/balloi-ep1.mp4')).toBe(`${DEFAULT_MEDIA_BASE_URL}/video/balloi-ep1.mp4`)
  })

  it('joins base and path with exactly one slash', () => {
    expect(mediaUrl('video/a.mp4', 'https://cdn.example.com/')).toBe('https://cdn.example.com/video/a.mp4')
    expect(mediaUrl('/video/a.mp4', 'https://cdn.example.com')).toBe('https://cdn.example.com/video/a.mp4')
  })

  it('leaves absolute URLs and empty values untouched', () => {
    expect(mediaUrl('https://altro.example.com/x.jpg')).toBe('https://altro.example.com/x.jpg')
    expect(mediaUrl(undefined)).toBeUndefined()
  })
})
