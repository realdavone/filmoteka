<template>
  <main>
    <section class="wrapper user-select-none">
      <section class="container collection-holder">
        <div class="img-details">
          <div class="img">
            <img v-if=" collection.poster" :src="`https://www.themoviedb.org/t/p/w300_and_h450_bestv2${collection.poster}`" alt="Plagát kolekcie">
          </div>
          <div class="details">
            <span v-if="collection.title" class="heading">{{collection.title}}</span>
            <div v-else class="skeleton" style="height:1.5rem;width:50%"></div>
            <p v-if="collection.overview">{{collection.overview}}</p>
            <div v-else v-for="i in 2" :key="i" class="skeleton" :style="`height:1rem;width:${100 - 10 * (i - 1)}%`"></div>
          </div>
        </div>
        <section class="titles-holder">
          <Heading>Filmy</Heading>
          <ItemPanel :placeholderData="{ count: 2, type: 'title' }">
            <template #item>
              <Title v-for="movie in collection.titles" :key="movie.id" :title="{ ...movie, type: 'movie' }" />          
            </template>
          </ItemPanel>
        </section>
      </section>
    </section>
  </main>
</template>

<script setup>
import { onBeforeMount, reactive, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import _ from '../utils/main.js'

import Title from '../components/Search/Title.vue'
import Heading from '../components/Content/Title.vue'
import ItemPanel from '../components/Content/ItemPanel.vue'

import getData from '../api/main.js'

const route = useRoute()
const router = useRouter()
const collection = reactive({ title: null, overview: null, titles: [], poster: null })

const fetchData = async(id) => {
  try {
    const data = await getData({ endpoint: `/collection/${id}` })

    const translations = _.getTranslations(data['translations']['translations'])

    collection.title = translations.length > 0 && translations[0]['data']['title'] !== '' ? translations[0]['data']['title'] : data.name
    collection.overview = translations.length > 0 && translations[0]['data']['overview'] !== '' ? translations[0]['data']['overview'] : data.overview
    collection.titles = data.parts
    collection.poster = data.poster_path

    console.log(data)
  } catch (error) { router.push({ name: 'NotFound' }) }
  
  document.title=`${collection.title} / Filmotéka`
}

onBeforeMount(() => { fetchData(route.params.id) })
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
  div.skeleton{
    background-color:var(--font-color);
    border-radius:6px;
  }
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
      border-radius:1rem;
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
        font-size:1.5rem;
        font-weight:900;
      }
      p{ font-size:0.85rem!important }
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