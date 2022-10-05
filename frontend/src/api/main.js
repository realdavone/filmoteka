const baseURL = import.meta.env.VITE_BASE_URL
import Auth from '../auth/main'
import store from '../store/index'

const getData = async ({ endpoint, options }) => {
  try {
    let res = await fetch(`${baseURL}${endpoint}`, options)
    let data = await res.json()

    if(res.status === 401 && localStorage.getItem('refreshToken') !== null) {
      data = Auth.refresh(localStorage.getItem('refreshToken'))
      .then(async () => {
        return new Promise((resolve, reject) => {
          fetch(`${baseURL}${endpoint}`, { method: options?.method, headers: { 'Content-Type': 'application/json', 'access-token': store.state.credentials.accessToken }, body: options?.body })
          .then(res => res.json())
          .then(data => { resolve(data) })
          .catch(error => { reject(error) })
        })
      })
      .catch(() => { 
        Auth.logout()
        return
      })
    }
    return data
  } catch (error) { throw(error) }
}

export default getData