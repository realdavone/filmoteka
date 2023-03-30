<template>
  <div class="item">
    <span v-font:small class="label">{{ label }}</span>
    <slot /> 
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<style lang="scss" scoped>
div.item{
  background-color: var(--card-color);
  padding: 5px 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;

  span.label{
    color: gray;
  }
}
</style>