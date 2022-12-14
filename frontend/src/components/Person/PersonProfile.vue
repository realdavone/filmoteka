<template>
  <main class="profile container">
    <slot name="details">
      <PersonDetailsPlaceholder />
    </slot>
    <slot name="filmography">
      <FilmographyPlaceholder />
    </slot>
  </main>
</template>

<script setup lang="ts">
import PersonDetailsPlaceholder from '../Placeholders/PersonDetailsPlaceholder.vue'
import FilmographyPlaceholder from '../Placeholders/FilmographyPlaceholder.vue'
</script>

<style lang="scss" scoped>
main.profile{
  display:flex;
  align-items:flex-start;
  justify-content:space-between;
  gap:var(--container-padding);
}

@media screen and (max-width: 1200px) {
  main.profile{
    flex-direction:column;
    align-items:stretch;
  }
}
</style>