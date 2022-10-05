<template>
  <section class="items-holder">
    <ItemPanel :placeholderData="{count:7,type:'person'}">
      <template #item>
        <Person v-for="person in people" :key="person.id" :name="person.name" :img="person.profile_path" :id="person.id" :knownFor="person['known_for']" />
        <NoResults v-if="people.length===0&&loaded" />
      </template>
    </ItemPanel>    
    <section v-if="people.length>0&&loaded" class="page-nav">
      <button :class="{'disabled':parseInt(currentPage)===1}" :disabled="parseInt(currentPage)===1" @click="navigatePages(parseInt(currentPage)-1)">
        <i class="fas fa-angle-left"></i>
      </button>
      <span>{{currentPage}}</span>
      <button :class="{'disabled':parseInt(currentPage)>=parseInt(totalPages)}" :disabled="parseInt(currentPage)>=parseInt(totalPages)" @click="navigatePages(parseInt(currentPage)+1)">
        <i class="fas fa-angle-right"></i>
      </button>
    </section>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue';

import Person from '../../components/Search/Person.vue'
import ItemPanel from '../../components/Content/ItemPanel.vue'
import NoResults from '../../components/NoResults.vue'

import getData from '../../api/main.js'

const loaded = ref(false)
const people = ref([])
const currentPage = ref('')
const totalPages = ref('')

const route = useRoute()
const router = useRouter()

const fetchData = async (query, page) => {
  try {
    const data = await getData({ endpoint: `/search/person?query=${query}&page=${page}` })

    totalPages.value = data['total_pages']
    currentPage.value = data['page']
    people.value = data.results.filter(person => person.profile_path!==null)
    
    loaded.value = true
  } catch (error) { router.push({ name: 'NotFound' }) }
}

const navigatePages = page => {
  router.push({
    path: '/search/person',
    query: {
      q: route.query.q,
      page: page
    }
  })
}

onBeforeMount(() => { fetchData(route.query.q, route.query.page) })
</script>

<style lang="scss" scoped>
section.items-holder{
  display:flex;
  flex-direction:column;
  gap:20px
}
section.page-nav{
  display:flex;
  justify-content:center;
  align-items:center;
  span{
    display:inline-block;
    width:40px;
    font-size:1.25rem;
    text-align:center;
    font-weight:900;
  }
  button{
    display:flex;
    justify-content:center;
    align-items:center;
    background:var(--card-color);
    width:40px;
    height:30px;
    border-radius:8px;
    &.disabled{
      background:none;
      cursor:default;
      opacity:0.5;
    }
  }
}
@media screen and (max-width: 600px){
  section.items-holder{gap:var(--container-padding)!important}
}
</style>