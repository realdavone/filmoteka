<template>
  <img class="poster" :src="`https://www.themoviedb.org/t/p/w300${src}`" :alt="alt" draggable="false" />
</template>

<script setup lang="ts">
const { src, alt } = defineProps<{
  src: string,
  alt: string
}>()
</script>

<style lang="scss" scoped>
img.poster{
  width:100%;
  height:100%;
  object-fit:cover;
}
</style>