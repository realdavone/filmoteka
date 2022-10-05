<template>
  <section class="items">
    <slot name="item">
      <component v-for="n in props['placeholderData']['count']" :key="n" :is="props['placeholderData']['type']==='title'?TitlePlaceholder:PersonPlaceholder"></component>
    </slot>
  </section>
</template>

<script setup>
import TitlePlaceholder from '../Placeholders/TitlePlaceholder.vue'
import PersonPlaceholder from '../Placeholders/PersonPlaceholder.vue'

const props = defineProps({ placeholderData: Object })
</script>

<style lang="scss" scoped>
section.items{
  display:flex;
  flex-direction:column;
  gap:20px;
}
@media screen and (max-width: 600px){
  section.items{
    gap:var(--container-padding)!important;
  }
}
</style>