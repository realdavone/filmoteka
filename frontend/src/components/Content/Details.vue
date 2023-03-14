<template>
  <div class="details">
    <div class="item" v-if="details.status">
      <span class="label">Status</span>
      <span class="value">{{ status.get(details.status) }}</span>
    </div>
    <div class="item" v-if="details.languages?.length">
      <span class="label">Audio</span>
      <div>
        <span
        class="comma-after"
        v-for="language in details.languages"
        :key="language.iso_639_1">{{ language.english_name }}</span>
      </div>
    </div>
    <div class="item" v-if="details.countries?.length">
      <span class="label">Pôvod</span>
      <div>
        <span
        class="comma-after value"
        v-for="country in details.countries"
        :key="country.iso_3166_1">
        {{ store.state.countries[country.iso_3166_1.toLowerCase()] }}
        </span>
      </div>
    </div>
    <div class="item" v-if="details.revenue">
      <span class="label">Zárobok</span>
      <span class="value">{{ new Intl.NumberFormat('sk-SK', { notation: "compact", compactDisplay: "short", style: "currency", currency: "USD" }).format(details.revenue) }}</span>
    </div>
    <div class="item" v-if="details.release_date">
      <span class="label">Premiéra</span>
      <span class="value">{{ new Date(details.release_date).toLocaleDateString('sk-SK') }}</span>
    </div>
    <div class="item" v-if="details.number_of_episodes">
      <span class="label">Počet epizód</span>
      <span class="value">{{ details.number_of_episodes }}</span>
    </div>
    <div class="item" v-if="details.runtime">
      <span class="label">Trvanie</span>
      <span class="value">{{ `${Math.floor(details.runtime / 60) > 0 ? `${Math.floor(details.runtime / 60)}h` : ''} ${details.runtime % 60}m` }}</span>
    </div>
    <div class="item">
      <span class="label">Hodnotenia</span>
      <div class="ratings">
        <component
        :is="rating.url === null ? 'div' : 'a'"
        v-for="rating in details.ratings"
        v-bind="(rating.url ? { href: rating.url, target: '_blank' } : {})"
        :key="rating.name">
        <span>{{ rating.name }}</span><b>{{ getRating(rating.rating as number | string) }}</b>
        </component>
      </div>
    </div>
    <div v-if="details.creators?.length" class="item">
      <span class="label">Tvorci</span>
      <div>
        <div v-for="creator in details.creators" :key="creator.id">
          <router-link :to="`/person/${creator.id}`" class="name">{{ creator.name }}</router-link>
          <div>
            <span v-for="job in creator.jobs" :key="job" class="job comma-after">{{ job }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="item" v-if="details.networks?.length">
      <span class="label">Produkcia</span>
      <div>
        <div v-for="network in details.networks" :key="network.id">
          <span class="value">{{ network.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'

type Props = {
  details: {
    status?: string
    revenue?: number
    runtime?: number
    number_of_episodes?: number
    release_date?: string
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

const status = new Map([
  ['Returning Series', 'Pokračuje'],
  ['Planned', 'Naplánovany'],
  ['In Production', 'V produkcií'],
  ['Ended', 'Skončil'],
  ['Canceled', 'Zrušený'],
  ['Pilot', 'Pilot'],
  ['Rumored', 'Údajný'],
  ['Post Production', 'Postprodukcia'],
  ['Released', 'Vydaný']
])

function getRating(rating: number | string): number | 'N/A' {
  if(typeof(rating) === 'string') rating = parseFloat(rating)

  return isNaN(rating) ? 'N/A' : Math.floor(rating * 10) / 10
}
</script>

<style lang="scss" scoped>
div.details{
  display: grid;
  grid-template-columns:[start] repeat(auto-fill, minmax(160px, 1fr)) [end];
  gap: 1rem;
  width:100%;

  div.item{
    background-color: var(--card-color);
    padding: 5px 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: space-between;
    font-family: 'Roboto', sans-serif;

    span.label{
      color: gray;
      font-size: 0.85rem;
    }

    span.value{
      font-size: 1rem;
    }

    div.ratings{

      a, div{
        display: flex;
        justify-content: space-between;
      }
    }

    .job{
      font-size: 0.75rem;
    }
  }   
}
</style>