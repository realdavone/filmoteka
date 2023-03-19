<template>
  <Backdrop>
    <slot name="modal"></slot>
  </Backdrop>
</template>

<script setup lang="ts">
import _ from '../../utils/main'
import { onMounted, onUnmounted } from 'vue'
import useEvent from '../../composables/event'
import Backdrop from './Backdrop.vue';

const { unscrollableOnMounted } = withDefaults(defineProps<{
  unscrollableOnMounted?: boolean
}>(), {
  unscrollableOnMounted: true
})

const emit = defineEmits(['close'])

onMounted(() => unscrollableOnMounted && _.makeUnscrollable(document.body, true))
onUnmounted(() => unscrollableOnMounted && _.makeUnscrollable(document.body, false))

useEvent({ target: document.body, event: 'keydown', callback: (e: KeyboardEvent) => e.code === 'Escape' && emit('close') })
</script>

<style lang="scss" scoped>
div.modal-mask{
  position:fixed;
  width:100%;
  height:100vh;
  background:var(--background-color-alpha);
  top:0;
  left:0;
  z-index:999;
  display:flex;
  justify-content:center;
  align-items:center;
  backdrop-filter:blur(4px);
}
</style>