// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Contact from '../pages/Contact.vue';
import Search from '../pages/Search.vue';
import Tools from '../pages/Tools.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import { auth } from '../firebase';

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/search', component: Search },
  { path: '/tools', component: Tools },
  { path: '/login', component: Login },
  { path: '/register', component: Register }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 导航守卫，保护需要认证的路由
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    next('/login');
  } else {
    next();
  }
});

export default router;
