import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import pinia from '@/stores/index'

import App from './App.vue'
import router from './router'
import 'iconify-icon'

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(ElementPlus)

app.mount('#app')
