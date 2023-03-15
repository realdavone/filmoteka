<template>
  <router-link tabindex="0" class="person-result" :to="`/person/${person.id}`">
    <div class="img-holder">
      <img v-if="person.profile_path" :src="`https://www.themoviedb.org/t/p/w90_and_h90_face${person.profile_path}`" :alt="person.name" loading="lazy" draggable="false">
    </div>
    <div class="name-holder">
      <span class="name" v-font:medium>{{person.name}}</span>
      <div class="titles">
        <span
          v-font:small
          v-for="title in person.known_for"
          :key="title.id"
          class="bullet-after"
        >{{ title.media_type === 'movie' ? title.title : title.name }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
const { person } = defineProps<{
  person: {
    profile_path: string | null
    name: string
    known_for: Array<any>
    id: string | number
  }
}>()
</script>

<style lang="scss" scoped>
  a.person-result{
    display:flex;
    width:100%;
    align-items:center;
    background:var(--card-color);
    border-radius:8px;
    user-select:none;
    gap:15px;
    transition:0.2s ease background;
    overflow:hidden;
    div.img-holder{
      height:65px;
      min-width:65px;
      background-color:var(--card-color-hover);
      img{
        height:100%;
        width:100%;
        object-fit:cover;
      }
    }
    div.name-holder{
      padding-right:20px;
      span.name{
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
        font-weight:bold;
      }
    }
    div.titles{
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      color:var(--secondary-text-color);
    }
    &:hover{background:var(--card-color-hover);}
  }
</style>