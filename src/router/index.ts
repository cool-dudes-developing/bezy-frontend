import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import User from '@/models/User'
import EditorSidebar from '@/layouts/EditorSidebar.vue'
import ProjectSidebar from '@/layouts/ProjectSidebar.vue'
import FrontendEditorSidebar from '@/layouts/FrontendEditorSidebar.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: { name: 'platform'}
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/platform',
    name: 'platform',
    redirect: { name: 'recent' },
    component: () => import(/* webpackChunkName: "platform" */ '../layouts/AppLayout.vue'),
    beforeEnter: (to, from, next) => {
      if (User.isAuthorized()) {
        next()
      } else {
        next({ name: 'auth-home' })
      }
    },
    children: [
      {
        path: 'recent',
        name: 'recent',
        component: () => import(/* webpackChunkName: "recent" */ '../views/RecentView.vue')
      },
      {
        path: '404',
        name: '404',
        component: () => import(/* webpackChunkName: "404" */ '../views/404View.vue')
      },
      {
        path: 'test-editor',
        name: 'test-editor',
        component: () =>
          import(/* webpackChunkName: "test-editor" */ '../views/TestEditorView.vue'),
        meta: {
          sidebar: EditorSidebar,
          header: EditorSidebar
        }
      },
      {
        path: 'test-frontend',
        name: 'test-frontend',
        component: () =>
          import(/* webpackChunkName: "test-editor" */ '../views/FrontendEditorView.vue'),
        meta: {
          sidebar: FrontendEditorSidebar
        }
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import(/* webpackChunkName: "projects" */ '../views/ProjectsView.vue')
      },
      {
        path: 'projects/create',
        name: 'createProject',
        component: () =>
          import(/* webpackChunkName: "createProject" */ '../views/ProjectCreateView.vue')
      },
      {
        path: 'projects/:project',
        name: 'project',
        redirect: { name: 'projectBackend' },
        component: () => import(/* webpackChunkName: "project" */ '../views/ProjectView.vue'),
        meta: {
          sidebar: ProjectSidebar
        },
        children: [
          {
            path: 'backend',
            name: 'projectBackend',
            component: () =>
              import(/* webpackChunkName: "projectBackend" */ '../views/ProjectBackendView.vue')
          },
          {
            path: 'methods',
            name: 'methods',
            component: () => import(/* webpackChunkName: "methods" */ '../views/MethodsView.vue')
          },
          {
            path: 'endpoints',
            name: 'endpoints',
            component: () =>
              import(/* webpackChunkName: "endpoints" */ '../views/EndpointsView.vue')
          },
          {
            path: 'methods/create',
            name: 'methodCreate',
            component: () =>
              import(/* webpackChunkName: "methodCreate" */ '../views/MethodCreateView.vue')
          },
          {
            path: 'endpoints/create',
            name: 'endpointCreate',
            component: () =>
              import(/* webpackChunkName: "endpointCreate" */ '../views/EndpointCreateView.vue')
          },
          {
            path: 'methods/:method',
            name: 'method',
            component: () => import(/* webpackChunkName: "method" */ '../views/MethodView.vue')
          },
          {
            path: 'endpoints/:endpoint',
            name: 'endpoint',
            component: () => import(/* webpackChunkName: "endpoint" */ '../views/EndpointView.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/AuthView.vue'),
    beforeEnter: (to, from, next) => {
      if (User.isAuthorized()) {
        console.log('token exists, redirecting to platform')
        next({ name: 'platform' })
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
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: { name: '404' }
  },
  {
    path: '/frontendbuilder',
    name: 'frontendBuilder',
    component: () => import(/* webpackChunkName: "frontendBuilder" */ '../views/FrontendEditorView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
