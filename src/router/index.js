import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register'
import Login from '../views/Login'
import userInfo from '../views/userInfo'
import Home from '../views/Home'
import Article from '../views/Article'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      keepAlive: true
    },
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/userinfo',
    name: 'userinfo',
    component: userInfo
  },
  {
    path: '/article/:id',
    name: 'article',
    component: Article
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name === 'userinfo' && !localStorage.getItem('token')) return next({ name: 'login' })
  next()
})

export default router
