<template>
  <section class="page-control">
    <button :class="{ 'disabled': parseInt(pages.current) === 1 }" :disabled="parseInt(pages.current) === 1" @click="$emit('navigate', (parseInt(pages.current) - 1))" class="arrow-button">&#10094;</button>
    <span class="current-page">{{pages.current}}</span>
    <button :class="{ 'disabled': parseInt(pages.current) === parseInt(pages.totalPages) }" :disabled="parseInt(pages.current) === parseInt(pages.totalPages)" class="arrow-button" @click="$emit('navigate', (parseInt(pages.current) + 1))">&#10095;</button>
  </section>
</template>

<script setup>
  const { pages } = defineProps({ pages: Object })
</script>

<style lang="scss" scoped>
section.page-control{
  display:flex;
  justify-content:center;
  align-items:center;
  margin-top:var(--container-padding);
  span.current-page{
    display:inline-block;
    text-align:center;
    font-size:1.25rem;
    width:40px;
    font-weight:900;
  }
  button.arrow-button{
    background-color:var(--card-color);
    width:40px;
    height:30px;
    display:inline-flex;
    align-items:center;
    justify-content:center;
    border-radius:0.5rem;
    transition:0.2s ease background-color;
    &.disabled{
      cursor:default;
      background:transparent;
      opacity:0.5;
    }
    &:hover:not(.disabled){
      background-color:var(--card-color-hover);
    }
  }
}
</style>