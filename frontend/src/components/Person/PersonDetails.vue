<template>
  <main class="outter-holder user-select-none">
    <section class="profile">
      <div class="photo-socials">
        <div class="profile-photo">
          <img v-if="person['photo']" :src="`https://www.themoviedb.org/t/p/w600_and_h600_bestv2${person['photo']}`" :alt="person['name']">
        </div>
        <Socials :id="person['tmdb']" :imdb="person['extIds']['imdb_id']" :fb="person['extIds']['facebook_id']" :ig="person['extIds']['instagram_id']" :twitter="person['extIds']['twitter_id']" />
      </div>
      <div class="profile-details">
        <div class="profile-name">{{person['name']}}</div>
        <div class="details">
          <div class="info-outter" v-if="person['birthday'] || person['birthplace']">
            <span class="icon">&lowast;</span>
            <div>
              <span v-if="!person['deathday'] && person['birthday']" class="comma-after" >{{person['age']}}</span>
              <span v-if="person['birthday']" class="comma-after">{{person['birthday']}}</span>
              <span v-if="person['birthplace']" class="comma-after">{{person['birthplace']}}</span>
            </div>
          </div>
          <div class="info-outter" v-if="person['deathday']">
            <span class="icon">&#10013;</span>
            <div>
              <span class="comma-after">{{person['deathday']}}</span>              
              <span class="comma-after">{{person['age']}}</span>
            </div>
          </div>
        </div>
        <div class="profile-biography">{{person['bio'] || `Pre ${person['name']} nie je k dispozicií žiadna biografia`}}</div>
      </div>
    </section>
  </main>
</template>

<script setup>
import Socials from '../Person/Socials.vue'

import { ref } from 'vue'

const props = defineProps({
  name: String,
  biography: String,
  img: String,
  birthday: String,
  deathday: String,
  placeOfBirth: String,
  imdb: String,
  id: String | Number,
  extId: Object,
  imgs: Array
})
const person = ref({
  name: props['name'],
  bio: props['biography'],
  photo: props['img'],
  birthday: props['birthday'] ? new Date(props['birthday']).toLocaleDateString('sk-SK') : null,
  deathday: props['deathday'] ? new Date(props['deathday']).toLocaleDateString('sk-SK') : null,
  age:~~(((props.deathday ? (new Date(props.deathday)) : Date.now()) - (new Date(props.birthday))) / (31557600000)),
  birthplace: props['placeOfBirth'],
  imdb: props['imdb'],
  tmdb: props['id'],
  extIds: props['extId'],
  imgs: props['imgs']
})
</script>

<style lang="scss" scoped>
main.outter-holder{
  display:flex;
  flex-direction:column;
  gap:var(--container-padding);
  width:100%;
  section.profile{
    display:flex;
    align-items:flex-start;
    gap:var(--container-padding);
    div.photo-socials{
      display:flex;
      flex-direction:column;
      gap:var(--container-padding);
      justify-content:space-between;
      div.profile-photo{
        background:var(--card-color);
        width:250px;
        height:250px;
        border-radius:125px;
        overflow:hidden;
        img{
          width:100%;
          height:100%;
        }
      }
    }
    div.profile-details{
      display:flex;
      flex-direction:column;
      gap:10px;
      width:100%;
      div.info-outter{
        display:flex;
        span.icon{
          min-width:30px;
          display:inline-block;
          text-align:center;
          color:var(--theme-color);
          font-size:1.15rem;
        }
        div{
          span{font-size:0.75rem;}
        }
      }
      div.profile-name{
        font-weight:700;
        font-size:1.75rem;
      }
      div.profile-biography{ font-size:0.85rem }
    }
  }
}
@media screen and (max-width: 700px) {
  section.profile{
    flex-direction:column;
    align-items:center!important;
  }
}
</style>