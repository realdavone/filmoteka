<template>
  <div class="modal-mask container">
    <slot name="modal"></slot>
  </div>
</template>

<script setup>
import functions from '../utils/main.js'
import { onMounted, onUnmounted } from 'vue'


const props = defineProps({ isVisible: Boolean })
const emit = defineEmits(['close'])

const closeAtEscapeKeydown = e => { if(e.code === 'Escape') emit('close') }

onMounted(() => { functions.makeUnscrollable(document.body,true); document.addEventListener('keydown', closeAtEscapeKeydown); })
onUnmounted(() => { functions.makeUnscrollable(document.body,false); document.removeEventListener('keydown', closeAtEscapeKeydown); })
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