<template>
  <button :class="`${props.type}`" @click="$emit('handleClick')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'basic' | 'hover-color-change'
}>(), {
  type: () => 'basic'
})
</script>

<style lang="scss" scoped>
button{
  padding: 0 1rem;
  border-radius: 0.25rem;
  font-weight: 700;
  font-size: 0.8rem;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
  white-space: nowrap;
  font-family: 'Open Sans', sans-serif;
  height: 30px;
  max-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  &.basic{
    background-color:var(--theme-color);
    color:var(--font-color-dark);
  }
  &.hover-color-change{
    background-color:var(--theme-color);
    color:var(--font-color-dark);
    transition:0.2s ease all;
    &:hover{
      background-color:var(--font-color);
      color:var(--background-color);
    }
  }
  &:disabled{
    opacity: 0.75;
    cursor: initial;
  }
}
@media screen and (max-width:600px){
  button.hover-color-change:hover{
    background-color:var(--theme-color);
    color:var(--font-color-dark);
  }
}
</style>