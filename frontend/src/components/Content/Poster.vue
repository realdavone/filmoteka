<template>
  <img
    v-if="src"
    :class="`poster ${fadeInOnLoad && 'faded-before-load'}`"
    v-bind="{
      ...fadeInOnLoad ? { onLoad: fadeIn } : undefined
    }"
    :src="`https://www.themoviedb.org/t/p/w300${aspectRatio === '1' ? '_and_h300_face' : ''}${src}`"
    :alt="alt"
    :style="`aspect-ratio:${aspectRatio === '1' ? '1' : '2/3'}`"
    draggable="false"
    loading="lazy"
    @error="remove"
  />
</template>

<script setup lang="ts">

const { src, alt, fadeInOnLoad, aspectRatio } = defineProps<{
  src?: string | null,
  alt?: string,
  fadeInOnLoad?: boolean,
  aspectRatio?: '2/3' | '1'
}>()

function fadeIn(el: Event){
  const image = el.target as HTMLImageElement
  image.style.opacity = '1'
}

function remove(el: Event){
  const image = el.target as HTMLImageElement
  image.remove()
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