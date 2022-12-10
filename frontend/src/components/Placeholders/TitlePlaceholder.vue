<template>
  <div class="title">
    <div class="img">
    </div>
    <div class="text-holder">
      <div class="skeleton-text" style="height:1.15rem;width:50%;"></div>
      <div class="rating"></div>
      <div class="text">
        <div v-for="i in 2" :key="i" class="skeleton-text" style="height:0.75rem"></div>
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
  gap:1rem;
  padding:1rem;
  overflow:hidden;
  div.img{
    background:var(--card-color-hover);
    height:100%;
    aspect-ratio:1;
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:1rem;
  }
  div.text-holder{
    display:flex;
    flex-direction:column;
    gap:10px;
    width:100%;
    padding-right:10px;
    div.rating{
      width:1.75rem;
      aspect-ratio:1;
      background-color:var(--card-color-hover);
      border-radius:50%;
    }
    div.text{
      display:flex;
      flex-direction:column;
      gap:0.35rem;
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
