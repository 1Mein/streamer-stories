<script setup lang="ts">
import { streamers } from '~/data/streamers'
import type { Streamer } from '~/types/domain'
defineProps<{ streamer: Streamer }>()
</script>

<template>
  <NuxtLink
    :to="`/streamers/${streamer.slug}`"
    class="streamer-card group"
    :style="{ '--card-accent': streamer.theme.colors.accent, '--card-muted': streamer.theme.colors.muted, background: streamer.theme.colors.surface }"
  >
    <div class="card-portrait-stage">
      <span class="mono card-number">История / {{ String(streamers.findIndex((item) => item.slug === streamer.slug) + 1).padStart(2, '0') }}</span>
      <img
        v-if="streamer.portrait"
        :src="streamer.portrait.src"
        :alt="streamer.portrait.alt"
        :width="streamer.portrait.width"
        :height="streamer.portrait.height"
        loading="lazy"
        decoding="async"
        class="card-portrait"
      >
    </div>
    <div class="card-copy">
      <p class="mb-3 text-xs uppercase tracking-[.12em]" :style="{ color: streamer.theme.colors.secondary }">{{ streamer.eyebrow }}</p>
      <h3 class="display text-2xl">{{ streamer.name }}</h3>
      <p class="mt-4 text-sm leading-7" :style="{ color: streamer.theme.colors.muted }">{{ streamer.bio }}</p>
      <div class="card-footer">
        <span>Событий: {{ streamer.events.length }}</span>
        <span class="card-open">Читать историю →</span>
      </div>
    </div>
  </NuxtLink>
</template>
