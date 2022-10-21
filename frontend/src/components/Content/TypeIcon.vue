<template>
  <div class="icon">{{type?.toLowerCase() === 'movie' ? 'Film' : 'Seriál'}}</div>
</template>

<script setup>
const { type } = defineProps({ type: String })
</script>

<style lang="scss" scoped>
  div.icon{
    outline:1px solid gray;
    border-radius:2px;
    padding:1px 6px 1px;
    font-size:0.75rem;
  }
</style>