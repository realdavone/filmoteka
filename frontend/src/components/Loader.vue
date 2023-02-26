<template>
  <div :class="`loader ${type}`"></div>
</template>

<script setup lang="ts">
defineProps<{
  type: 'default' | 'inline'
}>()
</script>

<style lang="scss" scoped>
div.loader {
  aspect-ratio:1;
  animation: spin 0.8s linear infinite;
  border-radius: 50%;
  border-style: solid;
  border-color: var(--font-color);
  border-top-color: transparent;
  &.default{
    width: 30px;
    border-width: 5px;
  }
  &.inline{
    width: 1rem;
    border-width: 2px;
  }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>