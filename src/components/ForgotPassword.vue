<template>
    <div class="form-container">
      <h1 class="auth-title">重置密码</h1>
  
      <form @submit.prevent="resetPassword" class="form">
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
    </div>
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
  
  <style scoped>
  /* 使用共享样式 */
  .form-container {
    width: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .auth-title {
    font-size: 32px;
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .input-group {
    width: 100%;
    max-width: 360px;
    margin-bottom: 20px;
  }
  
  .input-field {
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
  
  .input-field::placeholder {
    color: #b1b1b1;
  }
  
  .input-field:focus {
    border-color: #6c5ce7; 
    background-color: #1c1f26; 
  }
  
  .input-field:hover {
    border-color: #8e44ad; 
  }
  
  .button {
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
  
  .button:hover {
    background-color: #8e44ad;
  }
  
  .button:disabled {
    background-color: #444; 
    cursor: not-allowed; 
  }
  
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
  
  .back-to-login {
    margin-top: 20px;
    color: #e1e1e1;
    text-align: center;
  }
  
  .back-to-login a {
    color: #6c5ce7;
    text-decoration: none;
  }
  
  .back-to-login a:hover {
    text-decoration: underline;
  }
  </style>