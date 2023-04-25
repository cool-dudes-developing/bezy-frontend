import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'

import App from './App.vue'
import router from './router'

import '@/style/index.css'
import axios from 'axios'
import User from './models/User'

axios.interceptors.response.use((response) => {
  // if the response is a 401, token invalid
  if (response.status === 401) {
    User.logout()
  }
  return response
})

// set token in header
if (localStorage.getItem('token')) {
  console.log('token found')
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
}

const app = createApp(App)

app.use(createPinia().use(createORM()))
app.use(router)

import { SpinnerKey } from '@/symbols'
import SvgIconVue from './components/SvgIcon.vue'
app.provide(SpinnerKey, {
  visible: ref(false),
  show() {
    this.visible.value = true
  },
  hide() {
    this.visible.value = false
  }
})

app.component('svg-icon', SvgIconVue)

app.mount('#app')
