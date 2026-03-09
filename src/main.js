import { createApp } from 'vue'
import { createPinia } from 'pinia' //phase 2.1

//import {useGameStore}  from

import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia()) //phase 2.1
app.use(router)
app.mount('#app')
