import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引用pinia
import { createPinia } from 'pinia'

const app = createApp(App)
// 将路由注册为插件，use() 需要在 mount() 之前调用
app.use(router)
// 创建一个 pinia 实例 (根 store) 并将其传递给应用
app.use(createPinia())
app.mount('#app')
