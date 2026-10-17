<script setup lang="ts">
import type { HistoricalEvent, Source } from '~/types/domain'
const props = defineProps<{ events: HistoricalEvent[]; sources: Source[] }>()
const sourceMap = computed(() => new Map(props.sources.map((source) => [source.id, source])))
</script>
<template>
  <div class="relative ml-2 border-l border-[#45453e]">
    <article v-for="(item, index) in events" :key="item.id" class="relative pb-12 pl-8 last:pb-0">
      <span class="absolute -left-[5px] top-1 h-2 w-2 bg-[var(--accent)] ring-4 ring-[var(--background)]" />
      <div class="mb-3 flex flex-wrap items-center gap-3">
        <span class="mono text-[10px] uppercase tracking-[.18em] text-[var(--accent)]">{{ String(index + 1).padStart(2, '0') }} · {{ item.date }}</span>
        <span class="border border-[#45453e] px-2 py-1 text-[10px] uppercase text-[var(--muted)]">{{ item.verified ? 'Подтверждено в архиве' : 'Требует проверки' }}</span>
      </div>
      <h3 class="display text-xl">{{ item.title }}</h3>
      <p class="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">{{ item.description }}</p>
      <div class="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[.16em] text-[var(--muted)]">
        <span>источники:</span>
        <template v-for="id in item.sources" :key="id">
          <a v-if="sourceMap.has(id)" :href="sourceMap.get(id)?.url" target="_blank" rel="noreferrer" class="underline underline-offset-4">{{ sourceMap.get(id)?.title }} ↗</a>
        </template>
      </div>
    </article>
  </div>
</template>
