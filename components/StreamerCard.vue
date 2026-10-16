<script setup lang="ts">
import type { Streamer } from '~/types/domain'
defineProps<{ streamer: Streamer }>()
</script>
<template>
  <NuxtLink :to="`/streamers/${streamer.slug}`" class="group block border p-5 transition hover:-translate-y-1" :style="{ borderColor: streamer.theme.colors.secondary, background: streamer.theme.colors.surface }">
    <div class="mb-16 flex items-start justify-between"><span class="mono text-[10px] uppercase tracking-[.2em]" :style="{ color: streamer.theme.colors.muted }">profile / 00{{ streamer.slug === 'derzko' ? '2' : '1' }}</span><span class="h-2 w-2" :style="{ background: streamer.theme.colors.accent }" /></div>
    <p class="mb-2 text-xs uppercase tracking-[.18em]" :style="{ color: streamer.theme.colors.secondary }">{{ streamer.eyebrow }}</p>
    <h3 class="display text-2xl">{{ streamer.name }}</h3>
    <p class="mt-3 max-w-sm text-sm leading-6" :style="{ color: streamer.theme.colors.muted }">{{ streamer.bio }}</p>
    <div class="mt-6 flex items-center justify-between border-t pt-4 text-xs" :style="{ borderColor: streamer.theme.colors.secondary }"><span :style="{ color: streamer.theme.colors.muted }">{{ streamer.events.length }} события</span><span :style="{ color: streamer.theme.colors.accent }" class="transition group-hover:translate-x-1">Открыть →</span></div>
  </NuxtLink>
</template>
