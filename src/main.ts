import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index"
import { createPinia } from 'pinia'
import { appAxios } from './utilities/appAxios'
import axios from "axios"


// Pinia
const pinia = createPinia()
// Vuetify
import "vuetify/styles"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const vuetify = createVuetify({
    components,
    directives
})
const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$appAxios = appAxios;
app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')
