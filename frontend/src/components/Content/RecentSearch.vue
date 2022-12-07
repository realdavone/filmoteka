<template>
  <div class="recent">
    <button v-for="(item, index) in store.state.recentSearch" :key="index" @click="emit('handleRecentItem', item)">{{item}}</button>
    <span v-if="store.state.recentSearch.length === 0">História vyhľadávania je prázdna</span>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

const store = inject<any>('store')

const emit = defineEmits<{
  (e: "handleRecentItem", item: string): void
}>()
</script>

<style lang="scss" scoped>
div.recent{
  position:absolute;
  left:0;
  top:calc(100% + 1px);
  background:var(--card-color);
  width:100%;
  padding:0.75rem 1rem;
  font-size:0.75rem;
  display:flex;
  flex-wrap:wrap;
  justify-content:center;
  gap:0.75rem;
  border-bottom-left-radius:1.75rem;
  border-bottom-right-radius:1.75rem;
  button{
    background:var(--card-color-hover);
    padding:0.25rem 0.5rem;
    border-radius:0.5rem;
    font-size:0.75rem;
  }
}
</style>