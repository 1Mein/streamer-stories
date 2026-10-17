<script setup lang="ts">
const props = defineProps<{ src: string; alt: string; square?: boolean }>()
const failed = ref(false)
const pending = ref(true)
const image = ref<HTMLImageElement | null>(null)
onMounted(() => {
  if (image.value?.complete) {
    pending.value = false
    failed.value = image.value.naturalWidth === 0
  }
})
watch(() => props.src, () => { failed.value = false; pending.value = true })
</script>

<template>
  <div class="relative overflow-hidden" :class="square ? 'aspect-square' : 'aspect-video'">
    <img v-if="!failed" ref="image" :src="src" :alt="alt" loading="lazy" decoding="async" class="h-full w-full object-cover transition duration-500 group-hover:scale-105" @load="pending = false" @error="failed = true; pending = false">
    <span v-if="pending" class="pointer-events-none absolute bottom-2 left-2 text-xs opacity-60">Загрузка изображения…</span>
    <span v-if="failed" class="absolute inset-0 grid place-items-center p-5 text-center text-xs opacity-70">Изображение недоступно. Открыть источник ↗</span>
  </div>
</template>
