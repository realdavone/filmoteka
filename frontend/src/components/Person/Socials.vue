<template>
  <div class="socials">
    <a v-if="props.id" :href="'https://www.themoviedb.org/person/'+props.id" class="social-link tmdb" target="_blank">
      <img src="../../assets/tmdb.svg" height="18" alt="TMDB">
    </a>
    <a v-if="props.imdb" class="social-link imdb" :href="`https://www.imdb.com/name/${props.imdb}`"  target="_blank" title="IMDB">
      <img src="../../assets/imdb.svg" height="18" alt="IMDB">
    </a>
    <a v-if="props.fb" class="social-link facebook" :href="`https://www.facebook.com/${props.fb}`" target="_blank" title="Facebook">
      <i class="fa-brands fa-facebook-f"></i>
    </a>
    <a v-if="props.ig" class="social-link instagram" :href="`https://www.instagram.com/${props.ig}`" target="_blank" title="Instagram">
      <i class="fa-brands fa-instagram"></i>
    </a>
    <a v-if="props.twitter" class="social-link twitter" :href="`https://twitter.com/${props.twitter}`" target="_blank" title="Twitter">
      <i class="fa-brands fa-twitter"></i>
    </a>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

const props = withDefaults(defineProps<{
  id: string,
  imdb: string | null,
  fb: string | null,
  ig: string | null,
  twitter: string | null
}>(), {
  imdb: () => null,
  fb: () => null,
  ig: () => null,
  twitter: () => null
})
</script>

<style lang="scss" scoped>
div.socials{
  display:flex;
  justify-content:center;
  align-items:stretch;
  gap:10px;
  width:100%;
  height:42px;

  a.social-link{
    width:100%;
    border-radius:8px;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    i,img{font-size:1.4rem;transition:0.2s ease transform}
    &.tmdb{background:#032541;}
    &.instagram{background:linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);color:white;}
    &.twitter{background:#1DA1F2;color:white;}
    &.imdb{background:#F5C518;color:black}
    &.facebook{background:#4267B2;color:white;}
  }
}
</style>