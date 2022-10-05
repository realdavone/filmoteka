const baseURL = import.meta.env.VITE_BASE_URL
import store from '../store/index'
import router from '../router/index'

const Auth = {
  login({ email, password }){
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${baseURL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })
        const data = await res.json()
        
        if(data.success === false) { throw(data.message) }
      
        store.methods.credentials.set(data.user, data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
      
        resolve({ success: true, message: 'Úspešné prihlásenie' })
      } catch (error) { reject({ success: false, message: error }) }
    })
  },
  logout(){
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
  refresh(refreshToken){
    return new Promise(async (resolve, reject) => {
      if(refreshToken === null) { reject('Žiadny token'); return }

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
  register({ email, password }){
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
  google(token){
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

export default Auth