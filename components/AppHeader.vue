<script setup lang="ts">
const route = useRoute()
const isProfile = computed(() => route.path.startsWith('/streamers/'))
</script>

<template>
  <header class="relative z-10 mx-auto flex max-w-7xl flex-wrap gap-5 items-center justify-between px-5 py-6 lg:px-8">
    <NuxtLink to="/" class="display text-sm tracking-tight">STREAMER<span class="text-[var(--accent)]">/</span>STORIES</NuxtLink>
    <nav aria-label="Основная навигация" class="flex flex-wrap gap-4 text-xs text-[var(--muted)]">
      <template v-if="isProfile">
        <NuxtLink to="/" class="transition hover:text-[var(--accent)]">Каталог</NuxtLink>
        <a href="#biography" class="transition hover:text-[var(--accent)]">Биография</a>
        <a href="#timeline" class="transition hover:text-[var(--accent)]">Хронология</a>
        <a href="#media" class="transition hover:text-[var(--accent)]">Медиа</a>
      </template>
      <template v-else>
        <NuxtLink to="/#catalog" class="transition hover:text-[var(--accent)]">Каталог</NuxtLink>
        <NuxtLink to="/#vote" class="transition hover:text-[var(--accent)]">Голосование</NuxtLink>
        <NuxtLink to="/admin" class="transition hover:text-[var(--accent)]">Обзор архива</NuxtLink>
      </template>
    </nav>
    <span class="mono text-[10px] uppercase tracking-[.2em] text-[var(--muted)]">{{ isProfile ? 'профиль' : 'публичный архив' }}</span>
  </header>
</template>
