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
      <button type="submit" class="button">注册</button>
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
    const router = useRouter();

    const register = async () => {
      try {
        // 1️⃣ 在 Firebase 中创建新用户
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const user = userCredential.user;
        console.log('✅ 成功创建用户:', user.email);

        // 2️⃣ 在 localUsers.json 中保存用户的角色和头像
        const newUser = {
          email: user.email,
          role: 'Member',
          avatar: 'https://www.kahn.love/wp-content/uploads/2024/11/2.webp'
        };

        // 3️⃣ 向 json-server 发送 POST 请求，将新用户添加到 localUsers.json
        await axios.post('http://localhost:3001/users', newUser);
        console.log('✅ 成功将用户存储到 localUsers.json:', newUser);

        // 4️⃣ 触发 onAuthStateChanged 事件，强制刷新当前的导航栏中的用户状态
        auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            console.log('🌐 手动触发的 onAuthStateChanged 事件: 当前用户:', currentUser.email);
          }
        });

        // 5️⃣ 跳转到首页
        router.push('/home');
      } catch (error) {
        console.error('❌ 注册失败：', error);
        alert('注册失败：' + error.message);
      }
    };

    return {
      email,
      password,
      register
    };
  }
};
</script>

<style scoped>
/* 可根据需求添加样式 */
</style>