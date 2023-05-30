import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import User from '@/models/User'
import EditorSidebar from '@/layouts/EditorSidebar.vue'
import ProjectSidebar from '@/layouts/ProjectSidebar.vue'
import FrontendEditorSidebar from '@/layouts/FrontendEditorSidebar.vue'

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
        component: () => import(/* webpackChunkName: "recent" */ '../views/HubView.vue')
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
        component: () => import(/* webpackChunkName: "project" */ '../views/ProjectView.vue'),
        meta: {
          sidebar: ProjectSidebar
        }
      },
      {
        path: 'projects/:project/methods',
        name: 'methods',
        component: () => import(/* webpackChunkName: "methods" */ '../views/MethodsView.vue')
      },
      {
        path: 'projects/:project/endpoints',
        name: 'endpoints',
        component: () => import(/* webpackChunkName: "methods" */ '../views/EndpointsView.vue')
      },
      {
        path: 'projects/:project/methods/:method',
        name: 'method',
        component: () => import(/* webpackChunkName: "method" */ '../views/MethodView.vue')
      },
      {
        path: '/projects/:project/endpoints/:endpoint',
        name: 'endpoint',
        component: () => import(/* webpackChunkName: "endpoint" */ '../views/EndpointView.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
