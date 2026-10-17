import type { BiographyItem, Streamer } from '../types/domain'

export const normalizeSearch = (value: string) => value.trim().toLocaleLowerCase('ru').replace(/ё/g, 'е').replace(/\s+/g, ' ')

export function searchStreamers(streamers: Streamer[], query: string) {
  const normalized = normalizeSearch(query)
  return streamers.filter((streamer) => normalizeSearch(`${streamer.name} ${streamer.alias} ${streamer.genres.join(' ')}`).includes(normalized))
}

export function splitContacts(items: BiographyItem[] = []) {
  return {
    contacts: items.filter((item) => !/подписчик|участник/i.test(item.value)),
    audience: items.filter((item) => /подписчик|участник/i.test(item.value))
  }
}

// Largest remainders keep the displayed whole-number percentages at exactly 100.
export function voteResults<T extends { name: string; votes: number }>(candidates: T[], selected: string) {
  const counts = candidates.map((candidate) => candidate.votes + Number(candidate.name === selected))
  const total = counts.reduce((sum, count) => sum + count, 0)
  const exact = counts.map((count) => total ? count / total * 100 : 0)
  const percentages = exact.map(Math.floor)
  const order = exact.map((value, index) => ({ index, remainder: value - percentages[index] })).sort((a, b) => b.remainder - a.remainder)
  const remaining = total ? 100 - percentages.reduce((sum, value) => sum + value, 0) : 0
  for (let i = 0; i < remaining; i++) percentages[order[i].index]++
  return candidates.map((candidate, index) => ({ ...candidate, votes: counts[index], percent: percentages[index] }))
}
