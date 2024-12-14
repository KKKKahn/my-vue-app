<template>
  <div class="auto-container">
    <h1 class="auth-title">重置密码</h1>
    
    <!-- 错误消息提示 -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>

    <form @submit.prevent="resetPassword">
      <!-- 邮箱输入框 -->
      <div class="input-group">
        <input 
          type="email" 
          v-model="email" 
          placeholder="请输入您的电子邮件" 
          required 
          autocomplete="email"
          name="email"
          class="input-field" 
        />
      </div>

      <!-- 错误提示 -->
      <p v-if="emailError" class="error-message">{{ emailError }}</p>

      <!-- 发送重置邮件按钮 -->
      <button 
        type="submit" 
        class="button" 
        :disabled="isLoading">
        <span v-if="!isLoading">发送重置邮件</span>
        <span v-else class="loader"></span>
      </button>
    </form>

    <p class="login-prompt">
      想起来了？<router-link to="/login" class="login-link">登录</router-link>
    </p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from '../firebase'; 
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRoute } from 'vue-router';

export default {
  name: 'ForgotPassword',
  setup() {
    const route = useRoute(); // 获取当前路由信息
    const email = ref(route.query.email || ''); // 从查询参数中获取邮箱，默认空字符串
    const isLoading = ref(false);
    const emailError = ref('');
    const errorMessage = ref('');
    const successMessage = ref('');

    // 校验邮箱格式
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // 发送重置密码请求
    const resetPassword = async () => {
      emailError.value = '';
      errorMessage.value = '';
      successMessage.value = '';

      if (!email.value) {
        emailError.value = '请输入您的电子邮件';
        return;
      }

      if (!validateEmail(email.value)) {
        emailError.value = '请输入有效的电子邮件地址';
        return;
      }

      isLoading.value = true;
      try {
        await sendPasswordResetEmail(auth, email.value);
        successMessage.value = '重置密码邮件已发送，请查收您的邮箱。';
      } catch (error) {
        errorMessage.value = '发送失败：' + (error?.message || '请稍后重试');
        console.error('sendPasswordResetEmail error:', error);
      } finally {
        isLoading.value = false;
      }
    };

    // 在组件挂载时，如果邮箱已通过查询参数传递，自动发送重置邮件
    onMounted(() => {
      if (email.value) {
        resetPassword();
      }
    });

    return {
      email,
      isLoading,
      emailError,
      errorMessage,
      successMessage,
      resetPassword,
    };
  },
};
</script>
