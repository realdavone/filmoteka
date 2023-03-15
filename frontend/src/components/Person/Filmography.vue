<template>
  <section class="filmography user-select-none">
    <table v-if="titles.length" class="filmography" v-font:medium>
      <tr v-for="(title, index) in titles" :key="index">
        <td class="year">
          <span v-if="title.media_type === 'movie' ? title.release_date : title.first_air_date">
            {{new Date(title.media_type === 'movie' ? title.release_date : title.first_air_date).getFullYear()}}
          </span>
          <span v-else>&mdash;</span>
        </td>
        <td class="watched">
          <div v-if="store.methods.watched.exists({ type: props.filter.type, id: title.id.toString() })">
            <span class="material-icons" style="color:var(--theme-color)">visibility</span>
          </div> 
        </td>
        <td class="title">
          <router-link :to="`/${title.media_type}/${title.id}`">
            <b>{{title.media_type === 'movie' ? title.title : title.name}}</b>
            <span>
              <span v-if="title.media_type === 'movie' ? title.job_type : title.job_type">
                <i class="as">ako</i>
              </span>
              <b style="color:var(--theme-color)">{{title.job_type === 'cast' ? title.character : title.job}}</b>
            </span>
          </router-link>
        </td>
      </tr>
    </table>
    <span v-else v-font:medium >V tejto kategórii nič nie je</span>
  </section>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue'

import { MovieCastItem, MovieCrewItem, TvCastItem, TvCrewItem } from '../../types/person'

type MovieCastItemType = MovieCastItem & { job_type: 'cast' } & { media_type: 'movie' }
type MovieCrewItemType = MovieCrewItem & { job_type: 'crew' } & { media_type: 'movie' }

type TvCastItemType = TvCastItem & { job_type: 'cast' } & { media_type: 'tv' }
type TvCrewItemType = TvCrewItem & { job_type: 'crew' } & { media_type: 'tv' }

type MovieItem = MovieCastItemType | MovieCrewItemType
type TvItem = TvCastItemType | TvCrewItemType


type Title = MovieItem | TvItem

const store = inject<any>('store')

const props = defineProps<{
  items: Array<Title>
  filter: {
    type: 'movie' | 'tv'
    role: 'cast' | 'crew'
  }
}>()

const sortByDate = (a: Title, b: Title): number => {
  if(a.media_type === 'movie' && b.media_type === 'movie') return new Date(b.release_date).valueOf() - new Date(a.release_date).valueOf()
  if(a.media_type === 'tv' && b.media_type === 'tv') return new Date(b.first_air_date).valueOf() - new Date(a.first_air_date).valueOf()
  return 0
}

const titles = computed<Array<Title>>(() => {
  const titles = props.items.filter(title => title.media_type === props.filter.type && title.job_type === props.filter.role)

  return [
    ...titles
      .filter(title => title.media_type === 'tv' && title.first_air_date === "" || title.media_type === 'movie' && title.release_date === ""),
    ...titles
      .filter(title => title.media_type === 'tv' && title.first_air_date !== "" || title.media_type === 'movie' && title.release_date !== "")
      .sort(sortByDate)
  ]
})
</script>

<style lang="scss" scoped>
section.filmography{
  width:100%;
  margin-top:10px;
  table.filmography{
    width:100%;
    border-collapse:collapse;
    tr{
      td{
        padding:4px 0;
        vertical-align:top;
        &.year{
          width:40px;
          text-align:center;
        }
        &.watched{
          width:28px;
          text-align:center;
          color:var(--theme-color-transparent)
        }
        &.title{
          padding-right:8px;
          padding-left:8px; 
        }
      }
      &:last-child{border-bottom:none;}
    }
  }
  div.title{padding-bottom:5px;}
  i.as{
    display:inline-block;
    margin:0 8px;
    color:var(--alternative-color);
  }
}
section.filmography:last-child{margin-bottom:0;}
</style>