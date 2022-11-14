import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Notifications, { notify } from '@kyvg/vue3-notification'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import store from './store/index'
import Auth from './auth/main'
import _ from './utils/main'

import './styles/main.css'

const autoLogin = Auth.refresh(localStorage.getItem('refreshToken')).catch(() => { localStorage.removeItem('refreshToken') })
const getGlobalSettings = store.methods.globalSettings.init()

_.initLoader()

Promise.all([autoLogin, getGlobalSettings]).then(values => {
  const [attemptLogin, globals] = values

  store.state.globalSettings = globals

  createApp(App)
  .use(router)
  .use(autoAnimatePlugin)
  .use(Notifications)
  .mount('#app')

  if(attemptLogin?.success) notify({ type: 'success', text: attemptLogin['message'] })
  
  store.initializeData()
})