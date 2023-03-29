<template>
  <main class="container">
    <section class="dashboard">
      <header>
        <Logo :height="30"/>
        <span v-font:medium>Ovládací panel</span>
      </header>
      <div class="columns">
        <aside class="menu">
          <button
            v-for="(tab, i) in tabs"
            :key="i"
            class="tab"
            :data-active="activeComponent === tab.component"
            @click="activeComponent = tab.component"
          ><span class="material-icons">{{tab.icon}}</span></button>
        </aside>
        <section class="content">
          <Suspense>
            <component :is="activeComponent" />
            <template #fallback>
              <Loader type="default"/>
            </template>
          </Suspense>
        </section>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
export default { name: "Admin" } 
</script>

<script setup lang="ts">
import Config from '../components/Admin/Config.vue'
import Analytics from '../components/Admin/Analytics.vue'
import Recommended from '../components/Admin/Recommended.vue'
import Users from '../components/Admin/Users.vue'
import Logo from '../components/Logo.vue'

import { shallowRef } from 'vue'
import Loader from '../components/Loader.vue' 

const activeComponent = shallowRef(Config)

const tabs = [
  {
    component: Config,
    icon: 'settings',
    name: 'Nastavenia'
  },
  {
    component: Recommended,
    icon: 'recommend',
    name: 'Odporúčané'
  },
  {
    component: Users,
    icon: 'group',
    name: 'Užívatelia'
  },
  {
    component: Analytics,
    icon: 'analytics',
    name: 'Štatistiky'
  }
]
</script>

<style scoped lang="scss">
section.dashboard{
  background-color:var(--card-color);
  min-height:100vh;
  overflow:hidden;
  margin-right:calc(0px - var(--container-padding));
  margin-left:calc(0px - var(--container-padding));
  margin-bottom: calc(0px - var(--main-content-padding-bottom));

  --header-height:54px;
  header{
    font-weight:700;
    width:100%;
    background-color:var(--card-color-hover);
    display:flex;
    align-items:center;
    gap: 15px;
    height:var(--header-height);
    padding:0 15px;
    span:nth-child(1){
      text-align:center;
      width:70px;
      padding:15px;
      transform:rotate(180deg);
    }
    span:nth-child(2){ font-weight:900; }
  }
  div.columns{
    display:flex;
    align-content:stretch;
    height:100%;
    min-height:calc(100vh - var(--header-height));
    aside.menu{
      display:flex;
      flex-direction:column;
      gap:6px;
      background-color:var(--card-color-hover);
      padding:0 15px;
      button.tab{
        padding:8px;
        display:flex;
        align-items:center;
        justify-content:center;
        gap:8px;
        &[data-active=true]{ color:var(--theme-color) }
      }
    }
    section.content{ flex-basis:100%;padding:15px; }
  }
}
@media screen and (max-width: 600px) {
  div.columns{ flex-direction:column; gap:0 }
  aside.menu{
    flex-direction:row!important;
    button{ flex-basis:0 }
  }
}
</style>