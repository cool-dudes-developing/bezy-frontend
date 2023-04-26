import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import User from '@/models/User'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/hub',
    name: 'hub',
    redirect: { name: 'hub-home' },
    component: () => import(/* webpackChunkName: "hub" */ '../layouts/AppLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (User.isAuthorized()) {
        next()
      } else {
        next({ name: 'auth-home' })
      }
    },
    children: [
      {
        path: '',
        name: 'hub-home',
        component: () => import(/* webpackChunkName: "hub-home" */ '../views/HubView.vue')
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/AuthView.vue'),
    beforeEnter: (to, from, next) => {
      if (User.isAuthorized()) {
        console.log('token exists, redirecting to hub')
        next({ name: 'hub' })
      } else {
        next()
      }
    },
    children: [
      {
        path: '',
        name: 'auth-home',
        redirect: { name: 'login' }
      },
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/LoginView.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/RegisterView.vue')
      },
      {
        path: 'reset',
        name: 'reset',
        component: () => import(/* webpackChunkName: "reset" */ '../views/ResetView.vue')
      }
    ]
  },
  {
    path: '/projects/create',
    name: 'createProject',
    component: () =>
      import(/* webpackChunkName: "createProject" */ '../views/ProjectCreateView.vue')
  },
  {
    path: '/projects/:project',
    name: 'project',
    component: () => import(/* webpackChunkName: "project" */ '../views/ProjectView.vue'),
    children: [
      {
        path: 'methods',
        name: 'methods',
        component: () => import(/* webpackChunkName: "methods" */ '../views/MethodsView.vue')
      },
      {
        path: 'endpoints',
        name: 'endpoints',
        component: () => import(/* webpackChunkName: "methods" */ '../views/EndpointsView.vue')
      }
    ]
  },
  {
    path: '/projects/:project/endpoints/:endpoint',
    name: 'endpoint',
    component: () => import(/* webpackChunkName: "endpoint" */ '../views/EndpointView.vue')
  },
  {
    path: '/projects/:project/methods/:method',
    name: 'method',
    component: () => import(/* webpackChunkName: "method" */ '../views/MethodView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
