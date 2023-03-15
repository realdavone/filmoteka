<template>
  <main class="wrapper container">
    <section class="inner-wrap">
      <section class="button-holder-outter">
        <div class="button-holder-inner">
          <button :class="{'active': $route.path.split('/')[2] === button.path}" v-for="(button, key) in categoryButtons" :key="key" @click="filterResults(button.path)">
            <span v-font:medium class="material-icons">{{button.icon}}</span>
            <span v-font:medium>{{key}}</span>
          </button>
        </div>
      </section>
      <section class="results-holder">
        <Title>Výsledky pre <span class="quotation-marks">{{route.query.q}}</span></Title>
        <router-view></router-view>
      </section>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onBeforeMount, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import Title from '../components/Content/Title.vue'

interface CategoryDetails {
  icon: string
  path: string
}
 
const categoryButtons: Record<'Filmy' | 'Seriály' | 'Osoby', CategoryDetails> = {
  Filmy: { icon: 'movie', path: 'movie' },
  Seriály: { icon: 'tv', path: 'tv' },
  Osoby: { icon: 'person', path: 'person' }
}

const store = inject<any>('store')
const route = useRoute()
const router = useRouter()

const filterResults = (category: CategoryDetails['path']) => { router.push({ path: `/search/${category}`, query: { q: route.query.q, page: 1 } }) }

onBeforeMount(() => {
  store.methods.recentSearch.pushItem(route.query.q)
  document.title = `${route.query.q} - Vyhľadávanie / Filmotéka`
})
</script>

<style lang="scss" scoped>
section.inner-wrap{
  display:flex;
  flex-direction:row-reverse;
  gap:20px;
  align-items:flex-start;
  section.button-holder-outter{
    width:300px;
    display:flex;
    flex-direction:column;
    gap:20px;
    div.button-holder-inner{
      display:flex;
      flex-direction:column;
      border-radius:8px;
      overflow:hidden;
      button{
        width:100%;
        background:var(--card-color);
        height:40px;
        transition:0.2s ease background;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:8px;
        &:hover{background:var(--card-color-hover);}
        &:last-of-type{border-bottom:none;}
      }
      button.active{
        background:var(--theme-color);
        color:white;
        font-weight:bold;
      }
    }
  }
  section.results-holder{ width:100% }
}

@media screen and (max-width: 1200px) {
  section.inner-wrap{
    flex-direction:column;
    section.button-holder-outter{
      width:100%;
      div.button-holder-inner{
        flex-direction:row;
        button{
          border-bottom:none;
          border-right:1px solid var(--secondary-color);
          &:last-of-type{
            border-right:none;
          }          
        }
      }
    }
  }
}
@media screen and (max-width: 600px){
  section.inner-wrap{gap:var(--container-padding)!important;}
  section.button-holder-outter{gap:var(--container-padding)!important}
}
</style>