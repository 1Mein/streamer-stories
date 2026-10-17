import { getQuery } from 'h3'
import { streamers } from '~/data/streamers'
import { searchStreamers } from '~/utils/catalog'
export default defineEventHandler((event) => {
  const query = getQuery(event).q
  if (query !== undefined && typeof query !== 'string') throw createError({ statusCode: 400, statusMessage: 'Ожидается одна поисковая строка' })
  return { data: searchStreamers(streamers, query || '') }
})
