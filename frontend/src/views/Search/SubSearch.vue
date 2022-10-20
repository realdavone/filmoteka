<template>
  <section class="items-holder">
    <ItemPanel :placeholderData="{count:4,type:'title'}">
      <template #item>
        <template v-if="route.matched[1].props.default.type === 'person'">
          <Person v-for="item in items" :key="item.id" :person="{...item}" />
        </template>
        <template v-else>
          <Title v-for="item in items" :key="item.id" :title="{...item, type: route.matched[1].props.default.type}" />    
        </template>
        <NoResults v-if="items.length === 0 && loaded"/>
      </template>
    </ItemPanel>
    <PageControl v-if="items.length !== 0" @navigate="navigate" :pages="{ current: currentPage, total: totalPages }"/>
  </section>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue';

import Title from '../../components/Search/Title.vue'
import Person from '../../components/Search/Person.vue'
import ItemPanel from '../../components/Content/ItemPanel.vue'
import NoResults from '../../components/NoResults.vue'
import PageControl from '../../components/PageControl.vue'

import getData from '../../api/main.js'

const loaded = ref(false)
const items = ref([])
const currentPage = ref('')
const totalPages = ref('')

const route = useRoute()
const router = useRouter()

const fetchData = async (type, query, page) => {
  try {
    const data = await getData({ endpoint: `/search/${type}?query=${query}&page=${page}` })

    totalPages.value = data['total_pages']
    currentPage.value = data['page']
    items.value = data.results.filter(movie => movie.poster_path !== null)

    loaded.value = true
  } catch (error) { router.push({ name: 'NotFound' }) }
}

const navigate = pageNumber => { router.push({ path: `/search/${route.matched[1].props.default.type}`, query: { ...route.query, page: pageNumber } }) }

onBeforeMount(() => { fetchData(route.matched[1].props.default.type, route.query.q, route.query.page) })
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