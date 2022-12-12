<template>
  <section class="items">
    <slot name="item">
      <component v-for="n in placeholderData['count']" :key="n" :is="placeholderData['type'] === 'person' ? PersonPlaceholder : TitlePlaceholder"></component>
    </slot>
  </section>
</template>

<script setup lang="ts">
import TitlePlaceholder from '../Placeholders/TitlePlaceholder.vue'
import PersonPlaceholder from '../Placeholders/PersonPlaceholder.vue'

const { placeholderData } = defineProps<{
  placeholderData: {
    count: number
    type: 'title' | 'person'
  }
}>()
</script>

<style lang="scss" scoped>
section.items{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));
  gap:1rem;
}
@media screen and (max-width: 600px){
  section.items{ gap:var(--container-padding)!important }
}
</style>