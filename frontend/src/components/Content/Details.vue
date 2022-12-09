<template>
  <section class="title user-select-none">
    <div v-if="details['status'] || details['release_date'] || details['number_of_episodes'] || details['runtime'] || details['countries'].length > 0 || details['languages'].length > 0" class="details">
      <DetailsItem v-if="details['status']" label="Status">
        <template #content><span>{{details['status']}}</span></template>
      </DetailsItem>
      <DetailsItem v-if="details['revenue']" label="Zárobok">
        <template #content><span>{{details['revenue']}}</span></template>
      </DetailsItem>
      <DetailsItem v-if="details['release_date']" label="Dátum vydania">
        <template #content><span>{{details['release_date']}}</span></template>
      </DetailsItem>
      <DetailsItem v-if="details['number_of_episodes']" label="Počet epizód">
        <template #content><span>{{details['number_of_episodes']}}</span></template>
      </DetailsItem>
      <DetailsItem v-if="details['runtime']" label="Dĺžka">
        <template #content><span>{{details['runtime']}}</span></template>
      </DetailsItem>
      <DetailsItem v-if="details['languages'].length !== 0" label="Audio">
        <template #content>
          <span v-for="language in details['languages']" :key="language['iso_639_1']" style="display:block">{{language['english_name']}}</span>
        </template>
      </DetailsItem>
      <DetailsItem v-if="details['countries'].length !== 0" label="Pôvod">
        <template #content>
          <span v-for="(country, index) in details['countries']" :key="index" style="display:block">{{store.state.countries[(country.iso_3166_1 || country).toLowerCase()]}}</span>
        </template>
      </DetailsItem>
      <DetailsItem v-if="details['genres'].length !== 0" label="Žanre">
        <template #content>
          <router-link v-for="genre in details['genres']" :key="genre.id" :to="`/library?type=${type}&genre=${genre.id}`" style="display:block">{{genre.name}}</router-link>
        </template>
      </DetailsItem>
    </div>

    <section class="ratings">
      <span class="label">Hodnotenia</span>
      <div class="ratings">
        <Rating v-for="(rating, index) in details['ratings']" :key="index" :rating="rating['rating']" :url="rating['url']" :name="rating['name']"/>
      </div>
    </section>

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

    <div v-if="details['networks'].length !== 0" class="networks">
      <img v-for="network, i in details['networks']" :key="network.id" onerror="javascript:this.remove()" :src="`https://www.themoviedb.org/t/p/original${network.logo_path.split('.')[0]}.svg`" :alt="network.name" :title="network.name">
    </div>
  </section>
</template>

<script setup>
import DetailsItem from './DetailsItem.vue'
import Rating from './Rating.vue'

import { inject, ref } from 'vue'
import { useRoute } from 'vue-router'

const { details } = defineProps({ details: Object })

const route = useRoute()
const store = inject('store')
const type = ref(route.name.charAt(0).toLowerCase() + route.name.substr(1))

store.methods.recentItems.pushItem({
  type: type.value,
  title: details.title,
  id: route.params.id,
  poster: details.poster
})

const tvStatusIcon = new Map()
tvStatusIcon.set('Pokračuje','more_horiz')
.set('Naplánovany','event')
.set('V produkcií','build')
.set('Skončil','check_circle')
.set('Zrušený','cancel')
.set('Pilot','filter_1')
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
  section.ratings{
    align-self:stretch;
    padding-bottom:1.5rem;
    div.ratings{
      margin-top:1rem;
      display:flex;
      align-items:flex-star;
      gap:1rem;
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
    margin-top:calc(0px - var(--container-padding));
    margin-left:calc(0px - var(--container-padding));
    margin-right:calc(0px - var(--container-padding));
  }
}
</style>