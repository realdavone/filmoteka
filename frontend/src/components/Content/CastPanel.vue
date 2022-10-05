<template>
  <section class="container">
    <Title>
      <slot name="title" />
    </Title>
    <section class="people-panel">
      <slot name="card"/>
    </section>    
  </section>
</template>

<script setup>
import Title from './Title.vue'
</script>

<style lang="scss" scoped>
section.people-panel{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(250px, 1fr));
  overflow:auto;
  gap:var(--container-padding);
}
</style>