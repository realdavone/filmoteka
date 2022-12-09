<template>
  <div class="icon">{{type?.toLowerCase() === 'movie' ? 'Film' : 'Seriál'}}</div>
</template>

<script setup lang="ts">
const { type } = defineProps<{ type: 'Movie' | 'Tv' | 'movie' | 'tv' }>()
</script>

<style lang="scss" scoped>
  div.icon{
    outline:1px solid gray;
    border-radius:4px;
    padding:2px 5px 1px 6px;
    font-size:0.75rem;
  }
</style>