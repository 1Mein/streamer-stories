<script setup lang="ts">
const route = useRoute()
const isProfile = computed(() => route.path.startsWith('/streamers/'))
</script>

<template>
  <header class="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
    <NuxtLink to="/" class="display text-sm tracking-tight">STREAMER<span class="text-[#d7ff42]">/</span>STORIES</NuxtLink>
    <nav class="hidden gap-7 text-xs text-[#a8a89e] md:flex">
      <template v-if="isProfile">
        <NuxtLink to="/" class="transition hover:text-[#d7ff42]">Каталог</NuxtLink>
        <a href="#timeline" class="transition hover:text-[#d7ff42]">Timeline</a>
        <a href="#biography" class="transition hover:text-[#d7ff42]">Биография</a>
        <a href="#media" class="transition hover:text-[#d7ff42]">Медиа</a>
      </template>
      <template v-else>
        <a href="#catalog" class="transition hover:text-[#d7ff42]">Каталог</a>
        <a href="#vote" class="transition hover:text-[#d7ff42]">Голосование</a>
        <NuxtLink to="/admin" class="transition hover:text-[#d7ff42]">Модерация</NuxtLink>
      </template>
    </nav>
    <span class="mono text-[10px] uppercase tracking-[.2em] text-[#5d5d56]">{{ isProfile ? 'досье / 001' : 'архив 001' }}</span>
  </header>
</template>
