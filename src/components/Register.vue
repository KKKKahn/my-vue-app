<template>
  <div class="auto-container">
        <img src="../assets/icons/kahn.svg" alt="Kahn 图标" class="kahn-icon" />
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
  
  export default {
    name: 'Register',
    setup() {
      const email = ref('');
      const password = ref('');
      const router = useRouter();
  
      const register = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email.value, password.value);
          router.push('/home');
        } catch (error) {
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

</style>