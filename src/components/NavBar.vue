<template>
  <nav class="navbar">
    <!-- 汉堡菜单按钮 -->
    <div class="burger-menu" @click="toggleMenu">
      <div v-if="!isMenuOpen" class="line"></div>
      <div v-if="!isMenuOpen" class="line"></div>
      <div v-if="!isMenuOpen" class="line"></div>

      <!-- 关闭菜单的 X 图标 -->
      <div v-if="isMenuOpen" class="close-icon">✖️</div>
    </div>

    <!-- 桌面端的登录/登出按钮 -->
    <div class="auth-button desktop-only">
      <div v-if="user" class="user-info">
        <span class="user-role">{{ userRole }}</span> <!-- 🔥 显示角色 -->
        <span class="user-email">{{ user.email }}</span>
        <button class="logout-button" @click="logout">登出</button>
      </div>
      <div v-else>
        <router-link to="/login" class="login-button">登录</router-link>
      </div>
    </div>

    <!-- 居中的导航链接 -->
    <div class="nav-center">
      <router-link to="/home" class="nav-link">首页</router-link>
      <router-link to="/search" class="nav-link">搜索</router-link>
      <router-link to="/tools" class="nav-link">工具</router-link>
      <router-link to="/contact" class="nav-link">联系</router-link>
      <router-link to="/about" class="nav-link">关于</router-link>
    </div>

    <!-- 菜单的透明遮罩层 -->
    <div 
      v-if="isMenuOpen" 
      class="menu-overlay" 
      @click="closeMenu">
    </div>

    <!-- 移动端汉堡菜单 -->
    <div v-if="isMenuOpen" class="mobile-menu">
      <!-- 右上角的用户信息 -->
      <div class="auth-container">
        <div v-if="user" class="user-info">
          <img :src="userAvatar" alt="用户头像" class="user-avatar" /> <!-- 🔥 用户头像 -->
          <span class="user-role">{{ userRole }}</span> <!-- 🔥 显示角色 -->
          <span class="user-email">{{ user.email }}</span>
          <button class="logout-button" @click="logout">登出</button>
        </div>
        <div v-else>
          <router-link to="/login" class="mobile-login-button" @click="closeMenu">登录</router-link>
        </div>
      </div>

      <router-link to="/home" class="mobile-nav-link" @click="closeMenu">首页</router-link>
      <router-link to="/search" class="mobile-nav-link" @click="closeMenu">搜索</router-link>
      <router-link to="/tools" class="mobile-nav-link" @click="closeMenu">工具</router-link>
      <router-link to="/contact" class="mobile-nav-link" @click="closeMenu">联系</router-link>
      <router-link to="/about" class="mobile-nav-link" @click="closeMenu">关于</router-link>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'NavBar',
  setup() {
    const user = ref(null)
    const userRole = ref('') // 🔥 存储用户的角色
    const userAvatar = ref('') // 🔥 存储用户的头像
    const isMenuOpen = ref(false)
    const router = useRouter()

    // 获取当前用户的角色和头像
    const getUserInfo = async (email) => {
      try {
        const response = await fetch('/localUsers.json') // 🔥 使用 fetch 而不是 import
        const localUsers = await response.json()
        console.log('📂 读取的 localUsers.json 数据为:', localUsers)
        const userData = localUsers.find((user) => user.email.toLowerCase() === email.toLowerCase()) // 🔥 不区分大小写
        if (userData) {
          console.log(`✅ 找到了用户 ${email}，角色为 ${userData.role}`)
          return { role: userData.role, avatar: userData.avatar }
        } else {
          console.warn(`⚠️ 没有找到用户 ${email} 的角色信息`)
          return { role: '未知角色', avatar: 'https://example.com/default-avatar.png' }
        }
      } catch (error) {
        console.error('❌ 读取 localUsers.json 文件失败:', error.message)
        return { role: '未知角色', avatar: 'https://example.com/default-avatar.png' }
      }
    }

    onMounted(() => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          console.log('当前登录用户的 email:', currentUser.email)
          user.value = currentUser // 🔥 确保 user 变量被赋值
          localStorage.setItem('userEmail', currentUser.email) // 🔥 存储 email 到 localStorage
          const { role, avatar } = await getUserInfo(currentUser.email)
          userRole.value = role
          userAvatar.value = avatar
        } else {
          user.value = null // 🔥 当没有用户时，确保 user 为空
          localStorage.removeItem('userEmail') // 清除 localStorage 中的 email
        }
      })

      const savedEmail = localStorage.getItem('userEmail')
      if (savedEmail) {
        console.log('📂 从 localStorage 中加载用户 email:', savedEmail)
        getUserInfo(savedEmail).then(({ role, avatar }) => {
          userRole.value = role
          userAvatar.value = avatar
          user.value = { email: savedEmail } // 设置一个假的 user 对象
        })
      }
    })

    const logout = async () => {
      try {
        await signOut(auth)
        user.value = null
        userRole.value = ''
        userAvatar.value = ''
        localStorage.removeItem('userEmail')
        router.push('/login')
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      user,
      userRole,
      userAvatar,
      isMenuOpen,
      toggleMenu: () => (isMenuOpen.value = !isMenuOpen.value),
      closeMenu: () => (isMenuOpen.value = false),
      logout
    }
  }
}
</script>

