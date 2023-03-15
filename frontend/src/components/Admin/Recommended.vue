<template>
  <section class="recommended">
    <div v-for="item in recommended" :key="item._id" class="item">
      <img :src="`https://www.themoviedb.org/t/p/w300${item.title.img}`" :alt="item.title.savedTitle">
      <span class="timestamp" v-font:small>{{ useRelativeTimeDifference(item.createdAt) }}</span>
      <button class="remove-button" @click="removeItem(item._id)">Zmazať</button>
    </div>
  </section>
  <p v-if="!recommended.length" v-font:medium>Žiadne odporúčane</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import getData from '../../api/main'
import store from '../../store/index'
import useRelativeTimeDifference from '../../composables/relative-time-difference'

import { RecommendedTitle } from '../../types/title'

const recommended = ref<Array<RecommendedTitle>>([])

recommended.value = await getData<Array<RecommendedTitle>>({ endpoint: '/title/recommended' })

const removeItem = async (id: string) => {
  const data = await getData<{ success: boolean }>({ endpoint: '/title/recommend', options: {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
    body: JSON.stringify({ id })
  } })

  if(data.success) recommended.value = recommended.value.filter(title => title._id !== id)
}
</script>

<style scoped lang="scss">
section.recommended{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(100px, 1fr));
  gap:15px;
  width:100%;
}
div.item{
  display:flex;
  align-items:stretch;
  flex-direction:column;
  gap:5px;
  img{
    width:100%;
    aspect-ratio:2/3;
    object-fit:cover;
    border-radius:6px;
  }
  span.timestamp{
    text-align:center;
  }
  button.remove-button{
    color:crimson;
    font-weight:700;
  }
}
</style>