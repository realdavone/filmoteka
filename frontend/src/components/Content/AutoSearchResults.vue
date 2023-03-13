<template>
  <slot :movies="props.movies" :tvs="props.tvs" :people="props.people" :recent="props.recent"></slot>    
</template>

<script setup lang="ts">
import { TvTitle, MovieTitle } from '../../types/title'
import { PersonSearchType } from '../../types/person'

const props = defineProps<{
  movies: Array<MovieTitle> | null
  tvs: Array<TvTitle> | null
  people: Array<PersonSearchType> | null
  recent: Array<any>
}>()
</script>