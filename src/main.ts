import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'
import { createApp } from 'vue'
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
  axios.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')}`
}

createApp(App).use(router).use(createPinia().use(createORM())).mount('#app')
