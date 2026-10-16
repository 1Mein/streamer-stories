<script setup lang="ts">
import { streamers } from '~/data/streamers'
const search = ref('')
const filtered = computed(() => streamers.filter((s) => `${s.name} ${s.alias} ${s.genres.join(' ')}`.toLowerCase().includes(search.value.toLowerCase())))
const selectedCandidate = ref('')
const candidates = [
  { name: 'Mellstroy', genre: 'IRL · шоу', votes: 42 },
  { name: 'Бустер', genre: 'стримы · развлечения', votes: 35 },
  { name: 'Evelone', genre: 'стримы · общение', votes: 28 },
  { name: 'Bratishkinoff', genre: 'стримы · юмор', votes: 24 },
  { name: 'AlenaRossa', genre: 'стримы · lifestyle', votes: 19 },
  { name: 'Shadowraze', genre: 'музыка · gaming', votes: 16 }
]
const castVote = (name: string) => {
  selectedCandidate.value = name
}
useSeoMeta({ title: 'Streamer Stories — архив историй стримеров', description: 'Проверяемая хронология публичной деятельности стримеров.' })
</script>
<template>
  <div class="grain pastel-home min-h-screen">
    <AppHeader />
    <main class="mx-auto max-w-7xl px-5 pb-24 lg:px-8">
      <section class="grid min-h-[620px] items-center gap-10 py-20 lg:grid-cols-[1.25fr_.75fr]">
        <div class="rise"><p class="mono mb-7 text-xs uppercase tracking-[.25em] text-[#8b5cf6]">открытый исследовательский архив / 2026</p><h1 class="display max-w-4xl text-5xl leading-[1.05] sm:text-7xl">Люди.<br><span class="text-[#8b5cf6]">Эпохи.</span><br>Контекст.</h1><p class="mt-8 max-w-lg text-base leading-7 text-[#6d6175]">Не каталог ссылок. Хронологии авторов, собранные из публичных источников и отделённые от слухов.</p><a href="#catalog" class="mt-10 inline-flex border border-[#8b5cf6] px-5 py-3 text-xs uppercase tracking-[.16em] text-[#7c3aed] transition hover:bg-[#8b5cf6] hover:text-white">Исследовать архив ↓</a></div>
        <div class="relative hidden aspect-square border border-[#594b68] bg-[#241d2d] p-8 lg:block"><div class="absolute inset-8 border border-[#453851]" /><div class="absolute right-10 top-10 h-20 w-20 bg-[#8e5960]" /><div class="absolute bottom-12 left-12 h-40 w-40 rounded-full border-[24px] border-[#80649e]" /><span class="mono absolute bottom-8 right-8 text-[10px] text-[#b9a7c5]">SIGNAL / NOISE<br>PUBLIC / TRACEABLE</span></div>
      </section>
      <section id="catalog" class="scroll-mt-8 border-t border-[#40384d] pt-16"><div class="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p class="mono text-[10px] uppercase tracking-[.2em] text-[#a99bb5]">01 / каталог</p><h2 class="display mt-3 text-3xl">Выберите историю</h2></div><label class="flex items-center gap-3 border-b border-[#554966] pb-2"><span class="text-[#a99bb5]">⌕</span><input v-model="search" placeholder="Поиск по имени..." class="w-48 bg-transparent text-sm outline-none placeholder:text-[#756a80]"></label></div><div v-if="filtered.length" class="grid gap-5 md:grid-cols-2"><StreamerCard v-for="streamer in filtered" :key="streamer.slug" :streamer="streamer" /></div><p v-else class="border border-dashed border-[#554966] p-10 text-sm text-[#a99bb5]">Ничего не найдено. Попробуйте имя или псевдоним.</p></section>
      <section id="vote" class="mt-24 scroll-mt-8 border-t border-[#40384d] pt-16">
        <div class="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p class="mono text-[10px] uppercase tracking-[.2em] text-[#a99bb5]">02 / next profile</p><h2 class="display mt-3 text-3xl">Кого добавить следующим?</h2></div><span class="mono text-[10px] uppercase tracking-[.14em] text-[#8e8198]">mock vote · без сохранения</span></div>
        <p class="max-w-2xl text-sm leading-7 text-[#a99bb5]">Выберите популярного автора СНГ, чью публичную историю стоит исследовать следующей. Результаты демонстрационные и не отправляются на сервер.</p>
        <div class="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <button v-for="candidate in candidates" :key="candidate.name" type="button" class="border p-5 text-left transition hover:-translate-y-1 hover:border-[#b9a7df]" :class="selectedCandidate === candidate.name ? 'border-[#b9a7df] bg-[#2d2540]' : 'border-[#40384d] bg-[#211b2d]'" @click="castVote(candidate.name)"><div class="flex items-start justify-between"><span class="display text-xl">{{ candidate.name }}</span><span class="mono text-xs text-[#b9a7df]">{{ candidate.votes }}%</span></div><p class="mt-3 text-xs text-[#a99bb5]">{{ candidate.genre }}</p><div class="mt-5 h-1 bg-[#40384d]"><div class="h-1 bg-[#9d83d6]" :style="{ width: `${candidate.votes}%` }" /></div></button>
        </div>
        <p v-if="selectedCandidate" class="mt-5 text-sm text-[#a99bb5]">Ваш демонстрационный выбор: <strong class="text-[#c7b6ed]">{{ selectedCandidate }}</strong></p>
      </section>
    </main>
  </div>
</template>
