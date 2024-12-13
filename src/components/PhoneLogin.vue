<template>
    <div class="phone-login-container">
      <h1 class="auth-title">手机号码登录</h1>
  
      <!-- 手机号码输入框 -->
      <div class="input-group">
        <input 
          type="text" 
          v-model="phoneNumber" 
          placeholder="请输入手机号码" 
          required 
        />
      </div>
  
      <!-- 验证码输入框（仅在验证码发送后显示） -->
      <div class="input-group" v-if="isCodeSent">
        <input 
          type="text" 
          v-model="verificationCode" 
          placeholder="请输入验证码" 
          required 
        />
      </div>
  
      <!-- Recaptcha 容器 -->
      <div id="recaptcha-container" style="height: 0; overflow: hidden;"></div>
  
      <!-- 发送验证码按钮 -->
      <button 
        v-if="!isCodeSent" 
        class="login-button" 
        @click="sendVerificationCode" 
        :disabled="isLoading">
        <span v-if="!isLoading">发送验证码</span>
        <span v-else class="loader"></span>
      </button>
  
      <!-- 登录按钮 -->
      <button 
        v-if="isCodeSent" 
        class="login-button" 
        @click="verifyCode" 
        :disabled="isLoading">
        <span v-if="!isLoading">登录</span>
        <span v-else class="loader"></span>
      </button>
  
      <p class="switch-login-method">
        <a href="javascript:void(0);" @click="$emit('switch-to-email')">返回电子邮件登录</a>
      </p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { auth } from '../firebase'; 
  import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
  
  export default {
    
    name: 'PhoneLogin',
    setup(_, { emit }) {
      const phoneNumber = ref('');
      const verificationCode = ref('');
      const isCodeSent = ref(false);
      const isLoading = ref(false);
      let confirmationResult = null;
  
      onMounted(() => {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'invisible',
            callback: (response) => {
              console.log('reCAPTCHA resolved:', response);
            }
          }, auth);
          window.recaptchaVerifier.render()
            .then(widgetId => {
              console.log('reCAPTCHA rendered with widget ID:', widgetId);
            })
            .catch(error => {
              console.error('reCAPTCHA render error:', error);
            });
        }
      });
  
      const sendVerificationCode = async () => {
        isLoading.value = true;
        try {
          const formattedPhoneNumber = phoneNumber.value.startsWith('+') 
            ? phoneNumber.value 
            : `+86${phoneNumber.value}`; // 假设是中国号码
          
          // 打印格式化后的电话号码
          console.log('Formatted Phone Number:', formattedPhoneNumber);
          
          confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
          isCodeSent.value = true;
        } catch (error) {
          alert('验证码发送失败：' + error.message);
          console.error('sendVerificationCode error:', error);
        } finally {
          isLoading.value = false;
        }
      };
  
      const verifyCode = async () => {
        isLoading.value = true;
        try {
          const result = await confirmationResult.confirm(verificationCode.value);
          alert('登录成功，欢迎：' + result.user.phoneNumber);
          // 可以在这里触发父组件的登录成功事件
          emit('login-success', result.user);
        } catch (error) {
          alert('登录失败：' + error.message);
          console.error('verifyCode error:', error);
        } finally {
          isLoading.value = false;
        }
      };
  
      return {
        phoneNumber,
        verificationCode,
        isCodeSent,
        isLoading,
        sendVerificationCode,
        verifyCode,
      };
    },
  };
  </script>
  
  <style scoped>
  .phone-login-container {
    width: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .auth-title {
    font-size: 28px;
    color: #ffffff;
    font-weight: bold;
    margin-bottom: 20px;
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
    margin-bottom: 15px;
  }
  
  .login-button:hover {
    background-color: #8e44ad;
  }
  
  .login-button:disabled {
    background-color: #444; 
    cursor: not-allowed; 
  }
  
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