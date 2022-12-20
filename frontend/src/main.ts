import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Notifications, { notify } from '@kyvg/vue3-notification'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import store from './store/index'
import Auth from './auth/main'
import _ from './utils/main'

import './styles/main.css'

(function startApp(){
  _.initLoader()

  Promise.allSettled([
    Auth.refresh(localStorage.getItem('refreshToken')),
    store.methods.globalSettings.init()
  ]).then(result => {
    const [attemptLogin, globals] = result

    if(globals.status === 'rejected') return _.setFailedScreen(globals.reason, startApp)
    if(attemptLogin.status === 'rejected') localStorage.removeItem('refreshToken')

    store.state.globalSettings = globals.value as any

    createApp(App)
    .use(router)
    .use(autoAnimatePlugin)
    .use(Notifications)
    .mount('#app')
    
    store.initResources()
  })
})()