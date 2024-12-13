<template>

      <h1 class="auth-title">重置密码</h1>
      <form>
        <div class="input-group">
          <input 
            type="email" 
            v-model="email" 
            placeholder="请输入您的电子邮件" 
            required 
            class="input-field" 
          />
        </div>
  
        <button 
          type="submit" 
          class="button reset-button" 
          :disabled="isLoading">
          <span v-if="!isLoading">发送重置邮件</span>
          <span v-else class="loader"></span>
        </button>
      </form>
  
      <p class="back-to-login">
        <a href="javascript:void(0);" @click="$emit('back-to-login')">返回登录</a>
      </p>

  </template>
  
  <script>
  import { ref } from 'vue';
  import { auth } from '../firebase'; 
  import { sendPasswordResetEmail } from 'firebase/auth';
  
  export default {
    name: 'ForgotPassword',
    setup(_, { emit }) {
      const email = ref('');
      const isLoading = ref(false);
  
      const resetPassword = async () => {
        isLoading.value = true;
        try {
          await sendPasswordResetEmail(auth, email.value);
          alert('重置密码邮件已发送，请查收您的邮箱。');
          emit('back-to-login');
        } catch (error) {
          alert('发送失败：' + error.message);
          console.error('sendPasswordResetEmail error:', error);
        } finally {
          isLoading.value = false;
        }
      };
  
      return {
        email,
        isLoading,
        resetPassword,
      };
    },
  };
  </script>
  
