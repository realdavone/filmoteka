<template>
  <div class="title">
    <div class="img">
      <Logo :height="50" style="opacity:0.1;filter:grayscale(100%)"/>
    </div>
    <div class="text-holder">
      <div class="title"></div>
      <div class="rating"></div>
      <div class="text">
        <div v-for="i in 2" :key="i" class="row"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '../Logo.vue'
</script>

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
    border-radius:0.5rem;
  }
  div.text-holder{
    display:flex;
    flex-direction:column;
    gap:10px;
    width:100%;
    padding-right:10px;
    div.title{
      background:var(--font-color);
      height:1rem;
      width:25%;
      border-radius:4px;
    }
    div.rating{
      background:var(--font-color);
      height:1rem;
      width:50px;
      border-radius:4px;
    }
    div.text{
      div.row{
        background:var(--font-color);
        height:0.75rem;
        width:100%;
        border-radius:4px;
        margin-bottom:4px;
        &:last-of-type{ width:90% }
      }
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
