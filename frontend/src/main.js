import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications, { notify } from '@kyvg/vue3-notification'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import store from './store/index'
import Auth from './auth/main'

import './styles/main.css'

console.log(import.meta.env.VITE_BASE_URL)

const autoLogin = Auth.refresh(localStorage.getItem('refreshToken')).catch(() => { localStorage.removeItem('refreshToken') })
const getGlobalSettings = store.methods.globalSettings.init()

Promise.all([autoLogin, getGlobalSettings]).then(values => {
  store.state.globalSettings = values[1]
  
  router.beforeEach((to, from) => {
    if(to.meta.denyAccessAsLoggedIn && store.state.credentials.loggedIn !== false) return '/' 
    if(to.meta.requiresAdmin && store.state.credentials.loggedIn === false) return { name: 'Login' }
  })

  createApp(App).use(router).use(autoAnimatePlugin).use(Notifications).mount('#app')

  if(values[0]?.success) notify({ type: 'success', text: values[0]['message'] })
  
  store.initializeData()
})