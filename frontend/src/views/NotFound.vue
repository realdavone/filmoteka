<template>
  <main v-once class="container main user-select-none">
    <span class="num">404</span>
    <span>Hľadaný obsah nebol nájdený</span>
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
  gap:1rem;
  flex-direction:column;
  width:100%;
  height:calc(100vh - var(--nav-height) - var(--main-content-padding-bottom));
  span.num{
    font-size:2rem;
    font-weight:900;
  }
}
</style>