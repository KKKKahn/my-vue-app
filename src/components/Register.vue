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
import { ref } from 'vue'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'Register',
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const register = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
        const userEmail = userCredential.user.email

        // 🔥 发送 POST 请求到 /api/addUser，保存新用户信息
        const response = await fetch('http://localhost:3001/api/addUser', { // 确保后端的端口和 URL 正确
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: userEmail,
            role: 'Member', // 默认角色
            avatar: 'https://www.kahn.love/wp-content/uploads/2024/11/2.webp' // 默认头像
          })
        })

        const result = await response.json()
        
        if (response.ok) {
          console.log('✅ 用户注册成功，后端返回:', result)
        } else {
          console.error('❌ 服务器返回错误:', result.message)
        }

        // 跳转到主页
        router.push('/home')
      } catch (error) {
        alert('注册失败：' + error.message)
        console.error('❌ 注册失败:', error)
      }
    }

    return {
      email,
      password,
      register
    }
  }
}
</script>

<style scoped>
/* 保持样式 */
</style>