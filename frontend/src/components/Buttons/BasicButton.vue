<template>
  <button :class="`${props.mutation}`" @click="$emit('handleClick')">{{props.text}}</button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  mutation?: 'basic' | 'hover-color-change'
}>(), {
  mutation: () => 'basic'
})
</script>

<style lang="scss" scoped>
button{
  padding:0.5rem 0.75rem;
  border-radius:1rem;
  font-weight:700;
  font-size:0.75rem;
  position: relative;
  z-index:1;
  white-space:nowrap;
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
}
@media screen and (max-width:600px){
  button.hover-color-change:hover{
    background-color:var(--theme-color);
    color:var(--font-color-dark);
  }
}
</style>