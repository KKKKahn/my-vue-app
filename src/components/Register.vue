<template>
    <div class="auth-container">
      <h1 class="auth-title">注册</h1>
  
      <form @submit.prevent="register">
        <div class="input-group">
          <input type="email" v-model="email" placeholder="电子邮件" required />
        </div>
        <div class="input-group">
          <input type="password" v-model="password" placeholder="密码" required />
        </div>
        <button type="submit" class="register-button">注册</button>
      </form>
  
      <p class="login-prompt">
        已有账户？<router-link to="/login" class="login-link">登录</router-link>
      </p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { auth } from '../firebase';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Register',
    setup() {
      const email = ref('');
      const password = ref('');
      const router = useRouter();
  
      const register = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email.value, password.value);
          router.push('/home');
        } catch (error) {
          alert('注册失败：' + error.message);
        }
      };
  
      return {
        email,
        password,
        register
      };
    }
  };
  </script>
  
  <style scoped>
  /* 确保 auth-container 覆盖整个屏幕，并使用与 body 相同的背景色 */
  .auth-container {
    width: 100vw;
    height: 70vh;
    background-color: #0d1117; /* 背景色 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden; /* 禁止滚动条 */
  }
  
  .auth-title {
    font-size: 32px;
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 40px;
    text-align: center;
  }
  
  form {
    width: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
  }
  
  .input-group {
    width: 100%;
    margin-bottom: 20px;
  }
  
  .input-group input {
    width: 100%;
    padding: 15px 20px;
    font-size: 16px;
    border: 2px solid #3e3e42;
    border-radius: 12px; /* 圆角边框 */
    background-color: #1e1e24; /* 深色背景，和页面背景相呼应 */
    color: #ffffff;
    outline: none;
    box-sizing: border-box; /* 关键: 确保 padding 和 border 在 width 中 */
    transition: all 0.3s ease;
  }
  
  .input-group input::placeholder {
    color: #b1b1b1;
  }
  
  .input-group input:focus {
    border-color: #6c5ce7; /* 聚焦时的高亮边框颜色 */
    background-color: #1c1f26; /* 聚焦时的背景色 */
  }
  
  .input-group input:hover {
    border-color: #8e44ad; /* 悬浮时的边框颜色 */
  }
  
  .register-button {
    width: 100%; /* 按钮的宽度与输入框一致 */
    background-color: #6c5ce7;
    color: #ffffff;
    font-size: 18px;
    border: none;
    padding: 14px 0;
    border-radius: 12px; /* 按钮圆角，和输入框的边框一致 */
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    box-sizing: border-box; /* 关键: 确保 padding 和 border 在 width 中 */
  }
  
  .register-button:hover {
    background-color: #8e44ad;
  }
  
  .login-prompt {
    color: #e1e1e1;
    margin-top: 20px;
    font-size: 14px;
  }
  
  .login-link {
    color: #6c5ce7;
    text-decoration: none;
  }
  
  .login-link:hover {
    text-decoration: underline;
  }
  </style>