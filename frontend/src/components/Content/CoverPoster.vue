<template>
  <img
    :class="`poster ${fadeInOnLoad && 'faded-before-load'}`"
    :src="`https://www.themoviedb.org/t/p/${size}${src}`"
    :alt="alt"
    v-bind="{
      ...(fadeInOnLoad ? { onLoad: fadeIn } : undefined)
    }"
    loading="lazy" 
    draggable="false"
    @error="remove"
  />
</template>

<script setup lang="ts">
const { src, alt, fadeInOnLoad, size } = defineProps<{
  src: string | null,
  alt?: string,
  fadeInOnLoad?: boolean,
  size: string
}>()

const fadeIn = (event: Event) => {
  const el = event.target as HTMLImageElement
  el.style.opacity = '1'
}

const remove = (event: Event) => {
  const el = event.target as HTMLImageElement
  el.remove()
}
</script>

<style lang="scss" scoped>
img.poster{
  width:100%;
  height:100%;
  object-fit:cover;
  &.faded-before-load{
    opacity: 0;
    transition:0.4s ease opacity;
  }
}
</style>