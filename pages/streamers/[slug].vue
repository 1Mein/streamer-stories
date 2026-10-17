<script setup lang="ts">
import { getStreamer, streamers } from '~/data/streamers'
import { splitContacts } from '~/utils/catalog'
const route = useRoute()
const streamer = computed(() => getStreamer(String(route.params.slug)))
if (!streamer.value) throw createError({ statusCode: 404, statusMessage: 'Стример не найден' })
watch(streamer, (value) => {
  if (!value) showError({ statusCode: 404, statusMessage: 'Стример не найден' })
})
const profileNumber = computed(() => String(streamers.findIndex((item) => item.slug === streamer.value?.slug) + 1).padStart(2, '0'))
const contactGroups = computed(() => splitContacts(streamer.value?.biography.contacts))
useSeoMeta({ title: () => `${streamer.value?.name} — Streamer Stories`, description: () => streamer.value?.bio, ogTitle: () => streamer.value?.name, ogDescription: () => streamer.value?.bio })
</script>
<template>
  <div v-if="streamer" class="profile-page min-h-screen" :style="{ '--accent': streamer.theme.colors.accent, '--muted': streamer.theme.colors.muted, '--surface': streamer.theme.colors.surface, '--background': streamer.theme.colors.background, background: `radial-gradient(circle at 85% 8%, ${streamer.theme.colors.surface} 0, transparent 28rem), radial-gradient(circle at 8% 45%, ${streamer.theme.colors.surface} 0, transparent 24rem), ${streamer.theme.colors.background}`, color: streamer.theme.colors.text }">
    <AppHeader :has-media="streamer.media.length > 0" />
    <main class="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <section class="profile-hero">
        <div class="profile-intro rise">
          <NuxtLink to="/#catalog" class="archive-back">← Все истории</NuxtLink>
          <p class="eyebrow mt-8">Профиль {{ profileNumber }} / публичный архив</p>
          <h1 class="display mt-5 text-4xl leading-tight sm:text-6xl">{{ streamer.name }}</h1>
          <p class="mt-4 text-xl" :style="{ color: streamer.theme.colors.secondary }">{{ streamer.alias }}</p>
          <p class="profile-summary">{{ streamer.bio }}</p>
          <div class="mt-7 flex flex-wrap gap-2">
            <span v-for="genre in streamer.genres" :key="genre" class="genre-tag">{{ genre }}</span>
          </div>
          <p class="mono mt-8 text-xs muted">
            Обновлено
            <time :datetime="streamer.updatedAt">{{ streamer.updatedAt }}</time>
          </p>
        </div>
        <figure v-if="streamer.portrait" class="profile-figure">
          <div class="portrait-stage">
            <span class="portrait-number" aria-hidden="true">{{ profileNumber }}</span>
            <img :src="streamer.portrait.src" :alt="streamer.portrait.alt" :width="streamer.portrait.width" :height="streamer.portrait.height" fetchpriority="high" loading="eager" class="profile-portrait">
          </div>
          <figcaption class="portrait-credit">
            <a :href="streamer.portrait.sourceUrl" target="_blank" rel="noreferrer">{{ streamer.portrait.credit }} ↗</a>
            <span>Фон удалён</span>
          </figcaption>
        </figure>
      </section>
      <section id="biography" class="scroll-mt-8 border-t border-[#3b3b35] py-20">
        <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">о человеке</p>
        <h2 class="display text-3xl">Биография</h2>
        <div class="mt-8 grid gap-10 lg:grid-cols-1">
          <div class="space-y-4 text-sm leading-7">
            <p v-for="fact in streamer.biography.confirmed" :key="fact" class="border-l-2 pl-4" :style="{ borderColor: streamer.theme.colors.accent }">{{ fact }}</p>
          </div>
          <div v-if="streamer.biography.unknown?.length" class="border border-[#3b3b35] p-6">
            <h3 class="display text-xl">Оговорки и сведения, требующие проверки</h3>
            <ul class="mt-5 space-y-4 text-sm leading-7">
              <li v-for="note in streamer.biography.unknown" :key="note">{{ note }}</li>
            </ul>
          </div>
        </div>
      </section>
      <section id="timeline" class="grid scroll-mt-8 gap-16 py-20 lg:grid-cols-[1.4fr_.6fr]">
        <div>
          <p class="mono mb-10 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">хронология</p>
          <h2 class="display mb-10 text-3xl">Хронология</h2>
          <Timeline :events="streamer.events" :sources="streamer.sources" />
        </div>
        <aside>
          <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">публичные аккаунты</p>
          <div class="space-y-3">
            <a v-for="account in streamer.accounts" :key="account.platform" :href="account.url" target="_blank" rel="noreferrer" class="flex items-center justify-between border-b border-[#3b3b35] py-3 text-sm transition hover:text-[var(--accent)]">
              <span>
                {{ account.platform }}
                <small class="ml-2 opacity-60">{{ account.handle }}</small>
                <small class="mt-1 block opacity-70">{{ account.verified ? 'Подтверждён в архиве' : 'Требует проверки' }}</small>
              </span>
              <span>↗</span>
            </a>
          </div>
          <p class="mono mt-12 mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">источники</p>
          <div class="space-y-4 text-xs leading-5" :style="{ color: streamer.theme.colors.muted }">
            <a v-for="source in streamer.sources" :key="source.id" :href="source.url" target="_blank" rel="noreferrer" class="block hover:underline">
              {{ source.title }}
              <span class="block text-[10px] uppercase">{{ source.status === 'verified' ? 'Проверен в архиве' : 'Ограниченная проверка' }} · {{ source.checkedAt }}</span>
            </a>
          </div>
        </aside>
      </section>
      <section v-if="streamer.media.length" id="media" class="border-t border-[#3b3b35] py-20">
        <p class="mono mb-3 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">медиаархив</p>
        <h2 class="display mb-8 text-3xl">Кадры из публичного архива</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" :class="{ 'media-single': streamer.media.length === 1 }">
          <a v-for="item in streamer.media" :key="item.id" :href="item.url" target="_blank" rel="noreferrer" class="group overflow-hidden border border-[#3b3b35] bg-[#1b1b18]">
            <ArchiveImage :src="item.imageUrl" :alt="item.title" :square="item.kind === 'avatar'" />
            <div class="p-3">
              <p class="text-xs">{{ item.title }}</p>
              <p class="mono mt-2 text-[9px] uppercase tracking-[.15em]" :style="{ color: streamer.theme.colors.muted }">{{ streamer.sources.find((source) => source.id === item.sourceId)?.platform || 'Источник' }} ↗</p>
            </div>
          </a>
        </div>
        <p class="mt-5 text-xs leading-6" :style="{ color: streamer.theme.colors.muted }">Ссылки под изображениями ведут к исходным публикациям.</p>
      </section>
      <section v-if="streamer.biography.details?.length" class="border-t border-[#3b3b35] py-20">
        <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">личная справка</p>
        <h2 class="display text-3xl">Личная справка</h2>
        <div class="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          <div v-for="item in streamer.biography.details" :key="item.label" class="border-b border-[#3b3b35] pb-4">
            <p class="mono text-[10px] uppercase tracking-[.14em]" :style="{ color: streamer.theme.colors.muted }">{{ item.label }}</p>
            <p class="mt-2 text-sm leading-6">{{ item.value }}</p>
          </div>
        </div>
      </section>
      <section v-if="streamer.biography.music?.length" class="border-t border-[#3b3b35] py-20">
        <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">дискография</p>
        <h2 class="display text-3xl">Музыка</h2>
        <div class="mt-8 grid gap-3 md:grid-cols-2">
          <div v-for="track in streamer.biography.music" :key="track.title" class="border p-5" :style="{ borderColor: streamer.theme.colors.secondary, background: streamer.theme.colors.surface }">
            <p class="mono text-[10px]" :style="{ color: streamer.theme.colors.accent }">{{ track.date }}</p>
            <h3 class="mt-3 text-xl">{{ track.title }}</h3>
            <p class="mt-2 text-sm" :style="{ color: streamer.theme.colors.muted }">{{ track.detail }}</p>
          </div>
        </div>
      </section>
      <section v-if="streamer.biography.collaborations?.length" class="border-t border-[#3b3b35] py-20">
        <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">совместные проекты</p>
        <h2 class="display text-3xl">Коллаборации</h2>
        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <div v-for="collab in streamer.biography.collaborations" :key="collab.name" class="border-l-2 pl-5" :style="{ borderColor: streamer.theme.colors.accent }">
            <h3 class="text-lg">{{ collab.name }}</h3>
            <p class="mono mt-1 text-[10px] uppercase" :style="{ color: streamer.theme.colors.secondary }">{{ collab.role }}</p>
            <p class="mt-3 text-sm leading-6" :style="{ color: streamer.theme.colors.muted }">{{ collab.detail }}</p>
          </div>
        </div>
      </section>
      <section v-if="streamer.biography.setup?.length || contactGroups.contacts.length" class="grid gap-12 border-t border-[#3b3b35] py-20 lg:grid-cols-2">
        <div v-if="streamer.biography.setup?.length">
          <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">оборудование</p>
          <h2 class="display text-3xl">Компьютерный сетап</h2>
          <div class="mt-8 space-y-4">
            <div v-for="item in streamer.biography.setup" :key="item.label" class="flex justify-between gap-5 border-b border-[#3b3b35] pb-3 text-sm">
              <span :style="{ color: streamer.theme.colors.muted }">{{ item.label }}</span>
              <span class="text-right">{{ item.value }}</span>
            </div>
          </div>
        </div>
        <div v-if="contactGroups.contacts.length">
          <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">связь</p>
          <h2 class="display text-3xl">Публичные контакты</h2>
          <div class="mt-8 space-y-4">
            <div v-for="item in contactGroups.contacts" :key="item.label" class="border-b border-[#3b3b35] pb-3">
              <p class="mono text-[10px] uppercase" :style="{ color: streamer.theme.colors.muted }">{{ item.label }}</p>
              <p class="mt-2 text-sm">{{ item.value }}</p>
            </div>
          </div>
        </div>
      </section>
      <section v-if="contactGroups.audience.length" class="border-t border-[#3b3b35] py-12">
        <h2 class="display text-3xl">Аудитория в материалах архива</h2>
        <p class="mt-3 text-sm opacity-70">Исторические оценки из справки; это не текущие показатели площадок.</p>
        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <div v-for="item in contactGroups.audience" :key="item.label">
            <p class="text-xs opacity-70">{{ item.label }}</p>
            <p class="mt-2">{{ item.value }}</p>
          </div>
        </div>
      </section>
      <section v-if="streamer.biography.interests?.length" class="border-t border-[#3b3b35] py-20">
        <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">за пределами трансляций</p>
        <h2 class="display text-3xl">Проекты и интересы</h2>
        <div class="mt-8 grid gap-4 md:grid-cols-3">
          <p v-for="interest in streamer.biography.interests" :key="interest" class="border border-[#3b3b35] p-5 text-sm leading-7" :style="{ background: streamer.theme.colors.surface }">{{ interest }}</p>
        </div>
      </section>
    </main>
    <ClientOnly v-if="streamer.slug === 'serega-pirat'">
      <div class="pointer-events-none fixed bottom-3 right-3 z-30 sm:bottom-5 sm:right-5">
        <div class="pointer-events-auto">
          <CharacterViewer />
        </div>
      </div>
    </ClientOnly>
    <ClientOnly v-if="streamer.slug === 'derzko' || streamer.slug === '5opka'">
      <div class="pointer-events-none fixed bottom-3 right-3 z-30 sm:bottom-5 sm:right-5">
        <div class="pointer-events-auto">
          <CharacterViewer :model-path="`/models/${streamer.slug}.glb`" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
