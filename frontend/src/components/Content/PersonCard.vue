<template>
  <router-link :to="`/person/${props.id}`" class="cast-card">
    <div class="img">
      <slot name="image" />
    </div>
    <div class="name-holder">
      <span class="name">
        <slot name="name" />
      </span>
      <span class="character">
        <slot name="character"/>
      </span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
const props = defineProps<{type: string, id: number}>()
</script>

<style lang="scss" scoped>
a.cast-card{
  user-select: none;
  display:flex;
  gap:15px;
  flex-direction:row;
  align-items:center;
  padding-right:1rem;
  border-radius:100px;
  transition:0.2s ease background-color;
  overflow:hidden;
  div.img{
    background:var(--card-color);
    height:80px;
    min-height:80px;
    width:80px;
    min-width:80px;
    border-radius:50%;
    overflow:hidden;
    :slotted(img){
      width:100%;
      height:100%;
      object-fit:cover;
    }
  }
  div.name-holder{
    display:flex;
    flex-direction:column;
    gap:0.5rem;
    span{
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height:1.1;
      &.name{ 
        font-weight:bold;
        font-size:1rem;
      }
      &.character{
        font-size:0.75rem;
        color:var(--secondary-text-color)
      }
    }
  }
  &:hover{ background-color:var(--card-color-hover) }
}
@media screen and (max-width: 600px){
  a.cast-card:hover { background-color:initial!important }
}
</style>