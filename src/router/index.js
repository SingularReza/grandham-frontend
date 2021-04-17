import { createRouter, createWebHistory } from 'vue-router'
import Libraries from '../views/Libraries.vue'

const routes = [
  {
    path: '/',
    name: 'Libraries',
    component: Libraries
  },
  {
    path: '/library/:type/:id/:range',
    name: 'Items',
    component: () => import(/* webpackChunkName: "about" */ '../views/Items.vue')
  },
  {
    path: '/item/:type/:id',
    name: 'ItemInfo',
    component: () => import(/* webpackChunkName: "about" */ '../views/ItemInfo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
