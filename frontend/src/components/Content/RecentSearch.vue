<template>
  <div class="recent">
    <button v-for="(item, index) in store.state.recentSearch" :key="index" @click="$router.push(`/search?q=${item}`)">{{item}}</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const store = inject('store')
</script>

<style lang="scss" scoped>
div.recent{
  position:absolute;
  left:0;
  top:calc(100% + 1px);
  background:var(--card-color);
  width:100%;
  padding:0.5rem 1rem;
  font-size:0.75rem;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:0.75rem;
  border-radius:1rem;

  button{
    background:var(--card-color-hover);
    padding:0.25rem 0.5rem;
    border-radius:0.5rem;
    font-size:0.75rem;
  }
}
</style>