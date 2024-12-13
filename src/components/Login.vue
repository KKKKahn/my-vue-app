<template>
  <div class="auth-container">
    <!-- 在“欢迎回来”标题上方添加SVG图像 -->
    <img src="../assets/icons/kahn.svg" alt="Kahn 图标" class="kahn-icon" />

    <h1 class="auth-title">欢迎回来</h1>

    <!-- 手机号码登录组件 -->
    <PhoneLogin v-if="isPhoneLogin" @switch-to-email="switchToEmailLogin" />

    <!-- 电子邮件/密码登录表单 -->
    <form v-else @submit.prevent="login">
      <div class="input-group">
        <input type="email" v-model="email" placeholder="电子邮件" required />
      </div>

      <div class="input-group">
        <input type="password" v-model="password" placeholder="密码" required />
      </div>

      <button 
        type="submit" 
        class="login-button" 
        :disabled="isLoginLoading || isGoogleLoading"> 
        <span v-if="!isLoginLoading">登录</span> 
        <span v-else class="loader"></span>
      </button>

      <button 
        type="button" 
        class="google-login-button" 
        @click="loginWithGoogle" 
        :disabled="isGoogleLoading || isLoginLoading">
        <span v-if="!isGoogleLoading">使用 Google 登录</span>
        <span v-else class="loader"></span>
      </button>

      <p class="info-links">
        还没有账户？<router-link to="/register" class="register-link">注册</router-link> 
        | 
        <a href="javascript:void(0);" class="phone-login-link" @click="switchToPhoneLogin">使用手机号码登录</a>
      </p>
    </form>
  </div>
</template>

  
<script>
import { ref } from 'vue';
import { auth, googleProvider } from '../firebase'; 
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; 
import { useRouter } from 'vue-router';
import PhoneLogin from './PhoneLogin.vue'; // 🔥 引入 PhoneLogin 组件

export default {
  name: 'Login',
  components: { PhoneLogin }, // 🔥 注册 PhoneLogin 组件
  setup() {
    const email = ref('');
    const password = ref('');
    const isLoginLoading = ref(false);
    const isGoogleLoading = ref(false);
    const isPhoneLogin = ref(false); // 🔥 控制是否显示 PhoneLogin

    const router = useRouter();

    const login = async () => {
      isLoginLoading.value = true;
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
        router.push('/home');
      } catch (error) {
        alert('登录失败：' + error.message);
      } finally {
        isLoginLoading.value = false;
      }
    };

    const loginWithGoogle = async () => {
      isGoogleLoading.value = true;
      try {
        await signInWithPopup(auth, googleProvider);
        router.push('/home');
      } catch (error) {
        alert('Google 登录失败：' + error.message);
      } finally {
        isGoogleLoading.value = false;
      }
    };

    const switchToPhoneLogin = () => {
      isPhoneLogin.value = true;
    };

    const switchToEmailLogin = () => {
      isPhoneLogin.value = false;
    };

    return {
      email,
      password,
      isLoginLoading,
      isGoogleLoading,
      isPhoneLogin, // 🔥 控制 PhoneLogin 的显示状态
      login,
      loginWithGoogle,
      switchToPhoneLogin,
      switchToEmailLogin
    };
  }
};
</script>
  
  <style scoped>

.switch-login-method {
  margin-top: 20px;
  color: #e1e1e1;
  text-align: center;
}

.switch-login-method a {
  color: #6c5ce7;
  text-decoration: none;
}

.switch-login-method a:hover {
  text-decoration: underline;
}

.google-login-button {
  width: 100%; 
  background-color: #ffffff; 
  color: #000000; 
  font-size: 18px;
  border: 2px solid #db4437;
  padding: 14px 0;
  border-radius: 12px; 
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  margin-top: 15px; 
}
.google-login-button {
  width: 100%; 
  background-color: #ffffff; /* 🔥 Google 按钮的背景变成白色 */
  color: #000000; /* 🔥 文字颜色变成黑色 */
  font-size: 18px;
  border: 2px solid #db4437; /* 🔥 Google 按钮的边框颜色 */
  padding: 14px 0;
  border-radius: 12px; 
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  box-sizing: border-box; 
  position: relative;
  margin-top: 15px; 
}
  
.google-login-button:hover {
  background-color: #f1f1f1; /* 🔥 鼠标悬停时的浅灰色 */
}
  
.google-login-button:disabled {
  background-color: #eeeeee; 
  cursor: not-allowed; 
}
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