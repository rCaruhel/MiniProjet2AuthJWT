import Vue from 'vue'
import VueRouter from 'vue-router'
import MainPage from '../views/homeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/loginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/registerView.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
