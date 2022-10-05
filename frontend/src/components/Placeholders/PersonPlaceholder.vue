<template>
  <div class="person">
    <div class="img"></div>
    <div class="text-holder">
      <div class="title"></div>
      <div class="text"></div>
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
  gap:15px;
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

    div.title{
      background:var(--font-color);
      height:0.95rem;
      width:100px;
      border-radius:4px;
    }
    div.text{
      background:var(--font-color);
      height:0.8rem;
      width:50%;
      border-radius:4px;
    }
  }
}
</style>