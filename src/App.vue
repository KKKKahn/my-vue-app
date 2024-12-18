<template>
  <div id="app" :class="{ dark: darkMode, light: !darkMode }">
    <NavBar />
    <div class="content-wrapper">
      <router-view />
    </div>
    <!-- 切换日夜模式按钮 -->
    <button class="toggle-theme" @click="toggleDarkMode">
      {{ darkMode ? '切换到日间模式' : '切换到夜间模式' }}
    </button>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ref, onMounted, watch } from 'vue';

export default {
  name: 'App',
  components: {
    NavBar
  },
  setup() {
    const user = ref(null);
    const darkMode = ref(localStorage.getItem('darkMode') === 'true'); // 获取 localStorage 中的值

    // 监听 darkMode 变化并保存到 localStorage
    watch(darkMode, (newValue) => {
      localStorage.setItem('darkMode', newValue.toString());
    });

    // 切换模式
    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
    };

    // 等待 Firebase 的用户认证状态
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser;
    });

    // 页面加载时检查系统的默认主题
    onMounted(() => {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (localStorage.getItem('darkMode') === null) {
        darkMode.value = prefersDark;
      }
    });

    return { user, darkMode, toggleDarkMode };
  }
};
</script>






<style>
:root {
  /* 默认是浅色模式（day mode） */
  --background-color: #ffffff;
  --text-color: #213547;
  --button-background: #f9f9f9;
  --button-color: black;
  --link-color: #6c5ce7;
  --navbar-background: #ffffff;
}

/* 当页面处于夜间模式时，修改颜色变量 */
.dark {
  --background-color: #121212;
  --text-color: #ffffff;
  --button-background: #333333;
  --button-color: #ffffff;
  --link-color: #bb86fc;
  --navbar-background: #1e1e1e;
}

/* 日间模式下 */
.light {
  --background-color: #ffffff;
  --text-color: #213547;
  --button-background: #f9f9f9;
  --button-color: black;
  --link-color: #6c5ce7;
  --navbar-background: #ffffff;
}
.toggle-theme {
  position: fixed;
  top: 20px;  /* 距离顶部 20px */
  left: 20px;  /* 距离左边 20px */
  z-index: 1000;  /* 确保按钮位于其他内容之上 */
}


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
  min-height: 100%;
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
</style>