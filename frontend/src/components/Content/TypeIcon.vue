<template>
  <div class="icon">
    <span class="material-symbols-outlined">{{props?.type?.toLowerCase()==='movie'?'movie':'tv'}}</span>
  </div>
</template>

<script setup>
const props = defineProps({ type: String })
</script>

<style lang="scss" scoped>
  div.icon{
    min-width:24px;
    min-height:24px;
    width:24px;
    height:24px;
    background:var(--theme-color);
    border-radius:17px;
    display:inline-flex!important;
    justify-content:center;
    align-items:center;
    padding-top:1px;
    transition:0.2s ease background;
    overflow:hidden;
    span{
      font-size:1rem;
      color:white;
    }
  }
</style>