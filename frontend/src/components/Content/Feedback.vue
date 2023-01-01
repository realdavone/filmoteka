<template>
  <div class="rating">
    <button @click="handleFeedback('like')" title="Páči sa mi">
      <span v-if="likesCount.includes(store.state.credentials.user._id)" class="material-icons" style="color:crimson">favorite</span>
      <span v-else class="material-icons">favorite_border</span>
      <span>{{likesCount.length}}</span>
    </button>
    <button @click="handleFeedback('dislike')" title="Nepáči sa mi">
      <span v-if="dislikesCount.includes(store.state.credentials.user._id)" class="material-icons" style="color:seagreen">heart_broken</span>
      <span v-else class="material-icons-outlined">heart_broken</span>
      <span>{{dislikesCount.length}}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import getData from '../../api/main.js'

const store = inject<any>('store')

const { likes, dislikes, title } = defineProps<{
  likes?: Array<string>,
  dislikes?: Array<string>
  title: {
    id: string,
    type: 'tv' | 'movie'
  }
}>()

const likesCount = ref(likes || [])
const dislikesCount = ref(dislikes || [])

const handleFeedback = async (action: 'like' | 'dislike') => {
  const data = await getData<{ success: true } | { success: false, message: string }>({
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
        if(likesCount.value.includes(store.state.credentials.user?._id)) likesCount.value = likesCount.value.filter(like => like !== store.state.credentials.user._id)
        else likesCount.value.push(store.state.credentials.user._id)
        dislikesCount.value = dislikesCount.value.filter(dislike => dislike !== store.state.credentials.user._id)
        break
      }
      case 'dislike': {
        if(dislikesCount.value.includes(store.state.credentials.user?._id)) dislikesCount.value = dislikesCount.value.filter(dislike => dislike !== store.state.credentials.user._id)
        else dislikesCount.value.push(store.state.credentials.user._id)
        likesCount.value = likesCount.value.filter(like => like !== store.state.credentials.user._id)
        break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.rating{
  display:flex;
  align-items:center;
  overflow:hidden;
  max-width:100px;
  button{
    display:flex;
    align-items:center;
    gap:0.35rem;
    padding:0.25rem 0.5rem;
    span:first-of-type{
      font-size:1.25rem;
      overflow:hidden;
    }
    span:last-of-type{
      font-size:0.75rem;
      font-weight:700;
    }
  }
}
</style>