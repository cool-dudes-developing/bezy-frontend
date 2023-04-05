import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/hub',
    name: 'hub',
    component: () =>
      import(/* webpackChunkName: "hub" */ '../views/HubView.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () =>
      import(/* webpackChunkName: "auth" */ '../views/AuthView.vue'),
    children: [
      {
        path: 'login',
        component: () =>
          import(/* webpackChunkName: "login" */ '../components/LoginForm.vue')
      },
      {
        path: 'register',
        component: () =>
          import(
            /* webpackChunkName: "login" */ '../components/RegisterForm.vue'
          )
      }
    ]
  },
  {
    path: '/projects/:project',
    name: 'project',
    component: () =>
      import(/* webpackChunkName: "project" */ '../views/ProjectView.vue')
  },
  {
    path: '/projects/:project/endpoints/:endpoint',
    name: 'endpoint',
    component: () =>
      import(/* webpackChunkName: "endpoint" */ '../views/EndpointView.vue')
  },
  {
    path: '/projects/:project/methods/:method',
    name: 'method',
    component: () =>
      import(/* webpackChunkName: "method" */ '../views/MethodView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
