// // src/router/index.js
// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../pages/Home.vue';
// import About from '../pages/About.vue';
// import Contact from '../pages/Contact.vue';
// import Search from '../pages/Search.vue';
// import Tools from '../pages/Tools.vue';
// import Login from '../components/Login.vue';
// import Register from '../components/Register.vue';
// import PhoneLogin from '../components/PhoneLogin.vue'; // 导入 PhoneLogin 组件
// import ForgotPassword from '../components/ForgotPassword.vue'; // 导入 ForgotPassword 组件
// import { auth } from '../firebase';

// const routes = [
//   { path: '/', redirect: '/home' },
//   { 
//     path: '/home', 
//     component: Home, 
//     meta: { requiresAuth: true } 
//   },
//   { path: '/about', component: () => import('../pages/About.vue') },
//   { path: '/contact', component: () => import('../pages/Contact.vue') },
//   { path: '/search', component: () => import('../pages/Search.vue') },
//   { path: '/tools', component: () => import('../pages/Tools.vue') },
//   { path: '/login', component: () => import('../components/Login.vue') },
//   { path: '/register', component: () => import('../components/Register.vue') },
//   { path: '/phone-login', component: () => import('../components/PhoneLogin.vue') }, // 懒加载
//   { path: '/forgot-password', component: () => import('../components/ForgotPassword.vue') }, // 懒加载
// ];
// const router = createRouter({
//   history: createWebHistory(),
//   routes
// });

// // 导航守卫，保护需要认证的路由
// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//   const currentUser = auth.currentUser;

//   if (requiresAuth && !currentUser) {
//     next('/login');
//   } else {
//     next();
//   }
// });

// export default router;


// // src/router/index.js
// import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../pages/Home.vue';
// import About from '../pages/About.vue';
// import Contact from '../pages/Contact.vue';
// import Search from '../pages/Search.vue';
// import Tools from '../pages/Tools.vue';
// import Login from '../components/Login.vue';
// import Register from '../components/Register.vue';
// import PhoneLogin from '../components/PhoneLogin.vue'; // 导入 PhoneLogin 组件
// import ForgotPassword from '../components/ForgotPassword.vue'; // 导入 ForgotPassword 组件
// import { auth } from '../firebase';

// const routes = [
//   { path: '/', redirect: '/home' },
//   { 
//     path: '/home', 
//     component: Home, 
//     meta: { requiresAuth: true }  // 需要登录才能访问的页面
//   },
//   { path: '/about', component: () => import('../pages/About.vue') },
//   { path: '/contact', component: () => import('../pages/Contact.vue') },
//   { path: '/search', component: () => import('../pages/Search.vue') },
//   { path: '/tools', component: () => import('../pages/Tools.vue') },
  
//   // 登录、注册、手机号登录、找回密码页添加 `requiresGuest` 属性
//   { 
//     path: '/login', 
//     component: Login,
//     meta: { requiresGuest: true } // 需要未登录状态才能访问
//   },
//   { 
//     path: '/register', 
//     component: Register,
//     meta: { requiresGuest: true } // 需要未登录状态才能访问
//   },
//   { 
//     path: '/phone-login', 
//     component: PhoneLogin, 
//     meta: { requiresGuest: true } // 需要未登录状态才能访问
//   },
//   { 
//     path: '/forgot-password', 
//     component: ForgotPassword, 
//     meta: { requiresGuest: true } // 需要未登录状态才能访问
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// // 导航守卫，检查用户登录状态
// router.beforeEach(async (to, from, next) => {
//   // 获取认证状态
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // 需要登录的路由
//   const requiresGuest = to.matched.some(record => record.meta.requiresGuest); // 需要未登录的路由

//   // 等待 Firebase 用户认证状态变更
//   const currentUser = await new Promise((resolve) => {
//     auth.onAuthStateChanged((user) => {
//       resolve(user); // 返回用户信息，或者 null
//     });
//   });

//   // 如果页面需要登录，而用户未登录，重定向到登录页面
//   if (requiresAuth && !currentUser) {
//     next('/login');
//   }
//   // 如果页面需要未登录，而用户已登录，重定向到首页
//   else if (requiresGuest && currentUser) {
//     next('/home');
//   }
//   else {
//     next(); // 继续访问目标页面
//   }
// });

// export default router;


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
  
  // 不需要登录即可访问的页面
  { path: '/home', component: Home },  // 不需要登录即可访问

  { path: '/about', component: () => import('../pages/About.vue') },
  { path: '/contact', component: () => import('../pages/Contact.vue') },
  { path: '/search', component: () => import('../pages/Search.vue') },
  { path: '/tools', component: () => import('../pages/Tools.vue') },
  
  // 登录、注册、手机号登录、找回密码页添加 `requiresGuest` 属性
  { 
    path: '/login', 
    component: Login,
    meta: { requiresGuest: true } // 需要未登录状态才能访问
  },
  { 
    path: '/register', 
    component: Register,
    meta: { requiresGuest: true } // 需要未登录状态才能访问
  },
  { 
    path: '/phone-login', 
    component: PhoneLogin, 
    meta: { requiresGuest: true } // 需要未登录状态才能访问
  },
  { 
    path: '/forgot-password', 
    component: ForgotPassword, 
    meta: { requiresGuest: true } // 需要未登录状态才能访问
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 导航守卫，检查用户登录状态
router.beforeEach(async (to, from, next) => {
  // 获取认证状态
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth); // 需要登录的路由
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest); // 需要未登录的路由

  // 等待 Firebase 用户认证状态变更
  const currentUser = await new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user); // 返回用户信息，或者 null
    });
  });

  // 如果页面需要登录，而用户未登录，重定向到登录页面
  if (requiresAuth && !currentUser) {
    next('/login');
  }
  // 如果页面需要未登录，而用户已登录，重定向到首页
  else if (requiresGuest && currentUser) {
    next('/home');
  }
  else {
    next(); // 继续访问目标页面
  }
});

export default router;