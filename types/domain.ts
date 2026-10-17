export type EventCategory = 'origin' | 'milestone' | 'content' | 'collab' | 'platform'
export type Theme = {
  colors: { background: string; surface: string; text: string; muted: string; accent: string; secondary: string }
  radius: string
}
export type Source = { id: string; title: string; url: string; platform: string; checkedAt: string; status: 'verified' | 'limited' }
export type HistoricalEvent = {
  id: string; date: string; year: string; title: string; description: string
  category: EventCategory; verified: boolean; sources: string[]
}
export type PlatformAccount = { platform: string; handle: string; url: string; verified: boolean }
export type MediaItem = { id: string; title: string; imageUrl: string; url: string; sourceId: string; kind: 'avatar' | 'video' | 'photo' }
export type BiographyItem = { label: string; value: string }
export type MusicItem = { date: string; title: string; detail: string }
export type Collaboration = { name: string; role: string; detail: string }
export type SetupItem = { label: string; value: string }
export type Streamer = {
  slug: string; name: string; alias: string; eyebrow: string; bio: string
  portrait?: { src: string; alt: string; sourceUrl: string; credit: string; width: number; height: number }
  theme: Theme; accounts: PlatformAccount[]; events: HistoricalEvent[]; sources: Source[]
  genres: string[]; updatedAt: string; media: MediaItem[]
  biography: { confirmed: string[]; unknown: string[]; details?: BiographyItem[]; music?: MusicItem[]; collaborations?: Collaboration[]; setup?: SetupItem[]; contacts?: BiographyItem[]; interests?: string[] }
}
