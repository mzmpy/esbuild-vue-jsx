import { createApp } from 'vue'
import router from './router'
import App from './App.js'
import 'element-plus/dist/index.css'

// Bundler Build Feature Flags
globalThis.__VUE_OPTIONS_API__ = true;
globalThis.__VUE_PROD_DEVTOOLS__ = false;

const app = createApp(App)
app.use(router)
app.mount('#app')
