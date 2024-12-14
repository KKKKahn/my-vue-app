<template>

    <img src="../assets/icons/kahn.svg" alt="Kahn 图标" class="kahn-icon" />
    <h1 class="auth-title">欢迎回来</h1>
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
          <router-link to="/phone-login" class="phone-login-link">使用手机号码登录</router-link>
        </p>

        <p class="forgot-password-link">
          <router-link to="/forgot-password">忘记密码？</router-link>
        </p>
      </form>

      <!-- 分割线 -->
      <div class="divider">
        <span>或</span>
      </div>

      <!-- Google 登录按钮 -->
      <button 
        type="button" 
        class="button google-login-button" 
        @click="loginWithGoogle" 
        :disabled="isGoogleLoading || isLoginLoading">
        <span v-if="!isGoogleLoading">使用 Google 登录</span>
        <span v-else class="loader"></span>
      </button>

</template>

<script>
import { ref } from 'vue';
import { auth, googleProvider } from '../firebase'; 
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; 
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const isLoginLoading = ref(false);
    const isGoogleLoading = ref(false);
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

    return {
      email,
      password,
      isLoginLoading,
      isGoogleLoading,
      login,
      loginWithGoogle,
    };
  }
};
</script>

<style scoped>
/* 保持现有样式 */
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