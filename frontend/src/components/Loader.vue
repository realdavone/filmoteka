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
    min-width: 30px;
    min-height: 30px;
    max-width: 30px;
    max-height: 30px;
    border-width: 4px;
  }
  &.inline{
    display: inline-block;
    min-width: 15px;
    min-height: 15px;
    max-width: 15px;
    max-height: 15px;
    border-width: 2px;
  }
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>