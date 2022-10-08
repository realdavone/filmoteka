<template>
  <main class="container login-register">
    <header>
      <span>Prihlásenie</span>
    </header>
    <form class="form" @submit.prevent="login">
      <div class="input">
        <span>&commat;</span>
        <input v-model="credentials.email" type="email" name="email" placeholder="Email" autocomplete="email" required>
      </div>
      <div class="input">
        <span>&#x66D;</span>
        <input v-model="credentials.password" type="password" name="password" placeholder="Heslo" autocomplete="current-password" required>
      </div>
      <button :disabled="loginStart" type="submit">
        <span>Prihlásiť</span>
        <div v-if="loginStart" class="loader"></div>
      </button>
      <div id="buttonDiv" style="align-self:center"></div>
    </form>
    <router-link v-if="store.state.globalSettings?.allowRegistration" to="/register" class="link">Ešte nemáte účet?</router-link>
  </main>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification"
import { reactive, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '../auth/main.js'
import '../styles/auth.scss'

const router = useRouter()
const store = inject('store')

const credentials = reactive({ email: null, password: null })
const loginStart = ref(false)

onMounted(() => {
  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: (response) => {
      loginStart.value = true
      Auth.google(response.credential)
      .then(res => {
        window.history.state.back === null ? router.push('/') : router.go(-1)
        notify({ type: 'success', text: res.message })
      })
      .catch(error => notify({ type: 'error', text: error.message }) )
      .finally(() => loginStart.value = false)
    }
  })
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme: 'filled_blue', size: "medium", text: 'continue_with', shape: 'pill' }
  )
})

const login = () => {
  loginStart.value = true
  Auth.login({ email: credentials.email, password: credentials.password })
  .then(res => {
    window.history.state.back === null ? router.push('/') : router.go(-1)
    notify({ type: 'success', text: res.message })
  })
  .catch(error => notify({ type: 'error', text: error.message }) )
  .finally(() => loginStart.value = false)
}
</script>