<style scoped>


.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%; 
  object-fit: cover; 
  margin-right: 8px;
}

.user-role {
  color: #ff6b6b; 
  font-size: 14px; 
  font-weight: bold; 
  margin-right: 8px; 
}

.user-email {
  color: #ffffff; 
  font-size: 14px; 
  margin-right: 10px; 
}


.auth-container {
    width: none;
    height: 190px;
    background-color: #0d1117;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}



/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #0d1117;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
}

.auth-button {
  position: absolute;
  right: 20px; 
  top: 15px; 
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-email {
  color: #ffffff; 
  font-size: 14px; 
  margin-right: 10px; 
}

.logout-button {
  background-color: #6c5ce7;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}

.logout-button:hover {
  background: rgb(123, 123, 123);
}

.login-button {
  background-color: #6c5ce7;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  text-decoration: none;
  font-size: 14px;
}

.login-button:hover {
  background: rgba(109, 109, 109, 0.201);
}

.nav-link {
  color: #e1e1e1; 
  text-decoration: none;
  margin: 0 15px;
  font-size: 16px;
}

.nav-link:hover {
  text-decoration: underline;
}

.nav-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.burger-menu {
  display: none;
  position: absolute;
  top: 13px;
  right: 20px; 
  flex-direction: column;
  justify-content: space-around;
  height: 30px;
  cursor: pointer;
}

.burger-menu .line {
  width: 25px;
  height: 3px;
  background-color: #ffffff;
  border-radius: 2px;
}

.close-icon {
  font-size: 24px;
  color: #ffffff;
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
  backdrop-filter: blur(5px); 
  z-index: 900; 
}

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 80%;
  height: 100vh;
  background-color: #0d1117;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000; 
  padding-top: 20px;
}

.mobile-nav-link {
  color: #ffffff;
  font-size: 20px;
  margin: 15px 0;
  text-decoration: none;
}

.mobile-auth {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
}

.mobile-user-info {
  display: flex;
  align-items: center;
}

.mobile-user-email {
  color: #ffffff;
  font-size: 14px;
  margin-right: 10px;
}

.mobile-login-button, 
.mobile-logout-button {
  background-color: #6c5ce7;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  text-align: center;
}

.mobile-login-button:hover, 
.mobile-logout-button:hover {
  background: black;
}

.desktop-only {
  display: none;
}

.logout-button {
  background-color: #6c5ce7;
  border: none;
  padding: 8px 16px;
  border-radius: 10px;
  color: #ffffff;
}

@media (max-width: 768px) {
  .nav-center {
    display: none; 
  }

  .burger-menu {
    display: flex; 
  }

  .auth-button {
    display: none;
  }

  .desktop-only {
    display: none;
  }

  .mobile-auth {
    display: flex;
  }

  .mobile-user-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  .mobile-user-email {
    color: #ffffff;
    font-size: 14px;
    margin-right: 10px;
  }

  .mobile-logout-button, 
  .mobile-login-button {
    background-color: #6c5ce7;
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 10px;
    border: none;
    font-size: 14px;
  }

  .mobile-logout-button:hover, 
  .mobile-login-button:hover {
    background: rgb(112, 112, 112);
  }
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }

  .mobile-auth {
    display: none;
  }

  .auth-button {
    display: flex;
    justify-content: flex-end; 
  }
}

</style>