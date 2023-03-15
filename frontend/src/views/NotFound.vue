<template>
  <main v-once class="container main user-select-none">
    <span class="num" v-font:large>404</span>
    <span v-font:medium>Hľadaný obsah nebol nájdený</span>
    <BasicButton @handleClick="$router.push('/')">Vrátiť sa na domovskú stránku</BasicButton>
  </main>
</template>

<script setup lang="ts">
import BasicButton from '../components/Buttons/BasicButton.vue'
</script>

<style lang="scss" scoped>
main.main{
  display:flex;
  justify-content:center;
  align-items:center;
  gap:15px;
  flex-direction:column;
  width:100%;
  height:calc(100vh - var(--nav-height) - var(--main-content-padding-bottom));
  span.num{
    font-weight:900;
  }
}
</style>