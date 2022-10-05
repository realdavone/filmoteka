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
  <Footer v-if="!$route?.meta?.hideFooter"/>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { provide } from 'vue'
import store from './store/index'
import { io } from "socket.io-client"

const socket = io.connect(import.meta.env.VITE_SOCKET_ADDRESS)

socket.on('globalSettingsUpdate', (data) => { store.state.globalSettings = { ...store.state.globalSettings, ...data } })

provide('store', store)
provide('socket', socket)
</script>

<style lang="scss">
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Montserrat',sans-serif;
  line-height:1.4;
}
main.content{
  width:100%;
  min-height:calc(100vh - var(--nav-height) - var(--footer-height));
}
.wrapper{
  padding-top:20px;
  padding-bottom:20px;
}
.flex-column{
  display:flex;
  flex-direction:column;
  gap:20px;
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
input{
  border:none;
  outline:none;
  font-family:inherit;
}
::-webkit-scrollbar{width:15px;height:15px;}
::-webkit-scrollbar-thumb{background:var(--theme-color-transparent);border:4px solid transparent;border-radius:10px;background-clip:content-box;}

@media screen and (max-width: 600px) {
  .wrapper{
    padding-top:var(--container-padding);
    padding-bottom:var(--container-padding);
  }
  .flex-column{
    gap:var(--container-padding);
  }
}
</style>
