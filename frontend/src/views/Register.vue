<template>
  <main class="login">
    <BasicButton class="close" type="close" @handleClick="history.state.back === null ? router.push('/') : router.go(-1)">Zavrieť</BasicButton>
    <div class="outter">
      <section class="form">
        <header>
          <span v-font:medium>Registrácia</span>
        </header>
        <form class="form" @submit.prevent="register" autocomplete="off">
          <AuthInput
            icon="account_circle"
            v-model="credentials.email"
            type="email"
            :required="true"
            placeholder="Emailová adresa"
          />
          <AuthInput
            icon="key"
            v-model="credentials.password"
            type="password"
            :required="true"
            placeholder="Heslo"
          />
          <AuthInput
            icon="key"
            v-model="credentials.repeatPassword"
            type="password"
            :required="true"
            placeholder="Zopakovať heslo"
          />
          <div v-if="error" class="error">{{error}}</div>
          <button :disabled="registerStart">
            <span>Registrovať</span>
            <Loader v-if="registerStart" type="inline" style="border-color: white;border-top-color: transparent;" />
          </button>
        </form>
        <router-link
          v-font:small
          tabindex="0"
          to="/login"
          class="link"
        >Už máte účet?</router-link>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import Loader from '../components/Loader.vue'
import { notify } from "@kyvg/vue3-notification"
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import '../styles/auth.scss'
import BasicButton from '../components/Buttons/BasicButton.vue'
import AuthInput from '../components/Auth/AuthInput.vue'

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

  if(password !== repeatPassword) return error.value = 'Hesla sa nezhodujú'
  
  registerStart.value = true

  registerUser({ email, password })
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

async function registerUser({ email, password }: {
    email: string
    password: string
  }): Promise<{
    success: boolean
    message: string
  }>{
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        
        if(data.success === false) throw(data.message)
      
        resolve({ success: true, message: 'Úspešná registrácia' })
      } catch (error) {
        reject({ success: false, message: error })
      }
    })
  }
</script>