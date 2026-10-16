import { getStreamer } from '~/data/streamers'
export default defineEventHandler((event) => {
  const streamer = getStreamer(getRouterParam(event, 'slug') || '')
  if (!streamer) throw createError({ statusCode: 404, statusMessage: 'Стример не найден' })
  return { data: streamer }
})
