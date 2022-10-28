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
  display:flex;
  flex-direction:row;
  align-items:center;
  overflow:hidden;
  align-self:center;
  div.buttons{
    display:flex;
    gap:0.5rem;
    flex-wrap:wrap;
    button.placeholder{
      height:calc(0.85rem + 2 * 0.5rem);
      width:3rem;
      background-color:var(--card-color);
      border-radius:0.25rem;
      cursor:default;
    }
  }
}
</style>