<template>
  <button :class="`action-button ${warning ? 'warning' : ''} ${success ? 'success' : ''}`" @click="$emit('handleClick')">
    <slot name="icon" />
    <slot name="label" />
    <Loader v-if="loading" />
  </button>
</template>

<script setup>
import Loader from '../Loader.vue'
const { loading, warning, success } = defineProps({
  warning: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  success: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
button.action-button{
  transition:0.2s ease all;
  overflow:hidden;
  background-color:var(--card-color-hover);
  display:flex;
  align-items:center;
  justify-content:center;
  gap:0.5rem;
  padding:0.75rem;
  border-radius:0.25rem;
  line-height:1;
  min-width:160px;
  height:40px;
  &.warning{
    background-color:#dc143c80;
    color:var(--font-color-dark);
  }
  &.success{
    background-color:#2e8b5780;
    color:var(--font-color-dark);
  }
  &.placeholder{
    background:var(--card-color);
    cursor:default;
  }
  &:disabled, &[disabled]{
    cursor:default;
    opacity:0.5;
    background-color:transparent;
  }
}
:slotted(span.label){
  font-size:0.75rem;
}
:slotted(span.icon){
  font-size:1rem;
  display:none;
}
@media screen and (max-width: 600px){
  :slotted(span.label){ display:none }
  :slotted(span.icon){ display:initial; font-size:1.1rem; }
  button.action-button{
    min-width:40px;
    border-radius:2rem;
    padding:0.75rem;
  }
}
</style>