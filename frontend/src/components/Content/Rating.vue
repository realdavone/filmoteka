<template>
  <component
  v-if="rating"
  :is="url ? 'a' : 'div'"
  :href="url && url"
  target="_blank"
  :class="`rating ${getCategory(rating)} ${size}`">
    <span class="rating">{{ parseRating(rating) }}</span>
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
  background-color: var(--card-color);
  aspect-ratio: 1;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: relative;
  line-height: 1;
  border-style: solid;
  min-width: var(--width);
  max-width: var(--width);
  border-width: var(--borderWidth);
  font-family: 'Roboto', sans-serif;
  outline: 3px solid var(--card-color);
  span.rating{
    font-size:var(--font-size-rating);
    font-weight:700;
    letter-spacing:1px;
  }
  &.normal{
    --width:30px;
    --borderWidth:2px;
    --font-size-rating:10px;
  }
  &.small{
    --width:30px;
    --borderWidth:2px;
    --font-size-rating:10px;
  }
  &.large{
    --width:50px;
    --borderWidth:4px;
    --font-size-rating:17px;
  }
  &.low{
    border-color:crimson
  }
  &.medium{
    border-color:goldenrod
  }
  &.high{
    border-color:darkgreen
  }
}
</style>