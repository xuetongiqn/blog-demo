import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    }
  },
  theme: {
    defaultTheme: 'dark'
  }
})

import './assets/main.css'


import Main from './Main.vue'
import List from './List.vue'
import Detail from './Detail.vue'
import Create from './Create.vue'


const app = createApp(Main)

const routes = [
  { path: '/', redirect: '/List' },
  { path: '/List', component: List },
  { path: '/Detail/:id', component: Detail },
  { path: '/Create', component: Create },
  { path: '/Edit/:id', component: Create },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

app.use(router)
app.use(vuetify)

app.mount('#app')