<template>
  <div class="auth-container">
    <!-- 可选：在“欢迎回来”标题上方添加SVG图像 -->
    <img src="../assets/icons/kahn.svg" alt="Kahn 图标" class="kahn-icon" />

    <h1 class="auth-title">欢迎回来</h1>

    <!-- 手机号码登录组件 -->
    <PhoneLogin v-if="isPhoneLogin" @switch-to-email="switchToEmailLogin" />

    <!-- 电子邮件/密码登录表单 -->
    <div v-else-if="!isForgotPassword" class="form-container">
      <form @submit.prevent="login">
        <div class="input-group">
          <input type="email" v-model="email" placeholder="电子邮件" required class="input-field" />
        </div>

        <div class="input-group">
          <input type="password" v-model="password" placeholder="密码" required class="input-field" />
        </div>

        <button 
          type="submit" 
          class="button login-button" 
          :disabled="isLoginLoading || isGoogleLoading"> 
          <span v-if="!isLoginLoading">登录</span> 
          <span v-else class="loader"></span>
        </button>

        <p class="info-links">
          还没有账户？
          <router-link to="/register" class="register-link">注册</router-link> 
          | 
          <a href="javascript:void(0);" class="phone-login-link" @click="switchToPhoneLogin">使用手机号码登录</a>
        </p>

        <p class="forgot-password-link">
          <a href="javascript:void(0);" @click="showForgotPassword">忘记密码？</a>
        </p>
      </form>

      <!-- 🔥 分割线 -->
      <div class="divider">
        <span>或</span>
      </div>

      <!-- 🔥 Google 登录按钮 -->
      <button 
        type="button" 
        class="button google-login-button" 
        @click="loginWithGoogle" 
        :disabled="isGoogleLoading || isLoginLoading">
        <span v-if="!isGoogleLoading">使用 Google 登录</span>
        <span v-else class="loader"></span>
      </button>
    </div>

    <!-- 忘记密码组件 -->
    <ForgotPassword v-else @back-to-login="hideForgotPassword" />
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth, googleProvider } from '../firebase'; 
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; 
import { useRouter } from 'vue-router';
import PhoneLogin from './PhoneLogin.vue'; // 🔥 引入 PhoneLogin 组件
import ForgotPassword from './ForgotPassword.vue'; // 🔥 引入 ForgotPassword 组件

export default {
  name: 'Login',
  components: { PhoneLogin, ForgotPassword }, // 🔥 注册 PhoneLogin 和 ForgotPassword 组件
  setup() {
    const email = ref('');
    const password = ref('');
    const isLoginLoading = ref(false);
    const isGoogleLoading = ref(false);
    const isPhoneLogin = ref(false); // 🔥 控制是否显示 PhoneLogin
    const isForgotPassword = ref(false); // 🔥 控制是否显示 ForgotPassword

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

    const showForgotPassword = () => {
      isForgotPassword.value = true;
    };

    const hideForgotPassword = () => {
      isForgotPassword.value = false;
    };

    return {
      email,
      password,
      isLoginLoading,
      isGoogleLoading,
      isPhoneLogin, // 🔥 控制 PhoneLogin 的显示状态
      isForgotPassword, // 🔥 控制 ForgotPassword 的显示状态
      login,
      loginWithGoogle,
      switchToPhoneLogin,
      switchToEmailLogin,
      showForgotPassword,
      hideForgotPassword,
    };
  }
};
</script>

<style scoped>
.auth-container {
  width: 100%;
  height: 100vh; 
  background-color: #0d1117; 
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.form-container {
  width: 80%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.kahn-icon {
  width: 100px; 
  height: 100px; 
}

.auth-title {
  font-size: 32px;
  color: #ffffff;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
}

form {
  width: 100%;
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
}

.input-group input:hover {
  border-color: #8e44ad; 
}

.login-button {
  width: 100%; 
  background-color: #6c5ce7;
  color: #ffffff;
  padding: 14px 0;
  border-radius: 12px; 
  margin-top: 20px;
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
  margin-top: 15px; 
}

.google-login-button:hover {
  background-color: #f1f1f1; 
}

.google-login-button:disabled {
  background-color: #eeeeee; 
  cursor: not-allowed; 
}

.divider {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background-color: #aaa;
}

.divider span {
  margin: 0 10px;
  color: #aaa;
  font-size: 14px;
}
</style>