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

    <!-- 登录/注销 按钮 (右上角) -->
    <div class="auth-button">
  <div v-if="user">
    <button class="logout-button" @click="logout">登出</button>
  </div>
  <div v-else>
    <router-link to="/login" class="login-button">登录</router-link>
  </div>
</div>

    <!-- 居中显示的导航链接 (桌面端) -->
    <div class="nav-center">
      <router-link to="/home" class="nav-link">首页</router-link>
      <router-link to="/search" class="nav-link">搜索</router-link>
      <router-link to="/tools" class="nav-link">工具</router-link>
      <router-link to="/contact" class="nav-link">联系</router-link>
      <router-link to="/about" class="nav-link">关于</router-link>
    </div>
<!-- 透明的遮罩层，点击时关闭菜单 -->
<div 
  v-if="isMenuOpen" 
  class="menu-overlay" 
  @click="closeMenu">
</div>
    <!-- 折叠菜单（小屏幕时显示的菜单） -->
    <div v-if="isMenuOpen" class="mobile-menu">
      <router-link to="/home" class="mobile-nav-link" @click="closeMenu">首页</router-link>
      <router-link to="/search" class="mobile-nav-link" @click="closeMenu">搜索</router-link>
      <router-link to="/tools" class="mobile-nav-link" @click="closeMenu">工具</router-link>
      <router-link to="/contact" class="mobile-nav-link" @click="closeMenu">联系</router-link>
      <router-link to="/about" class="mobile-nav-link" @click="closeMenu">关于</router-link>
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
        user.value = null;
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

.auth-button {
  position: absolute;
  right: 20px; 
  top: 15px; 
  display: flex;
  align-items: center;
}


.login-button, 
.logout-button {
  background-color: #6c5ce7; /* 按钮的背景色 */
  color: #ffffff; /* 按钮的文字颜色 */
  padding: 8px 16px; /* 控制按钮的内边距（会影响按钮的高度和宽度） */
  border-radius: 10px; /* 按钮的圆角 */
  border: none; /* 边框 */
  text-decoration: none; /* 去掉 router-link 的下划线 */
  font-size: 14px; /* 文字的大小，调整文字的大小 */
  margin-left: 10px; /* 按钮之间的间距 */
  display: inline-flex; /* 让按钮的布局和 router-link 一致 */
  justify-content: center; /* 让按钮内的文字水平居中 */
  align-items: center; /* 让按钮内的文字垂直居中 */
  height: 40px; /* 按钮的高度，直接控制按钮的垂直大小 */
  min-width: 70px; /* 按钮的最小宽度，确保“登录”和“登出”按钮宽度一致 */
  text-align: center; /* 按钮内文字的居中对齐 */
  box-sizing: border-box; /* 确保 padding 不影响宽度 */
}


.login-button:hover, 
.logout-button:hover {
  background: linear-gradient(90deg, #8e44ad 0%, #3498db 100%);
}

.burger-menu {
  display: none;
  position: absolute;
  top: 13px;
  right: 80px; /* 调整右侧按钮的位置 */
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
  justify-content: center;
  align-items: center;
  z-index: 1000; 
}


.mobile-nav-link {
  color: #ffffff;
  font-size: 20px;
  margin: 15px 0;
  text-decoration: none;
}

.mobile-login-button, .mobile-logout-button {
  background-color: #6c5ce7;
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  font-size: 16px;
}

.mobile-login-button:hover, .mobile-logout-button:hover {
  background: linear-gradient(90deg, #8e44ad 0%, #3498db 100%);
}

.logout-button {
  background-color: #6c5ce7;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  color: #ffffff;
}
@media (max-width: 768px) {
  .login-button, 
  .logout-button {
    font-size: 14px; 
    padding: 8px 16px; 
    height: 35px; 
    min-width: 60px; 
    line-height: 0.5; 
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
}
@media (max-width: 768px) {
  .nav-center {
    display: none; 
  }

  .auth-button {
    display: flex !important; 
    justify-content: flex-end; 
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .burger-menu {
    display: flex; 
  }
}
</style>