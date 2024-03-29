import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'
import useTitle from '../composables/title'
import { useAuthStore } from '../store/auth'
import { useGlobalConfigStore } from '../store/global-config'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Domov' }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    children: [
      { path: '', name: 'Multi', component: () => import('../views/Search/MultiSearch.vue') },
      { path: 'movie', meta: { type: 'movie' }, component: () => import('../views/Search/SubSearch.vue') },
      { path: 'tv', meta: { type: 'tv' }, component: () => import('../views/Search/SubSearch.vue') },
      { path: 'person', meta: { type: 'person' }, component: () => import('../views/Search/SubSearch.vue') }
    ],
    meta: { title: 'Vyhľadávanie' }
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import('../views/Library.vue'),
    meta: { title: 'Knižnica' }
  },
  {
    path: '/recommended',
    name: 'Recommended',
    component: () => import('../views/Recommended.vue'),
    meta: { title: 'Odporúčané' }
  },
  {
    path: '/movie/:id',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
    meta: { title: 'Film' }
  },
  {
    path: '/tv/:id',
    name: 'Tv',
    component: () => import('../views/TV.vue'),
    meta: { title: 'TV' }
  },
  {
    path: '/person/:id',
    name: 'Person',
    component: () => import('../views/Person.vue'),
    meta: { title: 'Tvorca' }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('../views/NotFound.vue'),
    meta: { title: 'Nenájdené' }
  },
  {
    path: '/:catchAll(.*)',
    redirect: '404'
  },
  {
    path: '/dmca',
    name: 'DMCA',
    component: () => import('../views/DMCA.vue'),
    meta: { title: 'DMCA' }
  },
  {
    path: '/collection/:id',
    name: 'Collection',
    component: () => import('../views/Collection.vue'),
    meta: { title: 'Kolekcia' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      hideNav: true,
      denyAccessAsLoggedIn: true,
      title: 'Prihlásenie'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { 
      hideNav: true,
      denyAccessAsLoggedIn: true,
      title: 'Registrácia'
    },
    beforeEnter: () => {
      const globalConfigStore = useGlobalConfigStore()
      if(!globalConfigStore.globalConfig?.allowRegistration) return '/'
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      title: 'Admin',
      hideNav: true,
      hideFooter: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => (savedPosition ?? { top: 0 }) 
})

async function getRedirect(to: RouteLocationNormalized) {
  const authStore = useAuthStore()

  if(to.meta.denyAccessAsLoggedIn && authStore.isLoggedIn) return Promise.resolve('/') 
  if(to.name === 'Admin' && !authStore.isLoggedIn) return Promise.resolve('/login')

  return Promise.resolve(undefined)
} 

router.beforeEach(async (to, from, next) => {
  const redirect: Awaited<ReturnType<typeof getRedirect>> = await getRedirect(to)

  if(redirect) return next(redirect)
  next()
})

router.afterEach((to) => {
  useTitle({ title: to.meta?.title as string ?? '' })
})

export default router
