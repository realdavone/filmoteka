<template>
  <div class="modal-mask container">
    <slot name="modal"></slot>
  </div>
</template>

<script setup>
import _ from '../utils/main.js'
import { onMounted, onUnmounted } from 'vue'
import useEvent from '../composables/event'

const emit = defineEmits(['close'])

onMounted(() => {
  _.makeUnscrollable(document.body, true)  
})
onUnmounted(() => {
  _.makeUnscrollable(document.body, false)
})

useEvent({ target: document.body, event: 'keydown', callback: (e) => e.code === 'Escape' && emit('close') })

</script>

<style lang="scss" scoped>
  div.modal-mask{
    position:fixed;
    width:100%;
    height:100vh;
    background:#00000080;
    top:0;
    left:0;
    z-index:999;
    display:flex;
    justify-content:center;
    align-items:center;
    backdrop-filter:blur(4px);
  }
</style>