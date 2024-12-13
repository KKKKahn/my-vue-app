<template>
    <div class="auth-container">
      <!-- 在“欢迎回来”标题上方添加SVG图像 -->
      <img src="../assets/icons/kahn.svg" alt="Kahn 图标" class="kahn-icon" />
  
      <h1 class="auth-title">欢迎回来</h1>
  
      <form @submit.prevent="login">
        <!-- 邮箱输入框 -->
        <div class="input-group">
          <input type="email" v-model="email" placeholder="电子邮件" required />
        </div>
  
        <!-- 密码输入框 -->
        <div class="input-group">
          <input type="password" v-model="password" placeholder="密码" required />
        </div>
  
        <button type="submit" class="login-button">登录</button>
      </form>
  
      <p class="register-prompt">
        还没有账户？<router-link to="/register" class="register-link">注册</router-link>
      </p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { auth } from '../firebase';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Login',
    setup() {
      const email = ref('');
      const password = ref('');
      const router = useRouter();
  
      const login = async () => {
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          router.push('/home');
        } catch (error) {
          alert('登录失败：' + error.message);
        }
      };
  
      return {
        email,
        password,
        login
      };
    }
  };
  </script>
  
  <style scoped>
  /* 覆盖整个屏幕，并使用与 body 相同的背景色 */
  .auth-container {
    width: 100vw;
    height: 20%;
    background-color: #0d1117; /* 背景色 */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  
  .kahn-icon {
    width: 100px; /* 图标宽度 */
    height: 100px; /* 图标高度 */
  }
  
  .auth-title {
    font-size: 32px;
    color: #ffffff;
    font-weight: bold;
    margin: 10px;
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
    width: 100%; /* 确保输入框的宽度与按钮一致 */
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
  
  .login-button {
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
  
  .login-button:hover {
    background-color: #8e44ad;
  }
  
  .register-prompt {
    color: #e1e1e1;
    margin-top: 20px;
    font-size: 14px;
  }
  
  .register-link {
    color: #6c5ce7;
    text-decoration: none;
  }
  
  .register-link:hover {
    text-decoration: underline;
  }
  </style>