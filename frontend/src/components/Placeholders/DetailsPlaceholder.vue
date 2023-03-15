<template>
  <div class="details">
    <div class="item" v-for="i in 6">
      <div class="skeleton-text" style="height: var(--small-font-size);"></div>
      <div class="skeleton-text" style="height: var(--medium-font-size);"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.details{
  display: grid;
  grid-template-columns:[start] repeat(auto-fill, minmax(160px, 1fr)) [end];
  gap: 15px;
  width: 100%;
  div.item{
    min-height: 80px;
    background-color: var(--card-color);
    padding: 5px 10px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }
}
</style>