<!-- <template>
  <div id="app">
    <NavBar />
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const user = ref(null);

    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
    });

    return { user };
  }
};
</script>




<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background-color: #0b0b0bbe;
  color: #e1e1e1;
}

a {
  color: #6c5ce7;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

h1, h2, h3, h4, h5, h6 {
  color: #ffffff;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
#app {
  text-align: center;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0rem;
}






/* 🔹 按钮样式 */
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

button:focus, button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.button {
  width: 100%; 
  background-color: #5f5e695d;
  color: #ffffff;
  font-size: 18px;
  border: none;
  padding: 14px 0;
  border-radius: 12px; 
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-sizing: border-box; 
}

.button:hover {
  background-color: #3232323e;
}


/* 🔹 加载动画 */
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  border-top-color: #6c5ce7;
  animation: spin 1s infinite linear;
  display: inline-block;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.content-wrapper {
  width: 100%;
  max-width: 400px; /* 设置最大宽度 */
  padding-top: 30px;
  margin: 0 auto; /* 居中对齐 */
  display: block; /* 保持块级元素 */
  height: 100%;
  box-sizing: border-box; /* 包括内边距在内 */
}
</style> -->

<template>
  <div id="app">
    <NavBar />
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ref } from 'vue';

export default {
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const user = ref(null);

    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
    });

    return { user };
  }
};
</script>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  background-color: #0b0b0bbe;
  color: #e1e1e1;
}

a {
  color: #6c5ce7;
  text-decoration: inherit;
}

a:hover {
  color: #535bf2;
}

h1, h2, h3, h4, h5, h6 {
  color: #ffffff;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

#app {
  text-align: center;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0rem;
}

/* 🔹 按钮样式 */
button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:hover {
  border-color: #646cff;
}

button:focus, button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.button {
  width: 100%;
  background-color: #5f5e695d;
  color: #ffffff;
  font-size: 18px;
  border: none;
  padding: 14px 0;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-sizing: border-box;
}

.button:hover {
  background-color: #3232323e;
}

/* 🔹 加载动画 */
.loader {
  width: 20px;
  height: 20px;
  border: 3px solid #ffffff;
  border-radius: 50%;
  border-top-color: #6c5ce7;
  animation: spin 1s infinite linear;
  display: inline-block;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 🔹 内容包装器 */
.content-wrapper {
  width: 100%;
  max-width: 400px; /* 设置最大宽度 */
  padding-top: 30px;
  margin: 0 auto; /* 居中对齐 */
  display: block; /* 保持块级元素 */
  height: 100%;
  box-sizing: border-box; /* 包括内边距在内 */
}


/* ================================
   汉堡菜单与底部内容的调整
================================ */

/* 移动端菜单样式 */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100%; /* 保证菜单高度占满整个屏幕 */
  background-color: #0d1117;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 向上对齐内容 */
  align-items: center;
  z-index: 1000;
  padding-top: 20px;
  box-sizing: border-box;
  overflow: hidden; /* 防止滚动条 */
}

/* 菜单项的样式 */
.mobile-nav-link {
  color: #ffffff;
  font-size: 20px;
  margin: 15px 0;
  text-decoration: none;
}

/* 底部用户信息部分的样式 */
.auth-container {
  width: 100%; /* 容器宽度占据整个菜单宽度 */
  background-color: #1e2127; /* 背景色 */
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
  margin-top: auto; /* 让这个容器推到底部 */
}

/* 用户头像和信息的样式 */
.user-info {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 10px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column; /* 垂直排列用户角色和邮箱 */
  justify-content: flex-start;
}

.user-role {
  color: #ff6b6b;
  font-weight: bold;
}

.user-email {
  color: #fff;
  font-size: 14px;
}

/* 按钮样式 */
.button {
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}

/* 汉堡菜单按钮的样式 */
.burger-menu {
  display: none;
  position: absolute;
  top: 13px;
  right: 20px;
  flex-direction: column;
  justify-content: space-around;
  height: 30px;
  cursor: pointer;
}

.burger-menu .line {
  width: 25px;
  height: 3px;
  background-color: #ffffff;
  border-radius: 2px;
}

/* 菜单遮罩层 */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 900;
}

/* 在小屏幕下隐藏其他菜单 */
.nav-center {
  display: none;
}

.burger-menu {
  display: flex;
}

.auth-button {
  display: none;
}

.desktop-only {
  display: none;
}

.mobile-auth {
  display: flex;
}

.mobile-user-info {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.mobile-user-email {
  color: #ffffff;
  font-size: 14px;
  margin-right: 10px;
}

</style>