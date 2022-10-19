<template>
  <section class="items-holder">
    <ItemPanel :placeholderData="{count:7,type:'person'}">
      <template #item>
        <Person v-for="person in people" :key="person.id" :name="person.name" :img="person.profile_path" :id="person.id" :knownFor="person['known_for']" />
        <NoResults v-if="people.length===0&&loaded" />
      </template>
    </ItemPanel>    
    <PageControl v-if="people.length !== 0" @navigate="navigate" :pages="{ current: currentPage, total: totalPages }"/>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue';

import Person from '../../components/Search/Person.vue'
import ItemPanel from '../../components/Content/ItemPanel.vue'
import NoResults from '../../components/NoResults.vue'
import PageControl from '../../components/PageControl.vue'

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

const navigate = pageNumber => { router.push({ path: '/search/person', query: { ...route.query, page: pageNumber } }) }

onBeforeMount(() => { fetchData(route.query.q, route.query.page) })
</script>

<style lang="scss" scoped>
section.items-holder{
  display:flex;
  flex-direction:column;
  gap:20px
}
@media screen and (max-width: 600px){
  section.items-holder{gap:var(--container-padding)!important}
}
</style>