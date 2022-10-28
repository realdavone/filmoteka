<template>
  <section class="title user-select-none">
    <div v-if="details['status'] || details['release_date'] || details['number_of_episodes'] || details['runtime'] || details['countries'].length > 0 || details['languages'].length > 0" class="details">
      <DetailsItem v-if="details['status']">
        <template #label>Status</template>
        <template #content>{{details['status']}}</template>
      </DetailsItem>
      <DetailsItem v-if="details['revenue']">
        <template #label>Zárobok</template>
        <template #content>{{details['revenue']}}</template>
      </DetailsItem>
      <DetailsItem v-if="details['release_date']">
        <template #label>Dátum vydania</template>
        <template #content>{{details['release_date']}}</template>
      </DetailsItem>
      <DetailsItem v-if="details['number_of_episodes']">
        <template #label>Počet epizód</template>
        <template #content>{{details['number_of_episodes']}} epizód</template>
      </DetailsItem>
      <DetailsItem v-if="details['runtime']">
        <template #label>Dĺžka</template>
        <template #content>{{details['runtime']}}</template>
      </DetailsItem>
      <DetailsItem v-if="details['languages'].length !== 0">
        <template #label>Audio</template>
        <template #content>
          <span v-for="language in details['languages']" :key="language['iso_639_1']" style="display:block">{{language['english_name']}}</span>
        </template>
      </DetailsItem>
      <DetailsItem v-if="details['countries'].length !== 0">
        <template #label>Pôvod</template>
        <template #content>
          <span v-for="(country, index) in details['countries']" :key="index" style="display:block">{{store.state.countries[(country.iso_3166_1 || country).toLowerCase()]}}</span>
        </template>
      </DetailsItem>
      <DetailsItem v-if="details['genres'].length !== 0">
        <template #label>Žanre</template>
        <template #content>
          <router-link v-for="genre in details['genres']" :key="genre.id" :to="`/library?type=${type}&genre=${genre.id}`" style="display:block">{{genre.name}}</router-link>
        </template>
      </DetailsItem>
    </div>

    <div class="ratings">
      <span class="label">Hodnotenia</span>
      <div>
        <a :class="(index === 0 ? `primary ${getCat(rating['rating'])}` : 'secondary')" v-for="(rating, index) in details['ratings'].filter(item => item['rating'])" :key="index" :href="rating['url']" target="_blank">
          <span>{{rating['rating']}}</span>
          <span v-if="index > 0">{{rating['name']}}</span>
        </a>
      </div>
    </div>

    <div class="overview">
      <span class="label">Prehľad</span>
      {{details['overview'] || 'Popis nie je dostupný.'}}
    </div>

    <div v-if="details['creators'].length > 0" class="creators">
      <div class="creator" v-for="creator in details.creators" :key="creator.id">
        <div class="name-job">
          <router-link :to="{ name: 'Person', params: { id: creator['id'] } }" class="name">{{creator.name}}</router-link>
          <div class="jobs">
            <span v-for="(job, index) in creator.jobs" :key="index" class="department comma-after">{{job || 'Tvorca'}}</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="details['networks'].length !== 0" class="networks" ref="networks">
      <img div v-for="network, i in details['networks']" :key="network.id" @error="hideNetwork" :src="`https://www.themoviedb.org/t/p/original${network.logo_path.split('.')[0] + '.svg'}`" :alt="network.name" :title="network.name">
    </div>
  </section>
</template>

<script setup>
import DetailsItem from './DetailsItem.vue'

import { inject, ref } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({ details: Object })

const route = useRoute()
const store = inject('store')
const type = ref(route.name.charAt(0).toLowerCase() + route.name.substr(1))
const details = ref(props['details'])
const networks = ref(null)

const hideNetwork = el => el.target.style.display = 'none'

store.methods.recentItems.pushItem({
  type: type.value,
  title: details.value.title,
  id: route.params.id,
  poster: details.value.poster
})

const tvStatusIcon = new Map()
tvStatusIcon.set('Pokračuje','more_horiz')
  .set('Naplánovany','event')
  .set('V produkcií','build')
  .set('Skončil','check_circle')
  .set('Zrušený','cancel')
  .set('Pilot','filter_1')

const getCat = rating => parseFloat(rating) < 2.5 ? 'low' : parseFloat(rating) < 7.0 ? 'medium' : 'high'
</script>

<style lang="scss" scoped>
section.title{
  display:flex;
  align-items:flex-start;
  flex-direction:column;
  gap:1rem;
  max-width:1000px;
  width:100%;
  border-radius:1rem;
  padding:1rem;
  background-color:var(--card-color);
  margin:0 auto;
  span.label{
    font-weight:700;
    font-size:1.05rem;
  }
  div.ratings{
    align-self:stretch;
    padding:0 0 10px 0;
    div{
      margin-top:15px;
      display:flex;
      align-items:center;
      gap:15px;
      a.primary{
        width:60px;
        height:60px;
        background-color:var(--card-color-hover);
        outline:4px solid var(--card-color-hover);
        border-radius:30px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-weight:700;
        font-size:1.25rem;
        transition:0.2s ease transform;
        &.low{border:5px solid crimson}
        &.medium{border:5px solid goldenrod}
        &.high{border:5px solid green}
        &:hover{ transform:scale(1.05) }
      }
      a.secondary{
        width:40px;
        height:40px;
        background:var(--card-color-hover);
        border-radius:25px;
        display:flex;
        align-items:center;
        justify-content:center;
        flex-direction:column;
        font-size:0.75rem;
        position:relative;
        span:nth-child(1){ font-weight:700 }
        span:nth-child(2){
          position:absolute;
          top:calc(100% + 5px);
          text-align:center;
          line-height:1;
          font-size:0.5rem;
          pointer-events:none;
        }
      }
    }
  }
  div.networks{
    display:flex;
    align-items:center;
    flex-wrap:wrap;
    gap:15px;
    align-self:flex-end;
    &:empty{ display:none; }
    img{
      max-height:30px;
      width:auto;
      max-width:200px;
    }
  }
  div.details{
    width:100%;
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(130px,1fr));
    gap:1rem;
  }
  div.overview{
    display:flex;
    flex-direction:column;
    gap:10px;
    padding-right:5px;
    font-size:0.8rem;
  }
  div.creators{
    width:100%;
    display:grid;
    grid-template-columns:repeat(auto-fit, minmax(160px, 1fr));
    gap:10px;
    div.creator{
      display:flex;
      gap:8px;
      div.photo{
        width:30px;
        min-width:30px;
        height:30px;
        border-radius:15px;
        overflow:hidden;
        background:var(--card-color);
        img{
          width:100%;
          height:100%;
        }
      }
      div.name-job{
        display:flex;
        flex-direction:column;
        a.name{
          font-size:0.85rem;
          font-weight:700;
          align-self:flex-start;
        }
        div.jobs{
          line-height:1;
          span.department{
            font-size:0.8rem;
            color:var(--secondary-text-color);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 600px){
  section.title{
    box-sizing:border-box;
    width:initial;
    border-radius:0;
    margin-left:calc(0px - var(--container-padding));
    margin-right:calc(0px - var(--container-padding));
  }
}
</style>