<template>
  <div class="loader" :style="{ height: height, borderWidth: border}"></div>
</template>

<script setup>
const props = defineProps({
  height: String,
  border: String
})
</script>

<style lang="scss" scoped>
div.loader {
  border: 0.1rem solid #fff;
  border-top: 0.1rem solid transparent;
  border-radius: 50%;
  height:calc(1rem - 2 * 0.1rem);
  aspect-ratio:1;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>