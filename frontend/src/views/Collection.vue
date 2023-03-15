<template>
  <main>
    <section class="wrapper user-select-none">
      <section class="container collection-holder">
        <div class="img-details">
          <div class="img">
            <Poster v-if=" collection.poster" :src="collection.poster" alt="Plagát kolekcie" :fadeInOnLoad="true" />
          </div>
          <div class="details">
            <span v-if="collection.title" class="heading" v-font:large>{{ collection.title }}</span>
            <div v-else class="skeleton-text" style="height:1.5rem;width:50%"></div>
            <p v-if="collection.overview" v-font:medium>{{collection.overview}}</p>
            <div v-else v-for="i in 2" :key="i" class="skeleton-text" :style="`height:1rem;width:${100 - 10 * (i - 1)}%`"></div>
          </div>
        </div>
        <section class="titles-holder">
          <ItemPanel type="title" :placeholderData="{ count: 2 }" :items="collection.titles" />
        </section>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import _ from '../utils/main'
import getData from '../api/main'

import ItemPanel from '../components/Content/ItemPanel.vue'
import Poster from '../components/Content/Poster.vue'

import { MovieTitle } from '../types/title'
import { Collection } from '../types/collection'
import { TitleTranslation } from '../types/translations'

const route = useRoute()
const router = useRouter()

const collection = reactive<{
  title: null | string
  overview: null | string
  titles: null | Array<MovieTitle>
  poster: null | string
}>({
  title: null,
  overview: null,
  titles: null,
  poster: null
})

const fetchData = async (id: string) => {
  try {
    const data = await getData<Collection>({ endpoint: `/collection/${id}` })

    const translations = _.getTranslations<TitleTranslation>(data['translations']['translations'], 'iso_639_1', ['sk', 'cz', 'en'])
      
    collection.poster = data.poster_path
    collection.title = translations?.['data']?.['title'] || data.name
    collection.overview = translations?.['data']?.['overview'] || data.overview
    collection.titles = data.parts.map(title => {
      return { ...title, media_type: 'movie' }
    })

  } catch (error) { router.push({ name: 'NotFound' }) }
  
  document.title=`${collection.title} / Filmotéka`
}

onBeforeMount(() => { fetchData(route.params.id as string) })
onActivated(() => {
  if(collection.title !== null) document.title = `${collection.title} / Filmotéka`
})
</script>

<style lang="scss" scoped>
section.collection-holder{
  display:flex;
  gap:var(--container-padding);
  justify-content:space-between;
  align-items:flex-start;
  div.img-details{
    width:100%;
    max-width:800px;
    min-width:800px;
    display:flex;
    gap:var(--container-padding);
    align-items:stretch;
    div.img{
      background:var(--card-color);
      overflow:hidden;
      border-radius:15px;
      width:250px;
      aspect-ratio:2/3;
      img{
        width:100%;
        height:100%;
        object-fit:cover;
      }
    }
    div.details{
      width:100%;
      display:flex;
      flex-direction:column;
      gap:20px;
      span.heading{
        font-weight:900;
      }
    }
  }
  section.titles-holder{ width:100%; }
}
@media screen and (max-width: 1250px){
  div.img-details{min-width:600px!important;}
}
@media screen and (max-width: 1250px){
  section.collection-holder{
    flex-direction:column;
  }
  div.img-details{min-width:100%!important;}
}
@media screen and (max-width: 600px){
  section.collection-holder{gap:var(--container-padding)!important;}
  div.img-details{flex-direction:column;align-items:center!important;gap:var(--container-padding)!important;}
  section.titles{gap:var(--container-padding)!important;}
}
</style>