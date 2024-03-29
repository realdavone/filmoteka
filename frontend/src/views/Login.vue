<template>
  <main class="login">
    <BasicButton
      type="close"
      @handleClick="history.state.back === null ? router.push('/') : router.go(-1)"
      class="close"
    >Zavrieť</BasicButton>
    <div class="outter">
      <section class="form">
        <header>
          <span v-font:medium>Prihlásenie</span>
        </header>
        <form class="form" @submit.prevent="login">
          <AuthInput
            icon="account_circle"
            placeholder="Emailová adresa"
            type="email"
            :required="true"
            v-model="credentials.email"
          />
          <AuthInput
            icon="key"
            placeholder="Heslo"
            type="password"
            :required="true"
            v-model="credentials.password"
          />
          <button :disabled="loginStart">
            <span>{{ !loginStart ? 'Prihlásiť' : 'Prihlasovanie' }}</span>
            <Loader v-if="loginStart" type="inline" style="border-color: white;border-top-color: transparent;" />
          </button>
          <div class="alt">
            <div class="google-button">
              <div id="buttonDiv" role="button" style="align-self:center;height:32px;"></div>
            </div>            
          </div>
        </form>
        <router-link
          v-font:small
          tabindex="0"
          v-if="globalSettingsStore.globalConfig?.allowRegistration"
          to="/register"
          class="link"
        >Ešte nemáte účet?</router-link>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import Loader from '../components/Loader.vue'
import { notify } from "@kyvg/vue3-notification"
import { reactive, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import '../styles/auth.scss'
import BasicButton from '../components/Buttons/BasicButton.vue'
import AuthInput from '../components/Auth/AuthInput.vue'
import { useGlobalConfigStore } from '../store/global-config'
import { useAuthStore } from '../store/auth'

const router = useRouter()

const globalSettingsStore = useGlobalConfigStore()
const authStore = useAuthStore()

const credentials = reactive<{
  email: string
  password: string
}>({
  email: '',
  password: ''
})
const loginStart = ref(false)
const history = window.history

onMounted(() => {
  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    callback: (response) => {
      loginStart.value = true
      authStore.google(response.credential)
      .then(res => {
        window.history.state.back === null ? router.push('/') : router.go(-1)
        notify({ type: 'success', text: res.message })
      })
      .catch(error => notify({ type: 'error', text: error.message }) )
      .finally(() => loginStart.value = false)
    }
  })
  google.accounts.id.renderButton(
    document.getElementById("buttonDiv") as HTMLElement, {
      theme: 'filled_black',
      size: "medium",
      text: 'signin_with',
      shape: 'rectangular',
      type: 'standard',
      width: '352',
      logo_alignment: 'center'
    }
  )
})

const login = () => {
  loginStart.value = true
  authStore.login({ email: credentials.email, password: credentials.password })
    .then(res => {
      window.history.state.back === null ? router.push('/') : router.go(-1)
      notify({ type: 'success', text: res.message })
    })
    .catch(error => notify({ type: 'error', text: error.message }) )
    .finally(() => loginStart.value = false)
}
</script>