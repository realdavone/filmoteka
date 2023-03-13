<template>
  <div class="search-result">
    <div class="poster-holder">
      <img v-if="img" :src="`https://image.tmdb.org/t/p/w92${img}`" :alt="label" loading="lazy">
      <span v-else class="material-icons-outlined" style="font-size: 1rem;">history</span>
    </div>
    <span class="label">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  img?: string | null
  label: string
}>()
</script>

<style lang="scss" scoped>
div.search-result{
  display: flex;
  align-items: center;
  padding:5px 10px;
  gap:10px;
  cursor: pointer;

  div.poster-holder{
    width: 30px;
    height: 30px;
    border-radius: 0.25rem;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img{
      width:100%;
      height: 100%;
      object-fit: cover;
    }
  }

  span.label{
    font-size: 0.8rem;
  }

  &:hover{
    background-color: var(--card-color-hover);
  }
}
</style>