<template>
  <div class="rating">
    <button @click="handleFeedback('like')" title="Páči sa mi">
      <span
      v-bind="{
        class: 'material-icons',
        ...(likesCount.includes(authStore.user!._id) && {
          style: { color: 'crimson' }
        })
      }"
      :data-count="likesCount.length"
      >favorite</span>
    </button>
    <button @click="handleFeedback('dislike')" title="Nepáči sa mi">
      <span
      v-bind="{
        class: 'material-icons',
        ...(dislikesCount.includes(authStore.user!._id) && {
          style: { color: 'seagreen' }
        })
      }"
      :data-count="dislikesCount.length"
      >heart_broken</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import getData from '../../api/main.js'
import { useAuthStore } from '../../store/auth';

const authStore = useAuthStore()

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
      headers: { 'Content-Type': 'application/json', 'access-token': authStore.accessToken },
      body: JSON.stringify({ ...title, action })
    }
  })
  if(data.success){
    switch(action){
      case 'like': {
        if(likesCount.value.includes(authStore.user!?._id)) likesCount.value = likesCount.value.filter(like => like !== authStore.user!._id)
        else likesCount.value.push(authStore.user!._id)
        dislikesCount.value = dislikesCount.value.filter(dislike => dislike !== authStore.user!._id)
        break
      }
      case 'dislike': {
        if(dislikesCount.value.includes(authStore.user!?._id)) dislikesCount.value = dislikesCount.value.filter(dislike => dislike !== authStore.user!._id)
        else dislikesCount.value.push(authStore.user!._id)
        likesCount.value = likesCount.value.filter(like => like !== authStore.user!._id)
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
    gap:6px;
    padding:4px 6px;
    
    span {
      &[data-count]::after{
        content: attr(data-count);
        font-family: 'Roboto', sans-serif;
        font-size: 12px;
        font-weight: 700;
        color: var(--font-color);
      }
    }
  }
}
</style>