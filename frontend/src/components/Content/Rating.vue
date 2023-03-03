<template>
  <component
  v-if="rating"
  :is="url ? 'a' : 'div'"
  :href="url && url"
  target="_blank"
  :class="`rating ${getCategory(rating)} ${size}`">
    <span class="rating">{{ parseRating(rating) }}</span>
    <span v-if="name" class="name">{{ name }}</span>
  </component>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

type Category = 'low' | 'medium' | 'high'

const { rating, name, url, size } = withDefaults(defineProps<{
  rating: number | string
  name?: string
  url?: string
  size?: 'small' | 'normal' | 'large'
}>(), {
  size: () => 'normal'
})

const parseRating = (rating: number | string): number | 'N/A' => {
  if(typeof(rating) === 'string') rating = parseFloat(rating)

  return isNaN(rating) ? 'N/A' : Math.floor(rating * 10) / 10
}

const getCategory = (rating: number | string): Category | '' => {
  if(typeof(rating) === 'string') rating = parseFloat(rating)

  if(isNaN(rating) || rating === 0) return ''
  if(rating > 10) rating = rating / 10

  return rating < 2.5 ? 'low' : rating < 7.0 ? 'medium' : 'high'
}
</script>

<style lang="scss" scoped>
div.rating, a.rating{
  background-color:var(--card-color);
  aspect-ratio:1;
  display:inline-flex;
  justify-content:center;
  align-items:center;
  border-radius:50%;
  position:relative;
  line-height:1;
  border-style:solid;
  min-width:var(--width);
  max-width:var(--width);
  border-width:var(--borderWidth);
  font-family: 'Roboto', sans-serif;
  span.rating{
    font-size:var(--font-size-rating);
    font-weight:700;
    letter-spacing:1px;
  }
  span.name{
    position:absolute;
    top:calc(100% + 0.65rem);
    text-align:center;
    font-size:var(--font-size-name);
    line-height:1.1;
  }
  &.normal{
    --width:2.75rem;
    --borderWidth:0.25rem;
    --font-size-rating:0.7rem;
    --font-size-name:0.55rem;
  }
  &.small{
    --width:1.75rem;
    --borderWidth:0.15rem;
    --font-size-rating:0.55rem;
    --font-size-name:0.65rem;
  }
  &.large{
    --width:3.25rem;
    --borderWidth:0.3rem;
    --font-size-rating:0.95rem;
    --font-size-name:0.75rem;
  }
  &.low{border-color:crimson}
  &.medium{border-color:goldenrod}
  &.high{border-color:green}
}
</style>