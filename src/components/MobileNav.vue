<template>
  <nav class="navbar">
    <!-- 汉堡菜单按钮 -->
    <div class="burger-menu" @click="toggleMenu">
      <div v-if="!isMenuOpen" class="line"></div>
      <div v-if="!isMenuOpen" class="line"></div>
      <div v-if="!isMenuOpen" class="line"></div>
    </div>

    <!-- 菜单的透明遮罩层 -->
    <div v-if="isMenuOpen" class="menu-overlay" @click="closeMenu">
    </div>

    <!-- 移动端汉堡菜单 -->
    <div v-if="isMenuOpen" class="mobile-menu">
      <!-- 右上角的用户信息 -->
      <router-link to="/home" class="nav-link" @click="closeMenu">首页</router-link>
      <router-link to="/search" class="nav-link" @click="closeMenu">搜索</router-link>
      <router-link to="/tools" class="nav-link" @click="closeMenu">工具</router-link>
      <router-link to="/contact" class="nav-link" @click="closeMenu">联系</router-link>
      <router-link to="/about" class="nav-link" @click="closeMenu">关于</router-link>

      <div class="auth-container">
        <div v-if="user" class="user-info">
          <img :src="userAvatar" alt="用户头像" class="user-avatar" />
          <div class="user-details">
            <span class="user-role">{{ userRole }}</span>
            <span class="user-email">{{ user.email }}</span>
          </div>
          <button class="button" @click="logout">登出</button>
        </div>
        <div v-else>
          <router-link to="/login" class="button" @click="closeMenu">登录</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
import { ref, onMounted } from 'vue';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import axios from 'axios'; // 引入 axios 以便发送请求

export default {
  name: 'NavBar',
  setup() {
    const user = ref(null);
    const userRole = ref('加载中...'); // 初始角色显示为“加载中...”
    const userAvatar = ref('https://www.kahn.love/wp-content/uploads/2024/11/2.webp');
    const isMenuOpen = ref(false);
    const router = useRouter();
    // Cloudflare Worker API 地址
    const apiBaseUrl = 'https://new.kahn.love/api/users'; // 这里填写 Cloudflare Worker API 地址

    // 📘 获取当前用户的角色和头像，增加重试机制
    const getUserInfo = async (email, retryCount = 5) => {
      try {
        console.log(`🌐 请求 URL: ${apiBaseUrl}?email=${encodeURIComponent(email)}`);

        // 向 Cloudflare Worker 发送 GET 请求，获取用户数据
        const response = await axios.get(`${apiBaseUrl}?email=${encodeURIComponent(email)}`);

        console.log('📂 API 返回的数据:', response.data);

        const userData = response.data || {}; // 使用响应数据
        if (userData && userData.role) {
          console.log(`✅ 找到了用户 ${email}，角色为 ${userData.role}`);
          return { role: userData.role, avatar: userData.avatar };
        } else {
          // 如果没有找到用户信息，则尝试重试
          if (retryCount > 0) {
            console.warn(`⚠️ 没有找到用户 ${email} 的角色信息，正在重试...`);
            await new Promise((resolve) => setTimeout(resolve, 1000)); // 等待 1 秒
            return getUserInfo(email, retryCount - 1); // 递归重试
          } else {
            console.warn(`⚠️ 重试 5 次后仍未找到用户 ${email} 的角色信息`);

            // 如果 KV 中没有找到用户，返回默认信息并将该用户添加到 Cloudflare KV
            await createUserInKV(email);
            return { role: 'Member', avatar: 'https://www.kahn.love/wp-content/uploads/2024/11/2.webp' };
          }
        }
      } catch (error) {
        console.error('❌ 读取用户信息失败:', error.message);

        // 出现错误时返回默认角色和头像
        await createUserInKV(email); // 创建用户并添加到 KV
        return { role: 'Member', avatar: 'https://www.kahn.love/wp-content/uploads/2024/11/2.webp' };
      }
    };

    // 创建用户并将角色和头像信息存储到 Cloudflare KV
    const createUserInKV = async (email) => {
      try {
        console.log(`🌐 创建新用户 ${email}，存储默认信息`);
        const userData = {
          role: 'Member',
          avatar: 'https://www.kahn.love/wp-content/uploads/2024/11/2.webp'
        };

        // 向 Cloudflare Worker API 发送 POST 请求创建新用户
        await axios.post(apiBaseUrl, {
          email,
          role: userData.role,
          avatar: userData.avatar
        });
        console.log(`✅ 用户 ${email} 已成功添加到 Cloudflare KV`);
      } catch (error) {
        console.error('❌ 创建用户失败:', error.message);
      }
    };

    onMounted(() => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          console.log('当前登录用户的 email:', currentUser.email);
          user.value = currentUser;

          // 获取用户角色和头像信息
          const { role, avatar } = await getUserInfo(currentUser.email);
          userRole.value = role;
          userAvatar.value = avatar;
        } else {
          user.value = null; // 如果没有用户登录，重置状态
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
        userRole.value = '加载中...';
        userAvatar.value = '';
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


.user-info {
  display: flex;
  align-items: center;
  /* 垂直居中对齐 */
  justify-content: flex-end;
  /* 让内容靠右 */
  position: relative;
}



.user-details {
  display: flex;
  flex-direction: column;
  /* 垂直排列角色和邮箱 */
  margin-right: 10px;
}


.user-avatar {
  width: 40px;
  /* 控制图片大小 */
  height: 40px;
  /* 控制图片大小 */
  border-radius: 50%;
  /* 图片圆形 */
  top: 0;
  right: 0;
}



.user-email {
  color: #fff;
  font-size: 12px;
}

.user-role {
  color: #ff6b6b;
  font-weight: bold;
}



.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  background-color: var(--menu);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000;
  padding-top: 20px;
  box-sizing: border-box;
}

.auth-container {
  margin-top: auto;
  width: 100%;
  text-align: center;
  height: 70px;
}



.button {
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
}



.nav-center {
  display: flex;
  justify-content: center;
  align-items: center;
}


.burger-menu {
  display: flex;
  position: absolute;
  top: 27px; /* 控制距离顶部的距离 */
  right: 27px; /* 控制距离右侧的距离 */
  flex-direction: column;
  justify-content: space-around;
  height: 35px; /* 修改按钮的总高度 */
  cursor: pointer;
}

/* 修改每条线的宽度和高度 */
.burger-menu .line {
  width: 35px;  /* 控制每条线的宽度 */
  height: 4px;  /* 控制每条线的高度 */
  border-radius: 2px; /* 可选，设置线条的圆角 */
  background-color: var(--text-color); /* 设置线条颜色为文本颜色 */
  transition: all 0.3s ease;
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



.nav-link {
  margin: 15px 0;
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
</style>