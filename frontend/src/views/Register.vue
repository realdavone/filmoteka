<template>
  <main class="container login-register">
    <header>
      <span>Registrácia</span>
    </header>
    <form class="form" @submit.prevent="register">
      <div class="input">
        <span>&commat;</span>
        <input v-model="credentials.email" type="email" name="email" placeholder="Email" autocomplete="email" required>
      </div>
      <div class="input">
        <span>&#x66D;</span>
        <input v-model="credentials.password" type="password" name="password" placeholder="Heslo" autocomplete="current-password" required>
      </div>
      <div class="input">
        <span>&#x66D;</span>
        <input v-model="credentials.repeatPassword" type="password" name="password" placeholder="Zopakovať heslo" autocomplete="new-password" required>
      </div>
      <div v-if="error" class="error">{{error}}</div>
      <button :disabled="registerStart" type="submit">
        <span>Registrovať</span>
        <div v-if="registerStart" class="loader"></div>
      </button>
    </form>
    <router-link to="/login" class="link">Už máte účet?</router-link>
  </main>
</template>

<script setup>
import { notify } from "@kyvg/vue3-notification"
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '../auth/main.js'
import '../styles/auth.scss'

const router = useRouter()
const error = ref(null)
const registerStart = ref(false)

const credentials = reactive({ email: null, password: null, repeatPassword: null })
const register = () => {
  const { email, password, repeatPassword } = credentials

  if(password !== repeatPassword){
    error.value = 'Hesla sa nezhodujú'
    return
  }
  
  registerStart.value = true

  Auth.register({ email, password })
  .then(res => { 
    notify({ type: 'success', text: res.message })
    router.push('/login')
  })
  .catch(error => notify({ type: 'error', text: error.message || 'Niečo sa pokazilo'}))
  .finally(() => { 
    error.value = null
    registerStart.value = false
  })
}
</script>