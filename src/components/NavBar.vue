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
        <img :src="userAvatar" alt="用户头像" class="user-avatar" /> 
        <span class="user-role">{{ userRole }}</span> 
        <span class="user-email">{{ user.email }}</span>
        <button class="logout-button" @click="logout">登出</button>
      </div>
      <div v-else>
        <router-link to="/login" class="login-button">登录</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import axios from 'axios'; // 🔥 引入 axios

export default {
  name: 'NavBar',
  setup() {
    const user = ref(null);
    const userRole = ref('加载中...'); // 🔥 初始角色显示为“加载中...”
    const userAvatar = ref('https://example.com/default-avatar.png'); 
    const isMenuOpen = ref(false);
    const router = useRouter();

    // 1️⃣ 动态设置 API 基础 URL
    const apiBaseUrl = window.location.origin.includes('localhost')
      ? 'http://localhost:3001/api/users'
      : 'https://new.kahn.love/api/users';

    // 2️⃣ 获取当前用户的角色和头像，增加重试机制
    const getUserInfo = async (email, retryCount = 5) => {
      try {
        const response = await axios.get(`${apiBaseUrl}?email=${email}`);
        const userData = response.data[0]; 
        if (userData) {
          console.log(`✅ 找到了用户 ${email}，角色为 ${userData.role}`);
          return { role: userData.role, avatar: userData.avatar };
        } else {
          if (retryCount > 0) {
            console.warn(`⚠️ 没有找到用户 ${email} 的角色信息，正在重试...`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // 1秒延迟
            return getUserInfo(email, retryCount - 1);
          } else {
            console.warn(`⚠️ 重试 5 次后仍未找到用户 ${email} 的角色信息`);
            return { role: '未知角色', avatar: 'https://example.com/default-avatar.png' };
          }
        }
      } catch (error) {
        console.error('❌ 读取用户信息失败:', error.message);
        return { role: '未知角色', avatar: 'https://example.com/default-avatar.png' };
      }
    };

    // 3️⃣ 当组件加载时，监听 Firebase 的登录状态
    onMounted(() => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          console.log('当前登录用户的 email:', currentUser.email);
          user.value = currentUser; 
          const { role, avatar } = await getUserInfo(currentUser.email);
          userRole.value = role;
          userAvatar.value = avatar;
        } else {
          user.value = null; 
          userRole.value = '未登录'; // 🔥 确保在退出登录后恢复为 "未登录"
        }
      });
    });

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    const logout = async () => {
      try {
        await signOut(auth);
        user.value = null;
        userRole.value = '未登录'; 
        userAvatar.value = 'https://example.com/default-avatar.png'; 
        router.push('/login');
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      user,
      userRole, 
      userAvatar, 
      isMenuOpen,
      toggleMenu,
      closeMenu,
      logout
    };
  }
};
</script>

<style scoped>
/* 样式与之前一致，略 */
</style>

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

.logout-button {
  background-color: #6c5ce7;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
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
  font-size: 14px;
}

.login-button:hover {
  background: rgba(109, 109, 109, 0.201);
}
</style>