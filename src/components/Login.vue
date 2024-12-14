<template>

    <img src="../assets/icons/kahn.svg" alt="Kahn 图标" class="kahn-icon" />
    <h1 class="auth-title">欢迎回来</h1>
    <form @submit.prevent="handleFormSubmit">
      <!-- 📧 邮箱输入阶段 -->
      <transition name="fade">
        <div v-show="step === 'email'" key="email-step">
          <div class="input-group">
            <input 
              type="email" 
              v-model="email" 
              placeholder="请输入电子邮件" 
              required 
              autocomplete="email"
              class="input-field" 
            />
          </div>
          <button 
            type="button" 
            class="button continue-button" 
            @click="goToPasswordStep" 
            :disabled="!email">
            继续
          </button>
        </div>
      </transition>

      <!-- 🔒 密码输入阶段 -->
      <transition name="fade">
        <div v-show="step === 'password'" key="password-step">
          <p class="email-display">{{ email }}</p>
          <div class="input-group">
            <input 
              type="password" 
              v-model="password" 
              placeholder="请输入密码" 
              required 
              autocomplete="current-password"
              class="input-field" 
            />
          </div>
          <button 
            type="submit" 
            class="button login-button" 
            :disabled="!password || isLoginLoading || isGoogleLoading"> 
            <span v-if="!isLoginLoading">登录</span> 
            <span v-else class="loader"></span>
          </button>
        </div>
      </transition>

        <p class="info-links">
          还没有账户？
          <router-link to="/register" class="register-link">注册</router-link> 
          <!-- | 
          <router-link to="/phone-login" class="phone-login-link">使用手机号码登录</router-link> -->
        </p>

        <a>
          <router-link to="/forgot-password">忘记密码？</router-link>
        </a>
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
        <img src="../assets/icons/google.svg" alt="Google 图标" class="google-icon" />
        <span v-if="!isGoogleLoading" class="google-login-text">使用 Google 登录</span>
        <span class="loader" v-else></span>
      </button>

</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { auth, googleProvider } from '../firebase'; 
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'; 
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const email = ref('');
    const password = ref('');
    const step = ref('email'); // 当前的登录步骤 ('email' 或 'password')
    const isLoginLoading = ref(false);
    const isGoogleLoading = ref(false);
    const router = useRouter();

    // 处理表单提交
    const handleFormSubmit = async () => {
      if (step.value === 'password') {
        isLoginLoading.value = true;
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          router.push('/home');
        } catch (error) {
          alert('登录失败：' + error.message);
        } finally {
          isLoginLoading.value = false;
        }
      }
    };

    // 使用 Google 登录
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

    // 切换到密码输入步骤
    const goToPasswordStep = () => {
      step.value = 'password';
    };

    // 返回到邮箱输入步骤
    const goBackToEmailStep = () => {
      step.value = 'email';
      password.value = ''; // 清空密码字段
    };

    // 监测密码字段是否被自动填充
    watch(password, (newVal) => {
      if (newVal) {
        step.value = 'password';
      }
    });

    // 在组件挂载时检查密码字段是否已被填充
    onMounted(() => {
      // 延迟检查，以确保浏览器完成自动填充
      setTimeout(() => {
        if (password.value) {
          step.value = 'password';
        }
      }, 500); // 根据需要调整延迟时间
    });

    return {
      email,
      password,
      step,
      isLoginLoading,
      isGoogleLoading,
      handleFormSubmit,
      loginWithGoogle,
      goToPasswordStep,
      goBackToEmailStep
    };
  }
};
</script>

<style scoped>
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

.google-login-button {
  border: 1px solid transparent;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #ffffff;
  cursor: pointer;
  transition: border-color 0.25s;
  color: #000000; /* 将文本颜色设置为白色 */
}

.google-login-button {
  display: flex; 
  align-items: center; 
  justify-content: center; 
  background-color: #fff; 
  color: #555; 
  border: 1px solid #ddd; 
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.google-login-button:hover {
  background-color: #f5f5f5;
}

.google-icon {
  width: 20px; 
  height: 20px; 
  margin-right: 10px; 
}

.google-login-text {
  color: #555; 
}

</style>