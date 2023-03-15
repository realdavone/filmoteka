<template>
  <div class="socials">
    <a v-if="socials.facebook_id" :href="`https://www.themoviedb.org/person/${socials.facebook_id}`" class="social-link tmdb" target="_blank">
      <img src="../../assets/tmdb.svg" height="18" alt="TMDB">
    </a>
    <a v-if="socials.imdb_id" class="social-link imdb" :href="`https://www.imdb.com/name/${socials.imdb_id}`"  target="_blank" title="IMDB">
      <img src="../../assets/imdb.svg" height="18" alt="IMDB">
    </a>
    <a v-if="socials.facebook_id" class="social-link facebook" :href="`https://www.facebook.com/${socials.facebook_id}`" target="_blank" title="Facebook">
      <i v-font:medium class="fa-brands fa-facebook-f"></i>
    </a>
    <a v-if="socials.instagram_id" class="social-link instagram" :href="`https://www.instagram.com/${socials.instagram_id}`" target="_blank" title="Instagram">
      <i v-font:medium class="fa-brands fa-instagram"></i>
    </a>
    <a v-if="socials.twitter_id" class="social-link twitter" :href="`https://twitter.com/${socials.twitter_id}`" target="_blank" title="Twitter">
      <i v-font:medium class="fa-brands fa-twitter"></i>
    </a>
  </div>
</template>

<script setup lang="ts">
import { Person } from '../../types/person'

const { socials } = defineProps<{ socials: Pick<Person, 'external_ids'>['external_ids'] }>()
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
    i,img{transition:0.2s ease transform}
    &.tmdb{background:#032541;}
    &.instagram{background:linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%);color:white;}
    &.twitter{background:#1DA1F2;color:white;}
    &.imdb{background:#F5C518;color:black}
    &.facebook{background:#4267B2;color:white;}
  }
}
</style>