<template>
  <section class="items-holder">
    <ItemPanel
    :type="route.matched[1].meta.type === 'person' ? 'person' : 'title'"
    :placeholderData="{ count: 4 }"
    :items="items"
    />
    <PageControl v-if="items?.length !== 0 || items !== null" @navigate="navigate" :pages="{ current: currentPage, total: totalPages }"/>
    <NoResults v-if="loaded && !items?.length" />
  </section>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount, ref } from 'vue'

import NoResults from '../../components/NoResults.vue'
import ItemPanel from '../../components/Content/ItemPanel.vue'
import PageControl from '../../components/PageControl.vue'

import getData from '../../api/main'

import { ApiListResponse } from '../../types/response'
import { Title as TitleType } from '../../types/title'
import { PersonSearchType } from '../../types/person'

const loaded = ref(false)
const items = ref<TitleType[] | PersonSearchType[] | null>(null)
const currentPage = ref<number>(1)
const totalPages = ref<number>(1)

const route = useRoute()
const router = useRouter()

const fetchData = async (type: 'movie' | 'tv' | 'person', query: string, page: string) => {
  try {
    const data = await getData<ApiListResponse<TitleType[] | PersonSearchType[]>>({ endpoint: `/search/${type}?query=${query}&page=${page}` })

    let mappedData = data.results.map(item => {
      return {
        ...item,
        media_type: route.matched[1].meta.type
      }
    })

    totalPages.value = data.total_pages
    currentPage.value = data.page

    items.value = mappedData as []

    loaded.value = true
  } catch (error) { router.push({ name: 'NotFound' }) }
}

const navigate = (page: string) => { router.push({ path: `/search/${route.matched[1].meta.type}`, query: { ...route.query, page } }) }

onBeforeMount(() => { fetchData(route.matched[1].meta.type as 'movie' | 'tv' | 'person', route.query.q as string, route.query.page as string) })
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