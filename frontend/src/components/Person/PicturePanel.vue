<template>
  <main>
    <Title>Fotografie</Title>
    <section class="imgs-holder">
      <img v-for="(img, index) in props.imgs" :key="index" :src="`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${img.file_path}`" :alt="`Fotorgrafie #${index + 1}`">
    </section>
  </main>
</template>

<script setup>
import Title from '../Content/Title.vue'

const props = defineProps({ imgs: Array })
</script>

<style lang="scss" scoped>
main{
  section.imgs-holder{
    display:grid;
    grid-template-columns:repeat(auto-fill, minmax(130px, 1fr));
    gap:1rem;
    img{
      width:100%;
      border-radius:5px;
      aspect-ratio:2/3;
      transition:0.4s ease transform;
      &:hover{
        transform:scale(1.1)
      }
    }
  }
}
</style>