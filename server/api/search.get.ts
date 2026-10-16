import { getQuery } from 'h3'
import { streamers } from '~/data/streamers'
export default defineEventHandler((event) => {
  const query = String(getQuery(event).q || '').trim().toLowerCase()
  if (!query) return { data: [] }
  return { data: streamers.filter((s) => `${s.name} ${s.alias} ${s.genres.join(' ')}`.toLowerCase().includes(query)) }
})
