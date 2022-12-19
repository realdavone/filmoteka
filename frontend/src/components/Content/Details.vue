<template>
  <div class="details">
    <div class="item" v-if="details.status">
      <span class="label">Status</span>
      {{status.get(details.status)}}
    </div>
    <div class="item" v-if="details.languages?.length">
      <span class="label">Audio</span>
      <span v-for="language in details.languages" :key="language.iso_639_1">{{language.english_name}}</span>
    </div>
    <div class="item" v-if="details.countries?.length">
      <span class="label">Pôvod</span>
      <span v-for="country in details.countries" :key="country.iso_3166_1">{{store.state.countries[country.iso_3166_1.toLowerCase()]}}</span>
    </div>
    <div class="item" v-if="details.revenue">
      <span class="label">Zárobok</span>
      {{new Intl.NumberFormat('sk-SK', { notation: "compact", compactDisplay: "short", style: "currency", currency: "USD" }).format(details.revenue)}}
    </div>
    <div class="item" v-if="details.release_date">
      <span class="label">Premiéra</span>
      {{new Date(details.release_date).toLocaleDateString('sk-SK')}}
    </div>
    <div class="item" v-if="details.number_of_episodes">
      <span class="label">Počet epizód</span>
      {{details.number_of_episodes}}
    </div>
    <div class="item" v-if="details.runtime">
      <span class="label">Trvanie</span>
      {{details.runtime}}
    </div>
    <div class="item" v-if="details.genres?.length">
      <span class="label">Žánre</span>
      <router-link :to="`/library?type=${$route.name?.toString().toLowerCase()}&genre=${genre.id}`" :key="genre.id" v-for="genre in details.genres">{{genre.name}}</router-link>
    </div>
    <div class="item full-width">
      <span class="label">Hodnotenia</span>
      <div class="ratings">
        <Rating v-for="(rating, i) in details.ratings" :key="i" size="normal" :name="rating.name" :url="rating.url || undefined" :rating="rating.rating || 'N/A'" />
      </div>
    </div>
    <div class="item full-width" v-if="details.creators">
      <span class="label">Tvorci</span>
      <div class="creators">
        <div class="creator" v-for="creator in details.creators" :key="creator.id">
          <router-link :to="`/person/${creator.id}`" class="name">{{creator.name}}</router-link>
          <div class="job">
            <span v-for="job in creator.jobs" :key="job">{{job}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item full-width" v-if="details.networks">
      <span class="label">Produkčné spoločnosti</span>
      <div class="networks">
        <img
        v-for="network in details.networks.filter(network => network.logo_path)"
        :key="network.id"
        class="network"
        v-bind="{ ...network.logo_path ? { src: `https://www.themoviedb.org/t/p/original${network.logo_path.split('.')[0]}.svg` } : {} }"
        :alt="network.name"
        :title="network.name"
        onerror="javascript:this.remove()"
        draggable="false">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import Rating from './Rating.vue'

type Props = {
  details: {
    status?: string
    revenue?: number
    runtime?: string | number
    number_of_episodes?: number
    release_date?: string
    genres?: Array<{
      id: number
      name: string
    }>
    languages?: Array<{
      english_name: string
      iso_639_1: string
      name: string
    }>
    countries?: Array<{
      iso_3166_1: string
      name: string
    }>
    networks?:Array<{
      name: string
      id: number
      logo_path: string | null
      origin_country: string
    }>
    creators?: Array<{
      id: number
      name: string
      profile_path: string | null
      jobs: Array<string>
    }>
    ratings?: Array<{
      name: string
      rating: number | string | undefined
      url: string | null
    }>
  }
}

const { details } = defineProps<Props>()

const store = inject<any>('store')

const status = new Map()
status.set('Returning Series', 'Pokračuje')
  .set('Planned', 'Naplánovany')
  .set('In Production', 'V produkcií')
  .set('Ended', 'Skončil')
  .set('Canceled', 'Zrušený')
  .set('Pilot', 'Pilot')
  .set('Rumored', 'Údajný')
  .set('Post Production', 'Postprodukcia')
  .set('Released', 'Vydaný')
</script>

<style lang="scss" scoped>
div.details{
  background-color:var(--card-color);
  padding:1rem;
  display:grid;
  grid-template-columns:[start] repeat(auto-fill, minmax(180px, 1fr)) [end];
  gap:1rem;
  width:100%;
  border-radius:1rem;
  div.item{
    background-color:var(--card-color-hover);
    padding:0.5rem 1rem;
    display:flex;
    flex-direction:column;
    border-radius:0.5rem;
    align-items:flex-start;
    font-size:0.75rem;
    text-align:left;
    overflow:hidden;
    span.label{
      font-weight:700;
      margin-bottom:0.5rem;
      font-size:1rem;
    }
    div.ratings{
      margin-bottom:1.5rem;
      display:flex;gap:1rem;
      flex-wrap:wrap;
    }
    div.creators{
      display:flex;
      flex-wrap:wrap;
      gap:1rem;
      div.creator{
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        gap:0.25rem;
        a.name{
          font-weight:700;
        }
        div.job{
          span{
            &::after{ content:', ' }
            &:last-of-type::after{ content:'' }         
          }
        }
      }
    }
    div.networks{
      display:flex;
      flex-wrap:wrap;
      gap:1rem;
      padding-bottom:0.5rem;
      img.network{
        max-height:30px;
        width:auto;
        object-fit:cover;
      }
    }
    &.full-width{
      grid-column-start:1;
      grid-column-end: span end
    }
  }
}
</style>