<template>
  <div class="avatar">
    <img class="avatar" :src="`https://avatars.dicebear.com/api/identicon/${id}.svg?r=50`" alt="Avatar" draggable="false" />
  </div>
</template>

<script setup lang="ts">
const { id } = defineProps<{
  id: string
}>()
</script>

<style scoped lang="scss">
div.avatar{
  display:inline-block;
  border-radius:50%;
  background-color:white;
  padding:3px;
  width:20px;
  aspect-ratio:1;
  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }
}
</style>