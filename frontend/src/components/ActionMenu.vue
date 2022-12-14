<template>
    <div class="buttons">
      <slot>
        <button class="placeholder" v-for="index in 4" :key="index"></button>
      </slot>
    </div>
</template>

<script setup lang="ts">
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
div.buttons{
  --button-height:56px;

  display:flex;
  gap:0.5rem;
  justify-content:center;
  flex-wrap:wrap;
  button.placeholder{
    height:var(--button-height);
    aspect-ratio:1;
    background-color:var(--card-color);
    border-radius:50%;
    cursor:default;
  }
}
@media screen and (max-width: 600px){
  div.buttons{
    --button-height:40px;
  }
}
</style>