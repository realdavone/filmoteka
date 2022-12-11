<template>
  <div
  class="loader"
  :style="{
    minHeight: props?.height || '1rem',
    minWidth: props?.height || '1rem',
    borderWidth: props?.border || '0.25rem',
    borderRadius: '50%',
    borderStyle: 'solid',
    borderColor: color || 'var(--font-color)',
    borderTopColor: 'transparent',
  }"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  height?: string
  border?: string
  color?: string
}>()
</script>

<style lang="scss" scoped>
div.loader {
  aspect-ratio:1;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>