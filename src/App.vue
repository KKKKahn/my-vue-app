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
  /* color: rgba(255, 255, 255, 0.87);
  background-color: #242424; */

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
  /* background-color: #0d1117;
  color: #e1e1e1; */
}

a {
  color: #6c5ce7;
  text-decoration: inherit;
}
a:hover {
  color: #5656565a;
}

h1, h2, h3, h4, h5, h6 {
  color: var(--text-color);
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
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
  background-color: #181818;
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