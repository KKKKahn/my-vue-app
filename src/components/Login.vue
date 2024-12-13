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
  
        <!-- 登录按钮 -->
        <button 
          type="submit" 
          class="login-button" 
          :disabled="isLoading">
          <span v-if="!isLoading">登录</span>
          <span v-else class="loader"></span>
        </button>
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
      const isLoading = ref(false); // 🔥 新增加载状态
      const router = useRouter();
  
      const login = async () => {
        isLoading.value = true; // 启动加载状态
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          router.push('/home');
        } catch (error) {
          alert('登录失败：' + error.message);
        } finally {
          isLoading.value = false; // 无论成功或失败，重置加载状态
        }
      };
  
      return {
        email,
        password,
        isLoading, // 返回到模板中
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
    width: 100%; 
    padding: 15px 20px;
    font-size: 16px;
    border: 2px solid #3e3e42;
    border-radius: 12px; 
    background-color: #1e1e24; 
    color: #ffffff;
    outline: none;
    box-sizing: border-box; 
    transition: all 0.3s ease;
  }
  
  .input-group input::placeholder {
    color: #b1b1b1;
  }
  
  .input-group input:focus {
    border-color: #6c5ce7; 
    background-color: #1c1f26; 
  }
  
  .input-group input:hover {
    border-color: #8e44ad; 
  }
  
  .login-button {
    width: 100%; 
    background-color: #6c5ce7;
    color: #ffffff;
    font-size: 18px;
    border: none;
    padding: 14px 0;
    border-radius: 12px; 
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
    box-sizing: border-box; 
    position: relative;
  }
  
  .login-button:hover {
    background-color: #8e44ad;
  }
  
  .login-button:disabled {
    background-color: #444; 
    cursor: not-allowed; 
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
  
  /* 🔥 新增的加载动画样式 */
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
  </style>