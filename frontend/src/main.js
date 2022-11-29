import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications, { notify } from '@kyvg/vue3-notification'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import store from './store/index'
import Auth from './auth/main'
import _ from './utils/main'

import './styles/main.css'

_.initLoader()

Promise.allSettled([
  Auth.refresh(localStorage.getItem('refreshToken')),
  store.methods.globalSettings.init()
]).then(result => {
  const [attemptLogin, globals] = result

  if(attemptLogin.status === 'rejected') localStorage.removeItem('refreshToken')

  store.state.globalSettings = globals.value

  createApp(App)
  .use(router)
  .use(autoAnimatePlugin)
  .use(Notifications)
  .mount('#app')

  if(attemptLogin?.value?.success) notify({ type: 'success', text: attemptLogin.value['message'] })
  
  store.initResources()
})