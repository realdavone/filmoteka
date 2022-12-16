<template>
  <div class="details">
    <div class="item" v-for="i in 6"></div>
  </div>
</template>

<style lang="scss" scoped>
div.details{
  background-color:var(--card-color);
  padding:1rem;
  display:grid;
  grid-template-columns:[start] repeat(auto-fill, minmax(180px, 1fr)) [end];
  gap:1rem;
  width:100%;
  border-radius:1rem;
  div.item{
    background-color:var(--card-color-hover);
    min-height:80px;
    border-radius:0.5rem;
  }
}
</style>