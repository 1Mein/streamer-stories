import { streamers } from '~/data/streamers'
export default defineEventHandler(() => ({ data: streamers.map(({ events, sources, ...streamer }) => streamer), meta: { total: streamers.length } }))
