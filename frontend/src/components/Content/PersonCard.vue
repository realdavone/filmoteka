<template>
  <router-link :to="`/person/${person.id}`" class="cast-card">
    <div class="img">
      <img :src="`https://www.themoviedb.org/t/p/w300_and_h300_face${person.profile_path}`" :alt="person.name" draggable="false">
    </div>
    <div class="name-holder">
      <span v-font:medium class="name">{{ person.name }}</span>
      <span v-font:small class="character">{{ person.character }}</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
const { person } = defineProps<{
  person: {
    character: string
    id: number
    name: string
    profile_path: string
  }
}>()
</script>

<style lang="scss" scoped>
a.cast-card{
  user-select: none;
  display:flex;
  gap:1rem;
  flex-direction:row;
  align-items:center;
  padding-right:1rem;
  border-radius:100px;
  transition:0.2s ease background-color;
  overflow:hidden;
  div.img{
    background:var(--card-color);
    height:70px;
    min-height:70px;
    width:70px;
    min-width:70px;
    border-radius:50%;
    overflow:hidden;
    
    img{
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }
  div.name-holder{
    display:flex;
    flex-direction:column;
    gap:0.25rem;
    span{
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height:1.1;
      &.name{ 
        font-weight:bold;
      }
      &.character{
        color:var(--secondary-text-color)
      }
    }
  }
  &:hover{ background-color:var(--card-color) }
}
@media screen and (max-width: 600px){
  a.cast-card:hover { background-color:initial!important }
}
</style>