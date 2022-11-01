<template>
  <footer class="user-select-none">
    <ul>
      <li v-for="(link, i) in links" :key="i"><router-link tabindex="0" :to="link.address">{{ link.label }}</router-link></li>
    </ul>
    <div class="logos">
      <Logo :height="40"/>
      <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
        <img class="tmdb-logo" src="../assets/tmdb.svg" alt="TMDB">
      </a>
    </div>
    <span class="copy">&copy; 2022 Filmotéka</span>
  </footer>
</template>

<script setup>
import Logo from './Logo.vue'

const links = [
  {
    address: '/dmca',
    label: 'DMCA'
  }
]
</script>

<style lang="scss" scoped>
footer{
  width:100%;
  display:flex;
  gap:15px;
  align-items:flex-start;
  justify-content:center;
  flex-direction:column;
  ul{
    list-style-type:none;
    display:flex;
    gap:0.5rem;
    li{
      display:inline-block;
      a{
        font-size:0.8rem;
        font-weight:700;
        &:hover{color:var(--theme-color)}
      }
    }
  }
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
  span.copy{font-size:0.75rem;}
}
</style>