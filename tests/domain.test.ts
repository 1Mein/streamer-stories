import { describe, expect, it } from 'vitest'
import { getStreamer, streamers } from '../data/streamers'
import { normalizeSearch, searchStreamers, splitContacts, voteResults } from '../utils/catalog'

describe('archive integrity', () => {
  it('resolves every event and media source in every profile', () => {
    expect(new Set(streamers.map((item) => item.slug)).size).toBe(streamers.length)
    for (const streamer of streamers) {
      const ids = new Set(streamer.sources.map((source) => source.id))
      expect(ids.size).toBe(streamer.sources.length)
      for (const event of streamer.events) {
        expect(event.sources.length).toBeGreaterThan(0)
        for (const id of event.sources) expect(ids.has(id), `${streamer.slug}/${event.id}: ${id}`).toBe(true)
      }
      for (const item of streamer.media) expect(ids.has(item.sourceId)).toBe(true)
      for (const item of [...streamer.sources, ...streamer.accounts, ...streamer.media]) expect(new URL(item.url).protocol).toBe('https:')
      expect(Array.isArray(streamer.biography.unknown)).toBe(true)
    }
  })
  it('keeps lookup exact and returns missing profiles safely', () => {
    expect(getStreamer('serega-pirat')?.name).toBe('Серёга Пират')
    expect(getStreamer('missing')).toBeUndefined()
  })
  it('preserves unverified account labels', () => {
    expect(getStreamer('serega-pirat')?.accounts.filter((item) => item.verified)).toHaveLength(3)
  })
})

describe('shared catalogue search', () => {
  it('normalizes whitespace, case and Russian ё consistently', () => {
    expect(normalizeSearch('  СЕРЁГА   ПИРАТ  ')).toBe('серега пират')
    expect(searchStreamers(streamers, '  СЕРЕГА   ПИРАТ ')).toEqual([getStreamer('serega-pirat')])
    expect(searchStreamers(streamers, 'Киселев')).toEqual([getStreamer('derzko')])
    expect(searchStreamers(streamers, 'косплей')).toEqual([getStreamer('derzko')])
  })
  it('returns all for empty input and none for an unknown query', () => {
    expect(searchStreamers(streamers, '  ')).toEqual(streamers)
    expect(searchStreamers(streamers, 'nonexistent')).toEqual([])
  })
})

describe('demo vote', () => {
  const candidates = [{ name: 'A', votes: 42 }, { name: 'B', votes: 35 }, { name: 'C', votes: 28 }]
  it('normalizes percentages and adds just one reversible local choice', () => {
    const selected = voteResults(candidates, 'A')
    expect(selected.reduce((sum, item) => sum + item.percent, 0)).toBe(100)
    expect(selected[0].votes).toBe(43)
    expect(voteResults(candidates, 'B').map((item) => item.votes)).toEqual([42, 36, 28])
    expect(voteResults(candidates, 'A')).toEqual(selected)
    expect(candidates[0].votes).toBe(42)
  })
  it('handles ties and an empty result', () => {
    expect(voteResults([{ name: 'A', votes: 1 }, { name: 'B', votes: 1 }, { name: 'C', votes: 1 }], '').map((item) => item.percent)).toEqual([34, 33, 33])
    expect(voteResults([], '')).toEqual([])
  })
})

describe('contact presentation', () => {
  it('separates historical audience estimates from ways to contact the author', () => {
    const groups = splitContacts(getStreamer('derzko')?.biography.contacts)
    expect(groups.contacts).toHaveLength(2)
    expect(groups.audience).toHaveLength(4)
    expect(groups.contacts.every((item) => item.value.includes('@'))).toBe(true)
    expect(splitContacts()).toEqual({ contacts: [], audience: [] })
  })
})
