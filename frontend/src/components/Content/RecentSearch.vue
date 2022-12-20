<template>
  <div class="recent-menu" @mousedown.prevent="null">
    <div class="no-history" v-if="store.state.recentSearch.length === 0">História vyhľadávania je prázdna</div>
    <div class="history" v-else>
      <div class="items">
        <div v-for="(item, index) in store.state.recentSearch" :key="index" class="item">
          <span @click.prevent="emit('handleRecentItem', item)">{{item}}</span>
          <button
          @click.prevent="store.methods.recentSearch.removeItem(item)">
          &times;</button>
        </div>
      </div>
      <button class="clear-history" @click="store.methods.recentSearch.clear()">Zmazať históriu</button>
    </div>
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
div.recent-menu{
  padding:0.75rem 1rem;
  div.no-history{
    text-align:center;
    font-size:0.75rem;
    opacity:0.5;
  }
  div.history{
    display:flex;
    flex-direction:column;
    gap:0.5rem;
  }
  button.clear-history{
    border-radius:0.25rem;
    font-size:0.75rem;
    align-self:flex-end;
    color:crimson;
    &:hover{
      text-decoration:underline;
    }
  }
  div.items{
    display:flex;
    flex-wrap:wrap;
    justify-content:center;
    gap:0.75rem;
  }
  div.item{
    background:var(--card-color-hover);
    padding:0.25rem 0.5rem;
    border-radius:0.5rem;
    font-size:0.75rem;
    display:flex;
    gap:0.5rem;
    align-items:center;
    cursor:pointer;
    span{
      font-size:0.75rem;
    }
    button{
      color:crimson
    }
  }
}
</style>