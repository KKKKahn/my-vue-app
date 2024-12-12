<template>
  <div id="app">
    <NavBar />
    <div class="content-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
export default {
  components: { NavBar }
}
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
}

.content-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 70px); /* 减去导航栏的高度 */
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