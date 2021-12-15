import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

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
    meta: { requiresAuth: true },
  },
  {
    path: '/dashboard/factory',
    name: 'factory',
    component: () =>
      import(
        /* webpackChunkName: "factorytable" */ '../views/FactoryTable.vue'
      ),
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
    meta: { requiresAuth: true },
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

const originalPush = router.push
router.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }

  return originalPush.call(this, location).catch((err) => {
    if (VueRouter.isNavigationFailure(err)) {
      return err
    }

    return Promise.reject(err)
  })
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.user) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export default router
