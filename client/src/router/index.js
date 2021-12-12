import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
  },
  {
    path: '/user/signin',
    name: 'SignIn',
    component: () =>
      import(/* webpackChunkName: "signin" */ '../views/SignIn.vue'),
  },
  {
    path: '/user/signup',
    name: 'SignUp',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/SignUp.vue'),
  },
  {
    path: '/user/settings',
    name: 'UserSettings',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/UserSettings.vue'),
  },
  {
    path: '/404',
    alias: '*',
    name: 'notFound',
    component: () =>
      import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     // this route requires auth, check if logged in
//     // if not, redirect to login page.
//     if (!auth.loggedIn()) {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath },
//       })
//     } else {
//       next()
//     }
//   } else {
//     next() // make sure to always call next()!
//   }
// })

export default router
