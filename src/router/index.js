import { createRouter, createWebHistory } from 'vue-router'
import Libraries from '../views/Libraries.vue'

const routes = [
  {
    path: '/',
    name: 'Libraries',
    component: Libraries
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/library/:type/:id/:range',
    name: 'Items',
    component: () => import(/* webpackChunkName: "about" */ '../views/Items.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
