<template>
  <div class="details">
    <div class="item" v-for="i in 6">
      <div class="text skeleton-text"></div>
      <div class="text skeleton-text"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.details{
  display: grid;
  grid-template-columns: [start] repeat(auto-fill, minmax(180px, 1fr)) [end];
  gap: 1rem;
  row-gap: 2rem;
  width: 100%;
  div.item{
    min-height:80px;

    div.text{
      &:first-of-type{
        height: 1.25rem;
        margin-bottom: 10px;
      }
    }
  }
}
</style>