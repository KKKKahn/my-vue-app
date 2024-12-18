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
              name="email"
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
              name="password"
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

      <p class="info-links" v-if="step === 'email'">
            还没有账户？
            <router-link to="/register" class="register-link">注册</router-link> 
            <!-- | 
            <router-link to="/phone-login" class="phone-login-link">使用手机号码登录</router-link> -->
          </p>
        
        <!-- 仅在密码输入阶段显示忘记密码链接 -->
        <p class="info-links" v-if="step === 'password'">
          忘记密码？
          <router-link :to="{ path: '/forgot-password', query: { email: email } }">重置密码</router-link>
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
        <img src="../assets/icons/google.svg" alt="Google 图标" class="google-icon" />
        <span v-if="!isGoogleLoading" class="google-login-text">使用 Google 登录</span>
        <span class="loader" v-else></span>
      </button>

</template>

<!-- <script>
import { ref, watch, onMounted, onUnmounted } from 'vue';
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
    const passwordInput = ref(null); // 引用密码输入框

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
      // 聚焦密码输入框，触发键盘弹出（尤其在移动设备上）
      setTimeout(() => {
        passwordInput.value?.focus();
      }, 300);
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
    let checkInterval = null;
    onMounted(() => {
      // 使用更短的间隔频率来检测密码自动填充
      checkInterval = setInterval(() => {
        if (passwordInput.value && passwordInput.value.value) {
          password.value = passwordInput.value.value;
          step.value = 'password';
          clearInterval(checkInterval);
        }
      }, 100); // 每100ms检查一次
      // 设置一个超时，避免无限期检查
      setTimeout(() => {
        if (checkInterval) clearInterval(checkInterval);
      }, 5000); // 最多检查5秒
    });

    onUnmounted(() => {
      if (checkInterval) clearInterval(checkInterval);
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
      goBackToEmailStep,
      passwordInput, // 绑定到密码输入框的 ref
    };
  }
};
</script> -->
<script>
import { ref, watch, onMounted, onUnmounted } from 'vue';
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
    const passwordInput = ref(null); // 引用密码输入框

    // 在路由进入之前检查是否已经登录，若已登录则跳转到主页
    router.beforeEach((to, from, next) => {
      const currentUser = auth.currentUser;
      if (currentUser && (to.path === '/login' || to.path === '/register')) {
        // 如果用户已登录，且访问的是登录或注册页面，则跳转到主页
        next('/home');
      } else {
        // 否则继续执行
        next();
      }
    });

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
      // 聚焦密码输入框，触发键盘弹出（尤其在移动设备上）
      setTimeout(() => {
        passwordInput.value?.focus();
      }, 300);
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
    let checkInterval = null;
    onMounted(() => {
      // 使用更短的间隔频率来检测密码自动填充
      checkInterval = setInterval(() => {
        if (passwordInput.value && passwordInput.value.value) {
          password.value = passwordInput.value.value;
          step.value = 'password';
          clearInterval(checkInterval);
        }
      }, 100); // 每100ms检查一次
      // 设置一个超时，避免无限期检查
      setTimeout(() => {
        if (checkInterval) clearInterval(checkInterval);
      }, 5000); // 最多检查5秒
    });

    onUnmounted(() => {
      if (checkInterval) clearInterval(checkInterval);
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
      goBackToEmailStep,
      passwordInput, // 绑定到密码输入框的 ref
    };
  }
};
</script>

<style scoped>

/* 默认占位符颜色 */
.input-field::placeholder {
  color: #a0a0a0; /* 默认颜色 */
}

/* 当输入框获得焦点时，占位符文字的颜色 */
.input-field:focus::placeholder {
  color: #585858; /* 例如修改为红色 */
}

.divider {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 20px 0;
}


/* 禁用按钮的样式 */
.button:disabled {
  background-color: var(--menu);  /* 禁用时的背景色 */
  cursor: not-allowed; 
  border: 2px solid #be030300;
}

/* 禁用状态下移除悬停样式 */
.button:disabled:hover {
  border: 2px solid #7f7f7f00;  /* 确保禁用时仍然是红色边框 */
  background-color: var(--menu);  /* 禁用时的背景色 */
}

.button:hover {
  border: 2px solid #000000;  /* 紫色边框 */
  background-color: var(--button-hover);
}
.button {
  border: 2px solid #6c5ce700;  /* 紫色边框 */
  background-color: var(--button);
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
  border: 2px solid #ddd; 
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.google-login-button:hover {
  background-color: var(--menu);
  border: 2px solid var(--menu); 
}

.google-icon {
  width: 20px; 
  height: 20px; 
  margin-right: 10px; 
}

.google-login-text {
  color: #555; 
}


@media (max-width: 768px) {
  html, body {
    overflow-y: hidden; /* 在小屏幕上禁用滚动 */
  }
}
</style>