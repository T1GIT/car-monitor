import { createRouter, createWebHistory } from 'vue-router'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { createApp } from 'vue'
import App from '@/App.vue'
import { RouteName } from '@/shared/constants/route-name'
import { primeVueConfig } from '@/core/constants/prime-vue-config'
import { mapRoute } from '@/map/router'
import { carsRoute } from '@/cars/router'

const app = createApp(App)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: { name: RouteName.MAP } },
    mapRoute,
    carsRoute,
  ],
})
app.use(router)

app
  .use(PrimeVue, primeVueConfig)
  .use(ToastService)

app.mount('#app')
