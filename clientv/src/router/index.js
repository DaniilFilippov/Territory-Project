import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GlobalMap from '../views/GlobalMap.vue'
import MyRegister from '@/components/MyRegister'
import MyLands from '@/components/MyLands'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/globalmap',
    name: 'globalmap',
    component: GlobalMap
  },
  {
    path: '/register',
    name: 'MyRegister',
    component: MyRegister
  }, 
  {
    path: '/lands',
    name: 'MyLands',
    component: MyLands
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
