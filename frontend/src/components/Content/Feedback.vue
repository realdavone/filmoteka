<template>
  <div class="rating">
    <button @click="handleFeedback('like')" title="Páči sa mi">
      <span v-if="likes.includes(store.state.credentials.user._id)" class="material-icons" style="color:crimson">favorite</span>
      <span v-else class="material-icons">favorite_border</span>
      <span>{{likes.length}}</span>
    </button>
    <button @click="handleFeedback('dislike')" title="Nepáči sa mi">
      <span v-if="dislikes.includes(store.state.credentials.user._id)" class="material-icons" style="color:crimson">heart_broken</span>
      <span v-else class="material-icons-outlined">heart_broken</span>
      <span>{{dislikes.length}}</span>
    </button>
  </div>
</template>

<script setup>
import { inject, ref } from 'vue'
import getData from '../../api/main.js'

const store = inject('store')

const { state, title } = defineProps({ state: Object, title: Object })

const likes = ref(state.likes)
const dislikes = ref(state.dislikes)

const handleFeedback = async action => {
  const data = await getData({
    endpoint: `/title/rate`,
    options: {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken },
      body: JSON.stringify({ ...title, action })
    }
  })
  if(data.success){
    switch(action){
      case 'like': {
        if(likes.value.includes(store.state.credentials.user?._id)) likes.value = likes.value.filter(like => like !== store.state.credentials.user._id)
        else likes.value.push(store.state.credentials.user._id)
        dislikes.value = dislikes.value.filter(dislike => dislike !== store.state.credentials.user._id)
        break
      }
      case 'dislike': {
        if(dislikes.value.includes(store.state.credentials.user?._id)) dislikes.value = dislikes.value.filter(dislike => dislike !== store.state.credentials.user._id)
        else dislikes.value.push(store.state.credentials.user._id)
        likes.value = likes.value.filter(like => like !== store.state.credentials.user._id)
        break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.rating{
  display:flex;
  gap:1rem;
  align-items:center;
  button{
    display:flex;
    align-items:center;
    gap:0.5rem;
    span:first-of-type{ font-size:2rem; }
    span:last-of-type{
      font-family:monospace,'Roboto Mono';
      font-size:1rem;
    }
  }
}
</style>