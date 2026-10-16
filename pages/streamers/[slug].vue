<script setup lang="ts">
import { getStreamer } from '~/data/streamers'
const route = useRoute()
const streamer = getStreamer(String(route.params.slug))
if (!streamer) throw createError({ statusCode: 404, statusMessage: 'Стример не найден' })
useSeoMeta({ title: `${streamer.name} — Streamer Stories`, description: streamer.bio, ogTitle: streamer.name, ogDescription: streamer.bio })
</script>
<template>
  <div v-if="streamer" class="min-h-screen" :style="{ background: `radial-gradient(circle at 85% 8%, ${streamer.theme.colors.surface} 0, transparent 28rem), radial-gradient(circle at 8% 45%, ${streamer.theme.colors.surface} 0, transparent 24rem), ${streamer.theme.colors.background}`, color: streamer.theme.colors.text }">
    <AppHeader />
    <main class="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <section class="grid gap-12 border-b border-[#3b3b35] py-16 lg:grid-cols-[1.1fr_.9fr] lg:py-24"><div><p class="mono text-xs uppercase tracking-[.24em]" :style="{ color: streamer.theme.colors.accent }">profile / open dossier</p><h1 class="display mt-6 text-5xl leading-tight sm:text-7xl">{{ streamer.name }}</h1><p class="mt-5 text-xl" :style="{ color: streamer.theme.colors.secondary }">{{ streamer.alias }}</p><p class="mt-8 max-w-xl leading-7" :style="{ color: streamer.theme.colors.muted }">{{ streamer.bio }}</p></div><div class="border p-6" :style="{ borderColor: streamer.theme.colors.accent, background: streamer.theme.colors.surface }"><p class="mono text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.muted }">архивная карточка</p><div class="mt-10 flex items-end justify-between"><span class="display text-8xl" :style="{ color: streamer.theme.colors.accent }">01</span><span class="mono text-right text-[10px]" :style="{ color: streamer.theme.colors.muted }">LAST CHECKED<br>{{ streamer.updatedAt }}</span></div><div class="mt-8 flex flex-wrap gap-2"><span v-for="genre in streamer.genres" :key="genre" class="border px-2 py-1 text-[10px] uppercase" :style="{ borderColor: streamer.theme.colors.muted }">{{ genre }}</span></div></div></section>
      <section id="timeline" class="grid scroll-mt-8 gap-16 py-20 lg:grid-cols-[1.4fr_.6fr]"><div><p class="mono mb-10 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">03 / timeline</p><Timeline :events="streamer.events" /></div><aside><p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">public accounts</p><div class="space-y-3"><a v-for="account in streamer.accounts" :key="account.platform" :href="account.url" target="_blank" rel="noreferrer" class="flex items-center justify-between border-b border-[#3b3b35] py-3 text-sm transition hover:text-[#d7ff42]"><span>{{ account.platform }} <small class="ml-2 opacity-60">{{ account.handle }}</small></span><span>↗</span></a></div><p class="mono mt-12 mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">sources</p><div class="space-y-4 text-xs leading-5" :style="{ color: streamer.theme.colors.muted }"><a v-for="source in streamer.sources" :key="source.id" :href="source.url" target="_blank" rel="noreferrer" class="block hover:underline">{{ source.title }} <span class="block text-[10px] uppercase">{{ source.status }} · {{ source.checkedAt }}</span></a></div></aside></section>
      <section id="media" class="border-t border-[#3b3b35] py-20">
        <p class="mono mb-3 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">04 / media trace</p>
        <h2 class="display mb-8 text-3xl">Кадры из публичного архива</h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a v-for="item in streamer.media" :key="item.id" :href="item.url" target="_blank" rel="noreferrer" class="group overflow-hidden border border-[#3b3b35] bg-[#1b1b18]">
            <img :src="item.imageUrl" :alt="item.title" loading="lazy" class="aspect-video w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0" :class="{ 'aspect-square': item.kind === 'avatar' }">
            <div class="p-3"><p class="text-xs">{{ item.title }}</p><p class="mono mt-2 text-[9px] uppercase tracking-[.15em]" :style="{ color: streamer.theme.colors.muted }">YouTube ↗</p></div>
          </a>
        </div>
        <p class="mt-5 text-xs leading-6" :style="{ color: streamer.theme.colors.muted }">Изображения загружаются с официальных доменов YouTube и ведут на исходные страницы. Это не копия медиаматериалов в базе проекта.</p>
      </section>

      <section v-if="streamer.biography.details?.length" class="border-t border-[#3b3b35] py-20">
        <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">06 / dossier</p>
        <h2 class="display text-3xl">Личная справка</h2>
        <div class="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          <div v-for="item in streamer.biography.details" :key="item.label" class="border-b border-[#3b3b35] pb-4"><p class="mono text-[10px] uppercase tracking-[.14em]" :style="{ color: streamer.theme.colors.muted }">{{ item.label }}</p><p class="mt-2 text-sm leading-6">{{ item.value }}</p></div>
        </div>
      </section>
      <section v-if="streamer.biography.music?.length" class="border-t border-[#3b3b35] py-20">
        <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">07 / discography</p>
        <h2 class="display text-3xl">Музыка</h2>
        <div class="mt-8 grid gap-3 md:grid-cols-2">
          <div v-for="track in streamer.biography.music" :key="track.title" class="border p-5" :style="{ borderColor: streamer.theme.colors.secondary, background: streamer.theme.colors.surface }"><p class="mono text-[10px]" :style="{ color: streamer.theme.colors.accent }">{{ track.date }}</p><h3 class="mt-3 text-xl">{{ track.title }}</h3><p class="mt-2 text-sm" :style="{ color: streamer.theme.colors.muted }">{{ track.detail }}</p></div>
        </div>
      </section>
      <section v-if="streamer.biography.collaborations?.length" class="border-t border-[#3b3b35] py-20">
        <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">08 / network</p>
        <h2 class="display text-3xl">Коллаборации</h2>
        <div class="mt-8 grid gap-4 md:grid-cols-2">
          <div v-for="collab in streamer.biography.collaborations" :key="collab.name" class="border-l-2 pl-5" :style="{ borderColor: streamer.theme.colors.accent }"><h3 class="text-lg">{{ collab.name }}</h3><p class="mono mt-1 text-[10px] uppercase" :style="{ color: streamer.theme.colors.secondary }">{{ collab.role }}</p><p class="mt-3 text-sm leading-6" :style="{ color: streamer.theme.colors.muted }">{{ collab.detail }}</p></div>
        </div>
      </section>
      <section v-if="streamer.biography.setup?.length || streamer.biography.contacts?.length" class="grid gap-12 border-t border-[#3b3b35] py-20 lg:grid-cols-2">
        <div v-if="streamer.biography.setup?.length"><p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">09 / setup</p><h2 class="display text-3xl">Компьютерный сетап</h2><div class="mt-8 space-y-4"><div v-for="item in streamer.biography.setup" :key="item.label" class="flex justify-between gap-5 border-b border-[#3b3b35] pb-3 text-sm"><span :style="{ color: streamer.theme.colors.muted }">{{ item.label }}</span><span class="text-right">{{ item.value }}</span></div></div></div>
        <div v-if="streamer.biography.contacts?.length"><p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">10 / contact</p><h2 class="display text-3xl">Публичные контакты</h2><div class="mt-8 space-y-4"><div v-for="item in streamer.biography.contacts" :key="item.label" class="border-b border-[#3b3b35] pb-3"><p class="mono text-[10px] uppercase" :style="{ color: streamer.theme.colors.muted }">{{ item.label }}</p><p class="mt-2 text-sm">{{ item.value }}</p></div></div></div>
      </section>
      <section v-if="streamer.biography.interests?.length" class="border-t border-[#3b3b35] py-20"><p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">11 / interests</p><h2 class="display text-3xl">Проекты и интересы</h2><div class="mt-8 grid gap-4 md:grid-cols-3"><p v-for="interest in streamer.biography.interests" :key="interest" class="border border-[#3b3b35] p-5 text-sm leading-7" :style="{ background: streamer.theme.colors.surface }">{{ interest }}</p></div></section>
      <section id="biography" class="scroll-mt-8 border-t border-[#3b3b35] py-20">
        <p class="mono mb-5 text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.accent }">05 / biography</p>
        <h2 class="display text-3xl">Биография</h2>
        <div class="mt-8 grid gap-10 lg:grid-cols-1">
          <div class="space-y-4 text-sm leading-7">
            <p v-for="fact in streamer.biography.confirmed" :key="fact" class="border-l-2 pl-4" :style="{ borderColor: streamer.theme.colors.accent }">{{ fact }}</p>
          </div>    
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
    <ClientOnly v-if="streamer.slug === 'derzko'">
      <div class="pointer-events-none fixed bottom-3 right-3 z-30 sm:bottom-5 sm:right-5">
        <div class="pointer-events-auto">
          <CharacterViewer model-path="/models/derzko.glb" />
        </div>
      </div>
    </ClientOnly>
  </div>
</template>
