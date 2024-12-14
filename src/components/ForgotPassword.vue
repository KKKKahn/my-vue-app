<template>
  <div class="auto-container">
    <h1 class="auth-title">重置密码</h1>
    <!-- 错误消息提示 -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <form @submit.prevent="resetPassword">
      <!-- 邮箱输入框 -->
      <div class="input-group">
        <input 
          type="email" 
          v-model="email" 
          placeholder="请输入您的电子邮件" 
          required 
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

    <p class="back-to-login">
      <router-link to="/login">返回登录</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase'; 
import { sendPasswordResetEmail } from 'firebase/auth';

export default {
  name: 'ForgotPassword',
  setup() {
    const email = ref('');
    const isLoading = ref(false);
    const emailError = ref('');
    const errorMessage = ref('');

    // 校验邮箱格式
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // 发送重置密码请求
    const resetPassword = async () => {
      emailError.value = '';
      errorMessage.value = '';

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
        alert('重置密码邮件已发送，请查收您的邮箱。');
      } catch (error) {
        errorMessage.value = '发送失败：' + (error?.message || '请稍后重试');
        console.error('sendPasswordResetEmail error:', error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      isLoading,
      emailError,
      errorMessage,
      resetPassword,
    };
  },
};
</script>

<style scoped>
/* 样式与上面一致 */
</style>