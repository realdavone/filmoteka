<template>
  <div class="avatar" :style="`width:${width ?? '20px'}`">
    <img class="avatar" :src="`https://avatars.dicebear.com/api/identicon/${id}.svg?r=50`" alt="Avatar" draggable="false" />
  </div>
</template>

<script setup lang="ts">
const { id, width } = defineProps<{
  id: string
  width?: string
}>()
</script>

<style scoped lang="scss">
div.avatar{
  display:inline-block;
  border-radius:50%;
  background-color:white;
  padding:3px;
  aspect-ratio:1;
  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }
}
</style>