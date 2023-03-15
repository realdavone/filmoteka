<template>
  <section class="grid">
    <div v-for="i in 16" :key="i" class="skeleton"></div>
  </section>
</template>

<style lang="scss" scoped>
section.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(100px, 1fr));
  gap:15px;
  div.skeleton{
    aspect-ratio:2/3;
    background-color:var(--card-color);
    border-radius:15px;
  }
}
</style>