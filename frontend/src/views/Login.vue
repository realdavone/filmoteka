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
          <span v-font:large>Prihlásenie</span>
          </header>
        <form class="form" @submit.prevent="login">
          <div class="input">
            <input
              v-font:medium
              v-model="credentials.email"
              type="email"
              name="email"
              placeholder="Email"
              autocomplete="email"
              required
              autocapitalize="off"
              autocorrect="off"
            />
          </div>
          <div class="input">
            <input
              v-font:medium
              v-model="credentials.password"
              type="password"
              name="password"
              placeholder="Heslo"
              autocomplete="current-password"
              required
              autocapitalize="off"
              autocorrect="off"
            />
          </div>
          <BasicButton :disabled="loginStart">
            <span>{{ !loginStart ? 'Prihlásiť' : 'Prihlasovanie' }}</span>
            <Loader v-if="loginStart" type="inline" />
          </BasicButton>
          <div class="google-button" style="width:100%;overflow:hidden;display:flex;justify-content:center;border-radius: 4px;">
            <div id="buttonDiv" style="align-self:center;height:32px;"></div>
          </div>
        </form>
        <router-link
          v-font:small
          tabindex="0"
          v-if="store.state.globalSettings?.allowRegistration"
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
import Auth from '../auth/main'
import '../styles/auth.scss'
import BasicButton from '../components/Buttons/BasicButton.vue'

const router = useRouter()
const store = inject<any>('store')

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
  Auth.login({ email: credentials.email, password: credentials.password })
  .then(res => {
    window.history.state.back === null ? router.push('/') : router.go(-1)
    notify({ type: 'success', text: res.message })
  })
  .catch(error => notify({ type: 'error', text: error.message }) )
  .finally(() => loginStart.value = false)
}
</script>