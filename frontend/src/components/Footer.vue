<template>
  <footer class="user-select-none">
    <div class="logos">
      <Logo />
      <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
        <img class="tmdb-logo" src="../assets/tmdb.svg" alt="TMDB">
      </a>
    </div>
    <span v-font:small class="copy">2022-2023, Filmotéka</span>
  </footer>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
</script>

<style lang="scss" scoped>
footer{
  width:100%;
  display:flex;
  gap:1rem;
  padding:1rem 0.5rem;
  align-items:flex-start;
  justify-content:center;
  flex-direction:column;
  div.logos{
    display:flex;
    gap:15px;
    align-items:center;
    a{
      img.tmdb-logo{
        height:30px;
        width:auto;
      }
    }
  }
}
</style>