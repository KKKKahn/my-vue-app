<template>
  <nav class="navbar">
    <!-- 右上角的汉堡菜单按钮（仅在移动设备上可见） -->
    <div class="burger-menu" @click="toggleMenu">
      <div v-if="!isMenuOpen" class="line"></div>
      <div v-if="!isMenuOpen" class="line"></div>
      <div v-if="!isMenuOpen" class="line"></div>

      <!-- 返回图标（❌） -->
      <div v-if="isMenuOpen" class="close-icon">✖️</div>
    </div>

    <!-- 居中显示的导航链接 (桌面端) -->
    <div class="nav-center">
      <router-link to="/home" class="nav-link">首页</router-link>
      <router-link to="/about" class="nav-link">关于</router-link>
      <router-link to="/contact" class="nav-link">联系我们</router-link>
      <router-link to="/search" class="nav-link">搜索</router-link>
      <router-link to="/tools" class="nav-link">工具</router-link>
    </div>

    <!-- 右侧的用户操作 -->
    <div class="navbar-right">
      <div v-if="user">
        <span class="user-email">{{ user.email }}</span>
        <button class="logout-button" @click="logout">登出</button>
      </div>
      <div v-else>
        <router-link to="/login" class="nav-link">登录</router-link>
        <router-link to="/register" class="nav-link">注册</router-link>
      </div>
    </div>

    <!-- 折叠菜单（小屏幕时显示的菜单） -->
    <div v-if="isMenuOpen" class="mobile-menu">
      <router-link to="/home" class="mobile-nav-link" @click="closeMenu">首页</router-link>
      <router-link to="/about" class="mobile-nav-link" @click="closeMenu">关于</router-link>
      <router-link to="/contact" class="mobile-nav-link" @click="closeMenu">联系我们</router-link>
      <router-link to="/search" class="mobile-nav-link" @click="closeMenu">搜索</router-link>
      <router-link to="/tools" class="mobile-nav-link" @click="closeMenu">工具</router-link>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default {
  name: 'NavBar',
  setup() {
    const user = ref(null);
    const isMenuOpen = ref(false);

    onMounted(() => {
      auth.onAuthStateChanged((currentUser) => {
        user.value = currentUser;
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
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      user,
      isMenuOpen,
      toggleMenu,
      closeMenu,
      logout
    };
  }
};
</script>

<style scoped>
/* 主导航栏样式 */
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

.nav-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-right {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
}

.nav-link {
  color: #e1e1e1;
  text-decoration: none;
  margin: 0 15px;
  font-size: 16px;
}

.burger-menu {
  display: none;
  position: absolute;
  top: 15px;
  right: 20px;
  flex-direction: column;
  justify-content: space-around;
  height: 20px;
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

.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0d1117;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mobile-nav-link {
  color: #ffffff;
  font-size: 20px;
  margin: 15px 0;
  text-decoration: none;
}

.logout-button {
  background-color: #6c5ce7;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  color: #ffffff;
}

button:hover {
  background: linear-gradient(90deg, #8e44ad 0%, #3498db 100%);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-center {
    display: none; /* 隐藏导航链接 */
  }

  .navbar-right {
    display: none; /* 隐藏右侧用户按钮 */
  }

  .burger-menu {
    display: flex; /* 显示汉堡菜单按钮 */
  }
}
</style>