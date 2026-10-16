import { describe, expect, it } from 'vitest'
import { getStreamer } from '../data/streamers'
describe('streamer seed', () => {
  it('contains a source for every timeline event', () => {
    const streamer = getStreamer('serega-pirat')
    expect(streamer).toBeDefined()
    streamer?.events.forEach((event) => expect(event.sources.length).toBeGreaterThan(0))
  })
  it('does not expose unverified accounts as verified', () => {
    const streamer = getStreamer('serega-pirat')
    expect(streamer?.accounts.filter((account) => account.verified).length).toBe(3)
  })
})
