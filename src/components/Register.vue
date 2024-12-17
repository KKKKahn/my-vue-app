<template>
  <div class="auto-container">
    <h1 class="auth-title">注册</h1>
    <form @submit.prevent="register">
      <div class="input-group">
        <input type="email" v-model="email" placeholder="电子邮件" required />
      </div>
      <div class="input-group">
        <input type="password" v-model="password" placeholder="密码" required />
      </div>
      <button type="submit" class="button" :disabled="isLoading">
        <span v-if="!isLoading">注册</span>
        <span v-else>处理中...</span>
      </button>
    </form>

    <p class="login-prompt">
      已有账户？<router-link to="/login" class="login-link">登录</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import axios from 'axios'; // 🔥 引入 axios

export default {
  name: 'Register',
  setup() {
    const email = ref('');
    const password = ref('');
    const isLoading = ref(false);
    const router = useRouter();
    const register = async () => {
      isLoading.value = true;

      try {
        // 1️⃣ 在 Firebase 中创建新用户
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        console.log('✅ 成功创建用户:', user.email);

        // 2️⃣ 在 Cloudflare Worker 中保存用户的角色和头像
        const newUser = {
          email: user.email,
          role: 'Member',
          avatar: 'https://www.kahn.love/wp-content/uploads/2024/11/2.webp'
        };

        // 3️⃣ 发送 POST 请求到 Cloudflare Worker API，保存用户数据
        const response = await axios.post('https://new.kahn.love/api/users', newUser);
        
        console.log('✅ 成功将用户存储到服务器:', response.data);

        // 4️⃣ 跳转到首页
        router.push('/home');
      } catch (error) {
        console.error('❌ 注册失败：', error);
        
        if (error.response && error.response.status === 409) {
          alert('❌ 注册失败：用户已存在');
        } else if (error.response && error.response.status === 500) {
          alert('❌ 注册失败：服务器错误，请稍后重试');
        } else {
          alert('❌ 注册失败：网络错误或其他未知错误');
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      email,
      password,
      isLoading,
      register
    };
  }
};
</script>

<style scoped>

</style>