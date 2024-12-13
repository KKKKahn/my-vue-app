<template>
    <div class="form-container">
      <h1 class="auth-title">手机号码登录</h1>
  
      <!-- 手机号码输入框（禁用以使用固定号码） -->
      <div class="input-group">
        <input 
          type="text" 
          v-model="phoneNumber" 
          placeholder="请输入手机号码" 
          required 
          disabled
          class="input-field"
        />
      </div>
  
      <!-- 验证码输入框（仅在验证码发送后显示） -->
      <div class="input-group" v-if="isCodeSent">
        <input 
          type="text" 
          v-model="verificationCode" 
          placeholder="请输入验证码" 
          required 
          class="input-field"
        />
      </div>
  
      <!-- Recaptcha 容器 -->
      <div id="recaptcha-container"></div>
  
      <!-- 发送验证码按钮 -->
      <button 
        v-if="!isCodeSent" 
        class="button login-button" 
        @click="sendVerificationCode" 
        :disabled="isLoading">
        <span v-if="!isLoading">发送验证码</span>
        <span v-else class="loader"></span>
      </button>
  
      <!-- 登录按钮 -->
      <button 
        v-if="isCodeSent" 
        class="button login-button" 
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
      // 使用固定的测试电话号码
      const phoneNumber = ref('+8617602896053');
      const verificationCode = ref('');
      const isCodeSent = ref(false);
      const isLoading = ref(false);
      let confirmationResult = null;
  
      onMounted(() => {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'normal', // 使用 'normal' 以便调试
            callback: (response) => {
              console.log('reCAPTCHA resolved:', response);
            },
            'expired-callback': () => {
              console.log('reCAPTCHA expired');
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
          const formattedPhoneNumber = phoneNumber.value;
  
          // 打印格式化后的电话号码
          console.log('Formatted Phone Number:', formattedPhoneNumber);
  
          // 确保格式正确
          const phoneRegex = /^\+\d{10,15}$/;
          if (!phoneRegex.test(formattedPhoneNumber)) {
            throw new Error('请输入有效的手机号码，格式应为 +国家代码+手机号');
          }
  
          confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
          isCodeSent.value = true;
          console.log('验证码已发送');
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
  
  