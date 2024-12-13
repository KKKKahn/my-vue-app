<template>
    <div class="contact-page">
      <h1>留言</h1>
      <form @submit.prevent="handleSubmit">
        <input v-model="name" type="text" placeholder="输入你的名字" required />
        <textarea v-model="message" placeholder="输入留言" required></textarea>
        <button type="submit">提交留言</button>
      </form>
    </div>
  </template>
  
  <style scoped>

.content-wrapper {
  display: flex; /* Flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  width: 100vw; /* 100% 视口宽度 */
  height: 100vh; /* 100% 视口高度 */
  padding: 20px; /* 避免内容紧贴边缘 */
  box-sizing: border-box; /* 确保 padding 在内部计算 */
}

.contact-page {
  padding: 40px 30px; /* 内边距，确保内容不贴边 */
  border-radius: 12px; /* 圆角 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); /* 轻微的阴影效果 */
  width: 100%; /* 宽度 100%，但限制最大宽度 */
  max-width: 400px; /* 限制最大宽度 */
  display: flex;
  flex-direction: column; /* 垂直堆叠子元素 */
  align-items: center; /* 居中对齐子元素 */
}

input, textarea {
  padding: 12px;
  background-color: #1e1e2f;
  color: #fff;
  border: 1px solid #6c5ce7;
  border-radius: 8px;
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
  border-radius: 8px;
  background: linear-gradient(90deg, #6c5ce7 0%, #0984e3 100%);
}
  </style>