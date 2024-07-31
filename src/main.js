import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './styles.css'

import App from './App.vue'
import router from './router'
import api from './plugins/axios'

const pinia = createPinia()
const app = createApp(App)

app.config.globalProperties.$axios = api

app.use(pinia)
app.use(router)
app.mount('#app')
