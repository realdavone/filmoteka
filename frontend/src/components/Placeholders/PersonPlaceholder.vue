<template>
  <div class="person">
    <div class="img"></div>
    <div class="text-holder">
      <div class="skeleton-text" style="width:50%;"></div>
      <div class="skeleton-text"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.person{
  width:100%;
  height:65px;
  background:var(--card-color);
  border-radius:8px;
  display:flex;
  gap:1rem;
  align-items:center;
  overflow:hidden;

  div.img{
    background:var(--card-color-hover);
    height:100%;
    aspect-ratio:1;
  }
  div.text-holder{
    display:flex;
    flex-direction:column;
    gap:6px;
    width:100%;
    padding-right:10px;
  }
}
</style>