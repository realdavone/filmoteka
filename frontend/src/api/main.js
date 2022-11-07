const baseURL = import.meta.env.VITE_BASE_URL
import Auth from '../auth/main'
import store from '../store/index'

const makeRequest = async ({ endpoint, options }) => {
  try {
    let res = await fetch(`${baseURL}${endpoint}`, { 
      ...(store.state.credentials.accessToken !== null ? { headers: { 'access-token': store.state.credentials.accessToken, ...options?.headers } } : null),
      ...options
    })
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
        .catch(() => Auth.logout() )
    }
    return data
  } catch (error) { return new Error(error) }
}

const makeRequestFetchThen = ({ endpoint, options }) => {
  let request = new Request(`${baseURL}${endpoint}`, {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      'access-token': store.state.credentials.accessToken,
    },
    body: options?.body
  })

  return new Promise((resolve, reject) => {
    return fetch(request.clone())
    .then(res => {
      if(res.ok) return res.json()
      else {
        if(res.status === 401 && localStorage.getItem('refreshToken') !== null){
          return Auth.refresh(localStorage.getItem('refreshToken'))
          .then(() => {
            let request = new Request(`${baseURL}${endpoint}`, {
              method: options?.method || 'GET',
              headers: {
                'Content-Type': 'application/json',
                'access-token': store.state.credentials.accessToken,
              },
              body: options?.body
            })
            
            return fetch(request.clone())
            .then(res => res.json())
            .catch(err => err)
          })
        }
        else { throw new Error('Niečo sa pokazilo.') }
      }
    })
    .then(data => {
      resolve(data)
    })
    .catch(error => {
      reject(error)
    })
  })
}

export default makeRequestFetchThen