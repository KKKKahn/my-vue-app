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
  .contact-page {
  text-align: center;
}

input, textarea {
  width: 80%;
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