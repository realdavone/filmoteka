<template>
  <section class="grid">
    <slot name="items">
      <MediaGridItemPlaceholder v-for="i in 16" :key="i"/>
    </slot>
  </section>
</template>

<script setup>
import MediaGridItemPlaceholder from '../Placeholders/MediaGridItemPlaceholder.vue'
</script>

<style lang="scss" scoped>
section.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(100px, 1fr));
  gap:1rem;
}
</style>