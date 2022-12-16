<template>
  <section v-if="props.items?.length !== 0" class="items">
    <component v-if="props.items === null" v-for="n in props.placeholderData.count" :key="n" :is="props.type === 'person' ? PersonPlaceholder : TitlePlaceholder" />
    <template v-if="props.type === 'person'">
      <Person v-for="person in (items as PersonSearchType[])" :key="person.id" :person="{
        profile_path: person.profile_path,
        name: person.name,
        known_for: person.known_for,
        id: person.id
      }" />
    </template>
    <template v-else>
      <Title v-for="title in (items as TitleType[])" :key="title.id" :title="{
        media_type: title.media_type,
        id: title.id,
        poster_path: title.poster_path || undefined,
        title: title.media_type === 'movie' ? title.title : title.name,
        release_date: title.media_type === 'movie' ? title.release_date : title.first_air_date,
        vote_average: title.vote_average,
        overview: title.overview,
        backdrop_path: title.backdrop_path || undefined
      }"/>
    </template>
  </section>
  </template>

<script setup lang="ts">
import Title from '../Search/Title.vue'
import Person from '../Search/Person.vue'

import TitlePlaceholder from '../Placeholders/TitlePlaceholder.vue'
import PersonPlaceholder from '../Placeholders/PersonPlaceholder.vue'
import { Title as TitleType } from '../../types/title'
import { PersonSearchType } from '../../types/person'



const props = defineProps<{
  type: 'title' | 'person'
  placeholderData: {
    count: number
  }
  items: Array<TitleType | PersonSearchType> | null
}>()

</script>

<style lang="scss" scoped>
section.items{
  display:grid;
  grid-template-columns:repeat(auto-fill, minmax(320px, 1fr));
  gap:1rem;
}
@media screen and (max-width: 600px){
  section.items{ gap:var(--container-padding)!important }
}
</style>