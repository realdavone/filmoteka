<template>
  <div class="backdrop container">
    <slot />
  </div>
</template>

<style scoped>
div.backdrop{
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