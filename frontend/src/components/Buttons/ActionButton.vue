<template>
  <button :class="`action-button ${props.warning ? 'warning' : ''} ${props.success ? 'success' : ''}`" @click="$emit('handleClick')">
    <span v-if="!props.loading" class="material-icons icon">{{props.icon}}</span>
    <Loader v-else border="3px" height="12px" />
  </button>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import Loader from '../Loader.vue'

const props = withDefaults(defineProps<{
  warning?: boolean,
  loading?: boolean,
  success?: boolean,
  icon: string
}>(), {
  warning: () => false,
  loading: () => false,
  success: () => false
})
</script>

<style lang="scss" scoped>
button.action-button{
  transition:0.2s ease background-color;
  overflow:hidden;
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  gap:0.5rem;
  padding:0.75rem;
  border-radius:50%;
  line-height:1;
  aspect-ratio:1;
  height:var(--button-height);
  transition:0.2s ease all;
  &.warning{ color:#b41333; }
  &.success{ color:#1c663c; }
  &.placeholder{
    background-color:var(--card-color);
    cursor:default;
  }
  &:disabled, &[disabled]{
    cursor:default;
    opacity:0.25;
    background-color:transparent;
  }
  &:hover:not(:disabled){ transform:scale(1.25); }
  :slotted(span.icon){ font-size:1.5rem }
}
@media screen and (max-width: 600px){
  :slotted(span.icon){ font-size:1rem!important }
}
</style>