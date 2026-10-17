<script setup lang="ts">
import { streamers } from '~/data/streamers'
import { searchStreamers, voteResults } from '~/utils/catalog'
const search = ref('')
const filtered = computed(() => searchStreamers(streamers, search.value))
const selectedCandidate = ref('')
const candidates = [
  { name: 'Mellstroy', genre: 'IRL · шоу', votes: 42 },
  { name: 'Бустер', genre: 'стримы · развлечения', votes: 35 },
  { name: 'Evelone', genre: 'стримы · общение', votes: 28 },
  { name: 'Bratishkinoff', genre: 'стримы · юмор', votes: 24 },
  { name: 'AlenaRossa', genre: 'стримы · lifestyle', votes: 19 },
  { name: 'Shadowraze', genre: 'музыка · gaming', votes: 16 }
]
const results = computed(() => voteResults(candidates, selectedCandidate.value))
const castVote = (name: string) => {
  selectedCandidate.value = name
}
useSeoMeta({ title: 'Streamer Stories — архив историй стримеров', description: 'Проверяемая хронология публичной деятельности стримеров.' })
</script>
<template>
  <div class="grain pastel-home min-h-screen">
    <AppHeader />
    <main class="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <section class="home-hero">
        <div class="rise">
          <p class="eyebrow mb-7">Открытый исследовательский архив / 2026</p>
          <h1 class="display text-5xl leading-[1.1] sm:text-7xl">Люди.<br><span class="text-[var(--accent)]">Эпохи.</span><br>Контекст.</h1>
          <p class="mt-7 max-w-lg text-base leading-7 muted">Истории стримеров — от первых трансляций до больших проектов. Хронологии, публичные источники и факты с оговорками о том, что ещё требует проверки.</p>
          <a href="#catalog" class="archive-cta">Исследовать архив <span aria-hidden="true">↓</span></a>
        </div>
        <div class="home-portraits" aria-label="Истории в архиве">
          <NuxtLink v-for="(streamer, index) in streamers" :key="streamer.slug" :to="`/streamers/${streamer.slug}`" class="home-portrait-link" :style="{ '--portrait-accent': streamer.theme.colors.accent }">
            <span class="mono home-portrait-index">{{ String(index + 1).padStart(2, '0') }} / история</span>
            <img v-if="streamer.portrait" :src="streamer.portrait.src" :alt="streamer.portrait.alt" :width="streamer.portrait.width" :height="streamer.portrait.height" :fetchpriority="index === 0 ? 'high' : 'auto'" loading="eager">
            <span class="home-portrait-name">{{ streamer.name }} <span aria-hidden="true">↗</span></span>
          </NuxtLink>
          <p class="mono home-portraits-caption">{{ streamers.length }} истории · за каждым ником — человек</p>
        </div>
      </section>
      <section id="catalog" class="scroll-mt-8 border-t border-[#40384d] pt-16"><div class="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p class="mono text-[10px] uppercase tracking-[.2em] text-[#a99bb5]">01 / каталог</p><h2 class="display mt-3 text-3xl">Выберите историю</h2></div><label class="flex items-center gap-3 border-b border-[#554966] pb-2"><span class="text-[#a99bb5]">⌕</span><input v-model="search" type="search" aria-label="Поиск по имени, псевдониму или жанру" placeholder="Поиск по имени..." class="w-48 bg-transparent text-sm outline-none placeholder:text-[#a99bb5]"></label></div><div v-if="filtered.length" class="grid gap-5 md:grid-cols-2"><StreamerCard v-for="streamer in filtered" :key="streamer.slug" :streamer="streamer" /></div><p v-else class="border border-dashed border-[#554966] p-10 text-sm text-[#a99bb5]">Ничего не найдено. Попробуйте имя или псевдоним.</p></section>
      <section id="vote" class="mt-24 scroll-mt-8 border-t border-[#40384d] pt-16">
        <div class="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p class="mono text-[10px] uppercase tracking-[.2em] text-[#a99bb5]">02 / следующая история</p><h2 class="display mt-3 text-3xl">Кого добавить следующим?</h2></div><span class="mono text-[10px] uppercase tracking-[.14em] text-[#b9abc5]">демоверсия · без сохранения</span></div>
        <p class="max-w-2xl text-sm leading-7 text-[#a99bb5]">Выберите популярного автора СНГ, чью публичную историю стоит исследовать следующей. Результаты демонстрационные и не отправляются на сервер.</p>
        <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button v-for="candidate in results" :aria-pressed="selectedCandidate === candidate.name" :key="candidate.name" type="button" class="border p-5 text-left transition hover:-translate-y-1 hover:border-[#b9a7df]" :class="selectedCandidate === candidate.name ? 'border-[#b9a7df] bg-[#2d2540]' : 'border-[#40384d] bg-[#211b2d]'" @click="castVote(candidate.name)"><div class="flex items-start justify-between"><span class="display text-xl">{{ candidate.name }}</span><span class="mono text-xs text-[#b9a7df]">{{ candidate.percent }}%</span></div><p class="mt-3 text-xs text-[#a99bb5]">{{ candidate.genre }} · {{ candidate.votes }} демо-голосов</p><div class="mt-5 h-1 bg-[#40384d]"><div class="h-1 bg-[#9d83d6]" :style="{ width: `${candidate.percent}%` }" /></div></button>
        </div>
        <p aria-live="polite" v-if="selectedCandidate" class="mt-5 text-sm text-[#a99bb5]">Ваш демонстрационный выбор: <strong class="text-[#c7b6ed]">{{ selectedCandidate }}</strong></p>
      </section>
    </main>
  </div>
</template>
