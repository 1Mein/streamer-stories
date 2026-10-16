<script setup lang="ts">
import type { HistoricalEvent } from '~/types/domain'
defineProps<{ events: HistoricalEvent[] }>()
</script>
<template>
  <div class="relative ml-2 border-l border-[#45453e]">
    <article v-for="(item, index) in events" :key="item.id" class="relative pb-12 pl-8 last:pb-0">
      <span class="absolute -left-[5px] top-1 h-2 w-2 bg-[#d7ff42] ring-4 ring-[#10100f]" />
      <div class="mb-3 flex flex-wrap items-center gap-3"><span class="mono text-[10px] uppercase tracking-[.18em] text-[#d7ff42]">0{{ index + 1 }} · {{ item.year }}</span><span class="border border-[#45453e] px-2 py-1 text-[10px] uppercase text-[#a8a89e]">{{ item.category }}</span></div>
      <h3 class="display text-xl">{{ item.title }}</h3>
      <p class="mt-3 max-w-xl text-sm leading-7 text-[#bdbdb2]">{{ item.description }}</p>
      <div class="mt-4 flex gap-2 text-[10px] uppercase tracking-[.16em] text-[#73736b]"><span>источник</span><span v-for="source in item.sources" :key="source">{{ source }}</span></div>
    </article>
  </div>
</template>
