<template>
  <button :class="`sub-nav-button ${warning ? 'warning' : ''} ${success ? 'success' : ''}`" @click="$emit('handleClick')">
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
button.sub-nav-button{
  transition:0.2s ease all;
  overflow:hidden;
  background-color:var(--card-color-hover);
  display:flex;
  align-items:center;
  gap:0.5rem;
  padding:0.5rem;
  border-radius:1rem;
  line-height:1;
  &.warning{
    background-color:crimson!important;
    color:var(--font-color-dark);
  }
  &.success{
    background-color:seagreen!important;
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
  :slotted(span.icon){ display:initial }
}
</style>