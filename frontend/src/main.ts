import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import Notifications from '@kyvg/vue3-notification'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import store from './store/index'
import Auth from './auth/main'
import _ from './utils/main'
import './styles/main.scss'

import focus from './directives/focus'
import font from './directives/font'

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

    const app = createApp(App)
    .use(router)
    .use(autoAnimatePlugin)
    .use(Notifications) 
    
    app.directive('focus', focus)
    app.directive('font', font)
    
    app.mount('#app')
    
    store.initResources()
  })
})()