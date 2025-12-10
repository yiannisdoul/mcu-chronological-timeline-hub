import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

// 1. Create the app instance FIRST
const app = createApp(App)

// 2. Install plugins (router)
app.use(router)

// 3. Mount to the HTML
app.mount('#app')