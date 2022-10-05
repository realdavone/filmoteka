<template>
  <main class="container login-register">
    <header>
      <span>Prihlásenie</span>
    </header>
    <form class="form" @submit.prevent="login">
      <div class="input">
        <span>&commat;</span>
        <input v-model="credentials.email" type="email" name="email" placeholder="Email" autocomplete="email">
      </div>
      <div class="input">
        <span>&#x66D;</span>
        <input v-model="credentials.password" type="password" name="password" placeholder="Heslo" autocomplete="current-password">
      </div>
      <button type="submit">Prihlásiť</button>
      <div class="line">
        <span>ALEBO</span>
      </div>
      <div id="buttonDiv" style="align-self:center"></div>
    </form>
    <router-link v-if="store.state.globalSettings?.allowRegistration" to="/register" class="link">Ešte nemáte účet?</router-link>
  </main>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification"
import { reactive, inject, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '../auth/main.js'

const router = useRouter()
const store = inject('store')

onMounted(() => {
  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: (response) => {
      Auth.google(response.credential)
      .then(res => {
        window.history.state.back === null ? router.push('/') : router.go(-1)
        notify({ type: 'success', text: res.message })
      })
      .catch(error => notify({ type: 'error', text: error.message }) )
    }
  })
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { 
      theme: 'filled_blue',
      size: "medium",
      text: 'continue_with',
      shape: 'pill'
    }
  )
  //google.accounts.id.prompt() // also display the One Tap dialog
})

const credentials = reactive({ email: null, password: null })
const login = () => { 
  Auth.login({ email: credentials.email, password: credentials.password })
  .then(res => {
    window.history.state.back === null ? router.push('/') : router.go(-1)
    notify({ type: 'success', text: res.message })
  })
  .catch(error => notify({ type: 'error', text: error.message }) )
}
</script>