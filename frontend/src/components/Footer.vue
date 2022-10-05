<template>
  <footer class="container user-select-none">
    <ul>
      <li v-for="(link, i) in links" :key="i"><router-link tabindex="0" :to="link.address">{{ link.label }}</router-link></li>
    </ul>
    <div class="logos">
      <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
        <img class="tmdb-logo" src="../assets/tmdb.svg" alt="TMDB">
      </a>
      <Logo :height="40"/>
    </div>
  </footer>
</template>

<script setup>
import Logo from './Logo.vue'

const links = [
  {
    address: '/',
    label: 'Domov'
  },
  {
    address: '/library',
    label: 'Knižnica'
  },
  {
    address: '/dmca',
    label: 'DMCA'
  }
]
</script>

<style lang="scss" scoped>
footer{
  width:100%;
  height:var(--footer-height);
  display:flex;
  gap:15px;
  align-items:center;
  justify-content:center;
  flex-direction:column;
  padding-top:20px;
  padding-bottom:20px;
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
  div.bottom-row{
    display:flex;
    gap:15px;
  }
}
</style>