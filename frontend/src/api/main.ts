const baseURL = import.meta.env.VITE_BASE_URL
import Auth from '../auth/main'
import store from '../store/index'

type Options = {
  method?: 'GET' | 'PATCH' | 'POST' | 'PUT' | 'CONNECT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE'
  headers?: Object
  body?: string
}

const makeRequest = <T>({
  endpoint,
  options
}: {
  endpoint: string,
  options?: Options
}): Promise<T> => {
  let request = new Request(`${baseURL}${endpoint}`, {
    method: options?.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(store.state.credentials.accessToken ? { 'access-token': store.state.credentials.accessToken } : undefined),
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
                ...store.state.credentials.accessToken ? { 'access-token': store.state.credentials.accessToken } : {},
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

export default makeRequest