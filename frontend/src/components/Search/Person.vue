<template>
  <router-link class="person-result" :to="`/person/${person.id}`">
    <div class="img-holder">
      <img v-if="person.profile_path" :src="`https://www.themoviedb.org/t/p/w90_and_h90_face${person.profile_path}`" :alt="person.name" loading="lazy" draggable="false">
    </div>
    <div class="name-holder">
      <span class="name">{{person.name}}</span>
      <div class="titles">
        <span v-for="title in person['known_for']" :key="title.id" class="bullet-after">{{ title.title || title.name }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
const { person } = defineProps({ person: Object })
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
      font-size:0.9rem;
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
      span{font-size:0.75rem;}
    }
    &:hover{background:var(--card-color-hover);}
  }
</style>