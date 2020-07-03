import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// const fullCalendar = () => import(/* webpackChunkName: "login_home_welcome" */ './components/fullCalendar.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
    // redirect: '/welcome',
    // children: [
    //   { path: '/welcome', component: fullCalendar }
    // ]
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
