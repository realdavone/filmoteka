<template>
  <main class="login">
    <div class="outter">
      <section class="form">
        <header>
          <span>Registrácia</span>
          <BasicButton type="close" @handleClick="history.state.back === null ? router.push('/') : router.go(-1)">Zavrieť</BasicButton>
        </header>
        <form class="form" @submit.prevent="register" autocomplete="off">
          <div class="input">
            <input v-model="credentials.email" type="email" name="email" placeholder="Email" autocomplete="off" required>
          </div>
          <div class="input">
            <input v-model="credentials.password" type="password" name="password" placeholder="Heslo" autocomplete="off" required>
          </div>
          <div class="input">
            <input v-model="credentials.repeatPassword" type="password" name="password" placeholder="Zopakovať heslo" autocomplete="off" required>
          </div>
          <div v-if="error" class="error">{{error}}</div>
          <BasicButton :disabled="registerStart">
            <span>Registrovať</span>
            <Loader v-if="registerStart" color="white" :border="'3px'" />
          </BasicButton>
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
import BasicButton from '../components/Buttons/BasicButton.vue'

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