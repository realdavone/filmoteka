<template>
  <main class="outter-holder user-select-none">
    <section class="profile">
      <div class="photo-socials">
        <div class="profile-photo">
          <img v-if="person.profile_path" :src="`https://www.themoviedb.org/t/p/w600_and_h600_bestv2${person.profile_path}`" :alt="person.name">
        </div>
        <Socials :socials="person.external_ids" />
      </div>
      <div class="profile-details">
        <div class="profile-name">{{person.name}}</div>
        <div class="details">
          <div class="info-outter" v-if="person.birthday || person.place_of_birth">
            <span class="icon">&lowast;</span>
            <div>
              <span v-if="!person.deathday && person.birthday" class="comma-after" >{{getAge(person.birthday, person.deathday)}}</span>
              <span v-if="person.birthday" class="comma-after">{{new Date(person.birthday).toLocaleDateString('sk-SK')}}</span>
              <span v-if="person.place_of_birth" class="comma-after">{{person.place_of_birth}}</span>
            </div>
          </div>
          <div class="info-outter" v-if="person.deathday">
            <span class="icon">&#10013;</span>
            <div>
              <span class="comma-after">{{new Date(person.deathday).toLocaleDateString('sk-SK')}}</span>              
              <span class="comma-after">{{getAge(person.birthday, person.deathday)}}</span>
            </div>
          </div>
        </div>
        <div class="profile-biography">{{person.biography || `Pre ${person.name} nie je k dispozicií biografia`}}</div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import Socials from '../Person/Socials.vue'

import { Person } from '../../types/person'

type PersonProps = Pick<Person, 'name' | 'biography' | 'profile_path' | 'birthday' | 'place_of_birth' | 'deathday' | 'external_ids' | 'id' | 'imdb_id'>

const { person } = defineProps<{ person: PersonProps }>()

const getAge = (birthday: string | null, deathday: string | null): number | null => {
  if(birthday === null) return null

  return Math.floor(((deathday === null ? new Date().getTime() : new Date(deathday).getTime()) - new Date(birthday).getTime()) / (1000 * 60 * 60 * 24 * 365))
}
</script>

<style lang="scss" scoped>
main.outter-holder{
  display:flex;
  flex-direction:column;
  gap:var(--container-padding);
  width:100%;
  position:sticky;
  top:var(--nav-height);
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
      div.profile-biography{ 
        font-size:0.85rem;
        max-height:60vh;
        overflow:auto;
      }
    }
  }
}
@media screen and (max-width: 1200px){
  main.outter-holder{ position:static }
}
@media screen and (max-width: 700px) {
  section.profile{
    flex-direction:column;
    align-items:center!important;
  }
}
</style>