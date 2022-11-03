<template>
  <section class="filmography user-select-none">
    <table v-if="props.items.length !== 0" class="filmography">
      <tr v-for="(title, index) in titles" :key="index" :class="{'border-top': (title.release_date || title.first_air_date) && index !== 0 && getFullYear(titles[index - 1]['release_date' || 'first_air_date']) !== getFullYear(title.release_date || title.first_air_date)}">
        <td class="year">
          <span v-if="title.release_date || title.first_air_date">
            {{index === 0 ? getFullYear(title.release_date||title.first_air_date) : getFullYear(titles[index - 1]['release_date' || 'first_air_date']) !== getFullYear(title.release_date || title.first_air_date) ? getFullYear(title.release_date || title.first_air_date) : ''}}
          </span>
          <span v-else>&mdash;</span>
        </td>
        <td class="watched">
          <div v-if="store.methods.watched.exists({ type: props.type[0].toUpperCase() + props.type.substring(1), id: title.id.toString() })">
            <span class="material-symbols-outlined" style="color:var(--theme-color)">visibility</span>
          </div> 
        </td>
        <td class="title">
          <router-link :to="{ name: props.type[0].toUpperCase() + props.type.substring(1), params: { id: title.id } }">
            <b>{{title.title || title.name}}</b>
            <span>
              <span v-if="title.character || title.job">
                <i class="as">ako</i>
              </span>
              <b style="color:var(--theme-color)">{{title.character || title.job}}</b>
            </span>
          </router-link>
        </td>
      </tr>
    </table>
    <span v-else class="no-items">V tejto kategórii nič nie je</span>
  </section>
</template>

<script setup>
import { ref, inject } from 'vue'

const titles = ref([])
const titlesWithYear = ref([])
const titlesWithoutYear = ref([])
const store = inject('store')

const props = defineProps({ items: Array, type: String })

if(props.type === 'movie'){
  titlesWithoutYear.value = props.items
    .filter(item => item.release_date === '' || item.release_date === undefined || item.release_date === null)
  titlesWithYear.value = props.items
    .filter(item => item.release_date !== '' && item.release_date !== undefined && item.release_date !== null)
    .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
  titles.value = titlesWithoutYear.value
    .concat(titlesWithYear.value)
    .filter(title => title.character !== 'Self')
}else{
  titlesWithoutYear.value = props.items
    .filter(item => item.first_air_date === '' || item.first_air_date === undefined || item.first_air_date === null)
  titlesWithYear.value = props.items
    .filter(item => item.first_air_date !== '' && item.first_air_date !== undefined && item.first_air_date !== null)
    .sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date))
  titles.value = titlesWithoutYear.value
    .concat(titlesWithYear.value)
    .filter(title => title.character !== 'Self')
}

const getFullYear = year => parseInt(new Date(year).getFullYear())
</script>

<style lang="scss" scoped>
section.filmography{
  width:100%;
  border-radius:8px;
  span.no-items{font-size:0.9rem;}
  table.filmography{
    width:100%;
    border-collapse:collapse;
    tr{
      td{
        padding:4px 0;
        vertical-align:top;
        span,b{font-size:0.8rem;}
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
    }
    tr:last-child{border-bottom:none;}
  }
  div.title{padding-bottom:5px;}
  i.as{
    display:inline-block;
    margin:0 0.5rem;
    color:var(--alternative-color);
  }
}
section.filmography:last-child{margin-bottom:0;}
</style>