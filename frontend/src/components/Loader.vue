<template>
  <div class="loader" :style="{ minHeight: props?.height, minWidth: props?.height, borderWidth: props?.border}"></div>
</template>

<script setup lang="ts">
const props = defineProps<{
  height?: string
  border?: string
}>()
</script>

<style lang="scss" scoped>
div.loader {
  border: 0.1rem solid var(--alternative-color);
  border-top: 0.1rem solid transparent;
  border-radius: 50%;
  height:calc(1rem - 2 * 0.1rem);
  width:calc(1rem - 2 * 0.1rem);
  aspect-ratio:1;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>