const baseURL = import.meta.env.VITE_BASE_URL
import store from '../store/index'
import router from '../router/index'
import { User } from '../store/index'

interface AuthResponse {
  success: boolean
  message: string
}

export default {
  login({
    email,
    password
  }:{
    email: string,
    password: string
  }): Promise<AuthResponse>{
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${baseURL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        const data: {
          accessToken: string
          refreshToken: string
          success: true
          user: User
        } | {
          success: false
          message: string
        } = await res.json()
        
        if(data.success === false) { throw(data.message) }
      
        store.methods.credentials.set(data.user, data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
      
        resolve({ success: true, message: 'Úspešné prihlásenie' })
      } catch (error) { reject({ success: false, message: error }) }
    })
  },
  logout(): Promise<AuthResponse>{
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${baseURL}/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') })
        })
        const data = await res.json()
        
        if(data.success === false) { throw(data.message) }
      
        router.push('/')
        store.methods.credentials.clear()
        resolve({ success: true, message: 'Úspešné odhlásenie' })
      } catch (error) { reject({ success: false, message: error }) }
    })
  },
  refresh(refreshToken: string | null): Promise<AuthResponse>{
    return new Promise(async (resolve, reject) => {
      if(refreshToken === null) return reject('Žiadny token')

      try {
        const res = await fetch(`${baseURL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify({ refreshToken })
        })
        const data = await res.json()
        
        if(data.success === false) { throw(data.message) }
      
        store.methods.credentials.set(data.user, data.accessToken)
      
        resolve({ success: true, message: 'Úspešné prihlásenie' }) 
      } catch (error) { reject({ success: false, message: error }) }
    })
  },
  register({
    email,
    password
  }:{
    email: string,
    password: string
  }): Promise<AuthResponse>{
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${baseURL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        
        if(data.success === false) { throw(data.message) }
      
        resolve({ success: true, message: 'Úspešná registrácia' })
      } catch (error) { reject({ success: false, message: error }) }
    })
  },
  google(token: string): Promise<AuthResponse>{
    return new Promise(async(resolve, reject) => {
      try {
        const res = await fetch(`${baseURL}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        })
        const data = await res.json()
        
        if(data.success === false) { throw(data.message) }

        store.methods.credentials.set(data.user, data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)

        resolve({ success: true, message: 'Úspešné prihlásenie' })
      } catch (error) { reject({ success: false, message: error }) }
    })
  }
}