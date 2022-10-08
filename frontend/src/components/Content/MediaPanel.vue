<template>
  <section v-if="props.items.length!==0" class="container media-panel user-select-none">
    <Title style="align-self:flex-start;margin-bottom:0;">Média</Title>
    <a v-for="item in props.items" :key="item.key" :href="`https://www.youtube.com/watch?v=${item.key}`" target="_blank">
      <span>&#9654;</span>
      <span><b>{{item.name}}</b> (YouTube)</span>
    </a>
  </section>
</template>

<script setup>
import Title from './Title.vue'
const props = defineProps({
  items: Array,
  type: String,
  title: String,
})

</script>

<style lang="scss" scoped>
section.media-panel{
  background-color:var(--card-color);
  display:flex;
  flex-direction:column;
  gap:1rem;
  padding-top:1rem;
  padding-bottom:1rem;
  align-items:center;
  a{
    cursor:pointer;
    display:flex;
    align-items:center;
    gap:10px;
    background-color:var(--card-color-hover);
    padding:5px 10px;
    border-radius:6px;
    span:nth-child(1){ color:var(--theme-color) }
  }
}
@media screen and (max-width: 600px) {
  a{ font-size:0.75rem }
}
</style>