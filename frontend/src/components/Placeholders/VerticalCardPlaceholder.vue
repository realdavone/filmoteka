<template>
  <section class="vertical-placeholder">
    <Logo height="75" style="opacity:0.1;filter:grayscale(100%)"/>
  </section>
</template>

<script setup>
import Logo from '../Logo.vue'
</script>

<style lang="scss" scoped>
section.vertical-placeholder{
  aspect-ratio:2/3;
  background:var(--card-color);
  border-radius:12px;
  overflow:hidden;
  display:flex;
  justify-content:center;
  align-items:center;
}
</style>