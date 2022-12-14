<template>
  <main class="login">
    <div class="outter">
      <section class="form">
        <header>
          <span>Prihlásenie</span>
          <CloseButton @click="history.state.back === null ? router.push('/') : router.go(-1)"/>
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
            <Loader v-if="loginStart" color="white" :border="'3px'" />
          </button>
          <div id="buttonDiv" style="align-self:center;height:32px;"></div>
        </form>
        <router-link tabindex="0" v-if="store.state.globalSettings?.allowRegistration" to="/register" class="link">Ešte nemáte účet?</router-link>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import CloseButton from '../components/Buttons/CloseButton.vue'
import Loader from '../components/Loader.vue'
import { notify } from "@kyvg/vue3-notification"
import { reactive, inject, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '../auth/main'
import '../styles/auth.scss'

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