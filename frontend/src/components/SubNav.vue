<template>
  <nav class="subnav user-select-none">
    <div class="buttons">
      <slot>
        <button class="placeholder" v-for="index in 4" :key="index"></button>
      </slot>
    </div>
  </nav>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification"

const copyUrl = () => {
  const nav = navigator
  const win = window
  nav.clipboard.writeText(win.location.href)
  notify({ type: 'warn', text: 'URL adresa bola skopírovaná' })
}

defineExpose({ copyUrl })
</script>

<style lang="scss">
nav.subnav{
  width:100%;
  display:flex;
  flex-direction:row;
  align-items:center;
  overflow:hidden;
  div.buttons{
    display:flex;
    align-items:center;
    gap:4px;
    button.placeholder{
      height:36px;
      width:36px;
      background-color:var(--theme-color);
      border-radius:50%;
      cursor:default;
    }
  }
}
</style>