<template>
  <button :class="`action-button ${props.warning ? 'warning' : ''} ${props.success ? 'success' : ''}`" @click="$emit('handleClick')">
    <span v-if="!props.loading" class="material-icons-outlined">{{props.icon}}</span>
    <Loader v-else type="inline" />
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
  gap:8px;
  padding:10px;
  border-radius:50%;
  line-height:1;
  aspect-ratio:1;
  height:var(--button-height);
  transition:0.4s ease transform, 0.2s ease color;
  &.warning{ color:var(--action-button-error); }
  &.success{ color:var(--theme-color); }
  &.placeholder{
    background-color:var(--card-color);
    cursor:default;
  }
  &:disabled, &[disabled]{
    cursor:default;
    opacity:0.25;
    background-color:transparent;
  }
}

@media(hover: hover) {
  button.action-button:hover:not(:disabled){
    transform:scale(1.25);
  }
}
</style>