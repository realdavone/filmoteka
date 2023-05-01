<template>
  <button
    v-font:small
    :class="`${props.type}`"
    @click="$emit('handleClick')"
    :type="props.type === 'close' ? 'button' : undefined"
  ><slot /></button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  type?: 'basic' | 'hover-color-change' | 'outline' | 'close' | 'transparent'
}>(), {
  type: 'basic'
})
</script>

<style lang="scss" scoped>
button{
  padding: 0 15px;
  border-radius: 4px;
  font-weight: 700;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
  white-space: nowrap;
  font-family: 'Roboto', sans-serif;
  height: 30px;
  max-height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  letter-spacing:0.5px;
  transition: 0.2s ease background;
  &.outline{
    background-color: transparent;
    outline: 1px solid var(--font-color)
  }

  &.transparent{
    background-color: transparent;

    &:hover{
      background-color: var(--card-color-hover);
    }
  }
  &.close{
    background-color: crimson;
    color: white;
  }
  &.basic{
    background-color:var(--theme-color);
    color:var(--font-color-dark);
  }
  &.hover-color-change{
    background-color:var(--theme-color);
    color:var(--font-color-dark);
    transition:0.2s ease all;
  }
  &:disabled{
    opacity: 0.5;
    cursor: initial;
  }
}
@media (hover: hover) {
  button.hover-color-change:hover{
    background-color:var(--font-color);
    color:var(--background-color);
  }
}
</style>