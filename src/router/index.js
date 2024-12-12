import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Search from '../pages/Search.vue'
import Tools from '../pages/Tools.vue'
import Contact from '../pages/Contact.vue'
import About from '../pages/About.vue'

const routes = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/search', component: Search, name: 'Search' },
  { path: '/tools', component: Tools, name: 'Tools' },
  { path: '/contact', component: Contact, name: 'Contact' },
  { path: '/about', component: About, name: 'About' },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router