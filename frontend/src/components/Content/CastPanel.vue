<template>
  <section v-if="props.cast?.length !== 0" class="container">
    <Title>{{props.heading}}</Title>
    <section class="people-panel">
      <PersonCard v-for="member in cast" :key="member.id" :person="member" />
    </section>    
  </section>
</template>

<script setup lang="ts">
import PersonCard from './PersonCard.vue'
import Title from './Title.vue'

const props = defineProps<{
  heading: string
  cast?: Array<{
    character: string
    id: number
    name: string
    profile_path: string
  }>
}>()
</script>

<style lang="scss" scoped>
section.people-panel{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(250px, 1fr));
  overflow:auto;
  gap:var(--container-padding);
}
</style>