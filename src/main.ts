import '@csstools/normalize.css'
import '@csstools/normalize.css/opinionated.css'
import './assets/best-practices.css'
import './assets/tailwind-style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
