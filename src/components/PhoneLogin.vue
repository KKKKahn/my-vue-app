<template>
  <div class="auto-container">
    <h1 class="auth-title">手机号码登录</h1>

    <form @submit.prevent="sendVerificationCode">
      <!-- 手机号码输入框 -->
      <div class="input-group">
        <input 
          type="text" 
          v-model="phoneNumber" 
          placeholder="请输入手机号码 (+86开头)" 
          required 
          class="input-field"
        />
      </div>

      <!-- 错误提示 -->
      <p v-if="phoneError" class="error-message">{{ phoneError }}</p>

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

      <!-- 错误提示 -->
      <p v-if="codeError" class="error-message">{{ codeError }}</p>

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
    </form>

    <p class="switch-login-method">
      <router-link to="/login">返回电子邮件登录</router-link>
    </p>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from '../firebase'; 
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';

export default {
  name: 'PhoneLogin',
  setup() {
    const phoneNumber = ref('');
    const verificationCode = ref('');
    const isCodeSent = ref(false);
    const isLoading = ref(false);
    const phoneError = ref('');
    const codeError = ref('');
    let confirmationResult = null;

    onMounted(() => {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          size: 'normal',
          callback: (response) => {
            console.log('reCAPTCHA resolved:', response);
          },
          'expired-callback': () => {
            console.log('reCAPTCHA expired, please reload the reCAPTCHA.');
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
      phoneError.value = '';
      if (isLoading.value) return;

      const phoneRegex = /^\+\d{10,15}$/;
      if (!phoneRegex.test(phoneNumber.value)) {
        phoneError.value = '请输入有效的手机号码，格式应为 +86xxxxxxxxxxx';
        return;
      }

      isLoading.value = true;
      try {
        confirmationResult = await signInWithPhoneNumber(auth, phoneNumber.value, window.recaptchaVerifier);
        isCodeSent.value = true;
      } catch (error) {
        phoneError.value = '验证码发送失败：' + error.message;
      } finally {
        isLoading.value = false;
      }
    };

    const verifyCode = async () => {
      codeError.value = '';
      if (isLoading.value) return;

      if (!verificationCode.value) {
        codeError.value = '请输入验证码';
        return;
      }

      isLoading.value = true;
      try {
        const result = await confirmationResult.confirm(verificationCode.value);
        alert('登录成功，欢迎：' + result.user.phoneNumber);
      } catch (error) {
        codeError.value = '验证码错误，请重试';
      } finally {
        isLoading.value = false;
      }
    };

    return {
      phoneNumber,
      verificationCode,
      isCodeSent,
      isLoading,
      phoneError,
      codeError,
      sendVerificationCode,
      verifyCode,
    };
  },
};
</script>

<style scoped>
/* 保持之前的样式 */
</style>