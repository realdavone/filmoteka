<template>
  <div class="title user-select-none">
    <slot />   
  </div>
</template>

<style lang="scss" scoped>
div.title{
  margin-bottom:1rem;
  font-size:1.5rem;
  font-weight:700;
  text-transform:uppercase;
  letter-spacing:1px;
  font-family: 'Oswald', sans-serif;
}
@media screen and (max-width: 600px){
  div.title{ font-size:1.25rem }
}
</style>