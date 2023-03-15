<template>
  <div class="title">
    <div class="img">
    </div>
    <div class="text-holder">
      <div class="skeleton-text" style="height:var(--medium-font-size);width:50%;"></div>
      <div class="rating"></div>
      <div class="text">
        <div v-for="i in 2" :key="i" class="skeleton-text" style="height: var(--small-font-size);"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div.title{
  width:100%;
  height:140px;
  background:var(--card-color);
  border-radius:8px;
  display:flex;
  align-items:center;
  gap:15px;
  padding:15px;
  overflow:hidden;
  div.img{
    background:var(--card-color-hover);
    height:100%;
    aspect-ratio:1;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:15px;
  }
  div.text-holder{
    display:flex;
    flex-direction:column;
    gap:10px;
    width:100%;
    padding-right:10px;
    div.rating{
      width:25px;
      aspect-ratio:1;
      background-color:var(--card-color-hover);
      border-radius:50%;
    }
    div.text{
      display:flex;
      flex-direction:column;
      gap:6px;
    }
  }
}
@media screen and (max-width: 600px) {
  div.title{
    height:110px;
    div.text{ display:none!important }
  }
}
</style>
