import { createPinia } from 'pinia'
import { createORM } from 'pinia-orm'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/index.css'

createApp(App).use(router).use(createPinia().use(createORM())).mount('#app')
