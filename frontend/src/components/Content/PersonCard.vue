<template>
  <router-link :to="{ name: props.type[0].toUpperCase() + props.type.substring(1), params: { id: props.id } }" class="cast-card">
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

<script setup>
const props = defineProps({ type: String, id: Number })
</script>

<style lang="scss" scoped>
a.cast-card{
  user-select: none;
  display:flex;
  gap:15px;
  flex-direction:row;
  align-items:center;
  padding-right:5px;
  div.img{
    background:var(--card-color);
    height:80px;
    min-height:80px;
    width:80px;
    min-width:80px;
    border-radius:50%;
    overflow:hidden;
    :slotted(img){ width:100% }
  }
  div.name-holder{
    display:flex;
    flex-direction:column;
    gap:8px;
    span{
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      overflow: hidden;
      line-height:1.2;
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
}
</style>