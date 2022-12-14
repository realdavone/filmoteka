<template>
  <Navbar v-if="!$route?.meta?.hideNav"/>
  <main class="content">
    <router-view v-slot="{ Component }">
      <KeepAlive max="5" :exclude="['Recommended', 'Admin']">
        <component :key="$route.fullPath" :is="Component" />
      </KeepAlive>
    </router-view>
  </main>
  <notifications position="bottom center"/>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import { provide } from 'vue'
import store from './store/index'
import socket from './socket/main'

socket.on('globalSettingsUpdate', (data: any) => store.state.globalSettings = { ...store.state.globalSettings, ...data } )

provide('store', store)
provide('socket', socket)
</script>

<style lang="scss">
main.content{
  width:100%;
  min-height:calc(100vh - var(--nav-height));
  padding-bottom:var(--main-content-padding-bottom);
}
.wrapper{
  padding-top:20px;
  padding-bottom:20px;
}
.container{
  padding-left:var(--container-padding);
  padding-right:var(--container-padding);
}
.margin-container{
  margin-left:var(--container-padding);
  margin-right:var(--container-padding);
}
.user-select-none{user-select:none;}
img{display:block;}
a{
  font-family:inherit;
  text-decoration:none;
  color:inherit;
}
span{
  font-size:inherit;
  line-height:inherit;
  font-family:inherit;
}
.quotation-marks{
  &::before{ content:'„'; }
  &::after{ content:'“'; }
}
.bullet-after{
  &::after{
    display:inline-block;
    content:'•';
    width:18px;
    text-align:center;
    font-weight:900;
  }
  &:last-child::after{ 
    content:'';
    width:0;
  }
}
.comma-after{
  &::after{ content:', '; }
  &:last-child::after{ content:''; }
}

button{
  border:none;
  font-family:inherit;
  background:none;
  cursor:pointer;
  color:inherit;
}
input, textarea{
  background:none;
  border:none;
  outline:none;
  font-family:inherit;
}

@media screen and (max-width: 600px) {
  .wrapper{
    padding-top:var(--container-padding);
    padding-bottom:var(--container-padding);
  }
}
</style>
