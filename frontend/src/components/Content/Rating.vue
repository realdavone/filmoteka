<template>
  <component :is="url ? 'a' : 'div'" :href="url && url" target="_blank" :class="`rating ${getCat(parseInt(rating))} ${size}`" v-if="rating">
    <span class="rating">{{isNaN(rating) ? rating : Math.floor(rating * 10) / 10}}</span>
    <span v-if="name" class="name">{{name}}</span>
  </component>
</template>

<script setup>
const { rating, name, url, size } = defineProps({ rating: Number | String, url: String, name: String, size: { type: String, default: 'normal' } })

const getCat = rating => {
  if(isNaN(rating) || rating === 0) return
  if(rating > 10) rating = rating / 10
  return parseFloat(rating) < 2.5 ? 'low' : parseFloat(rating) < 7.0 ? 'medium' : 'high'
}
</script>

<style lang="scss" scoped>
div.rating, a.rating{
  --width:2.75rem;
  --borderWidth:0.25rem;
  --fontSizeRating:0.85rem;
  --fontSizeName:0.65rem;

  background-color:var(--card-color);
  aspect-ratio:1;
  display:flex;
  justify-content:center;
  align-items:center;
  border-radius:50%;
  position:relative;
  font-family:monospace, 'Roboto Mono';
  line-height:1;
  border-style:solid;
  min-width:var(--width);
  border-width:var(--borderWidth);
  span.rating{
    font-size:var(--fontSizeRating);
    font-weight:700;
  }
  span.name{
    position:absolute;
    top:calc(100% + 0.5rem);
    text-align:center;
    font-size:var(--fontSizeName);
  }
  &.small{
    --width:1.75rem;
    --borderWidth:0.15rem;
    --fontSizeRating:0.55rem;
    --fontSizeName:0.5rem;
  }
  &.large{
    --width:3.25rem;
    --borderWidth:0.3rem;
    --fontSizeRating:0.95rem;
    --fontSizeName:0.75rem;
  }
  &.low{border-color:crimson}
  &.medium{border-color:goldenrod}
  &.high{border-color:green}
}
</style>