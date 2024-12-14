// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Contact from '../pages/Contact.vue';
import Search from '../pages/Search.vue';
import Tools from '../pages/Tools.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import PhoneLogin from '../components/PhoneLogin.vue'; // 导入 PhoneLogin 组件
import ForgotPassword from '../components/ForgotPassword.vue'; // 导入 ForgotPassword 组件
import { auth } from '../firebase';

const routes = [
  { path: '/', redirect: '/home' },
  { 
    path: '/home', 
    component: Home, 
    meta: { requiresAuth: true } 
  },
  { path: '/about', component: () => import('../pages/About.vue') },
  { path: '/contact', component: () => import('../pages/Contact.vue') },
  { path: '/search', component: () => import('../pages/Search.vue') },
  { path: '/tools', component: () => import('../pages/Tools.vue') },
  { path: '/login', component: () => import('../components/Login.vue') },
  { path: '/register', component: () => import('../components/Register.vue') },
  { path: '/phone-login', component: () => import('../components/PhoneLogin.vue') }, // 懒加载
  { path: '/forgot-password', component: () => import('../components/ForgotPassword.vue') }, // 懒加载
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
