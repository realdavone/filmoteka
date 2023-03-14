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
  grid-template-columns:[start] repeat(auto-fill, minmax(160px, 1fr)) [end];
  gap: 1rem;
  width: 100%;
  div.item{
    min-height: 80px;
    background-color: var(--card-color);
    padding: 5px 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    div.text{
      width:50%;
      &:first-of-type{
        height: 0.75rem;
        margin-bottom: 10px;
      }
    }
  }
}
</style>