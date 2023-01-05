<template>
  <div class="details">
    <div class="item" v-for="i in 6"></div>
  </div>
</template>

<style lang="scss" scoped>
div.details{
  display:grid;
  grid-template-columns:[start] repeat(auto-fill, minmax(180px, 1fr)) [end];
  gap:1rem;
  width:100%;
  div.item{
    box-shadow:var(--basic-box-shadow);
    min-height:80px;
    border-radius:0.5rem;
  }
}
</style>