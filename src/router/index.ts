import { createWebHistory, createRouter } from 'vue-router'

import HomePage from '../pages/home/HomePage.vue'
import PokedexPage from '../pages/pokedex/PokedexPage.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/pokedex', component: PokedexPage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { router }
