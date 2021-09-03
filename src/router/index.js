import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/home'
import Login from '../components/login/login.vue'

Vue.use(Router)
// Vue.use(Login)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})

export default router
