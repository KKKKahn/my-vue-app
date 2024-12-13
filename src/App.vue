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
/* 全局样式 */
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
  background-color: #0d1117;
  color: #e1e1e1;
}

#app {
  text-align: center;
  width: 80%;
}

/* 确保 body、html 和 #app 填充整个屏幕，背景色为 #0d1117 */
body, html, #app {
  overflow: hidden; /* 禁止页面滚动 */
  touch-action: none; /* 禁止触摸屏上下滑动 */
}



.content-wrapper {
  padding-top: 70px; /* 确保内容不被导航栏遮挡 */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; 
}

h1, h2, h3, h4, h5, h6 {
  color: #ffffff;
}

button {
  background: linear-gradient(90deg, #6c5ce7 0%, #0984e3 100%);
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

button:hover {
  background: linear-gradient(90deg, #8e44ad 0%, #3498db 100%);
}

a {
  color: #6c5ce7;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>