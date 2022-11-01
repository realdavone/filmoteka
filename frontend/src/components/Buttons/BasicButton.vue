<template>
  <button class="basic" @click="$emit('handleClick')">{{text}}</button>
</template>

<script setup>
const { text } = defineProps({ text: String })
</script>

<style lang="scss" scoped>
button.basic{
  background-color:var(--theme-color);
  padding:0.5rem 0.75rem;
  border-radius:0.5rem;
  font-weight:700;
  color:var(--font-color-dark);
  font-size:0.75rem;
  position: relative;
  z-index:1;
}
</style>