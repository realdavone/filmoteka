<template>
  <main class="login">
    <div class="outter">
      <section class="form">
        <header>
          <span>Registrácia</span>
          <CloseButton @click="history.state.back === null ? router.push('/') : router.go(-1)"/>
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
            <Loader v-if="registerStart" color="white" :border="'3px'" />
          </button>
        </form>
        <router-link tabindex="0" to="/login" class="link">Už máte účet?</router-link>

      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import CloseButton from '../components/Buttons/CloseButton.vue'
import Loader from '../components/Loader.vue'
import { notify } from "@kyvg/vue3-notification"
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '../auth/main'
import '../styles/auth.scss'

const router = useRouter()
const error = ref<null | string>(null)
const registerStart = ref(false)

const history = window.history

const credentials = reactive<{
  email: string
  password: string
  repeatPassword: string
}>({ email: '', password: '', repeatPassword: '' })
const register = () => {
  const { email, password, repeatPassword } = credentials

  if(password !== repeatPassword){ return error.value = 'Hesla sa nezhodujú' }
  
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