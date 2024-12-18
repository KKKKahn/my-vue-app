<template>
  <nav class="navbar">
    <!-- 桌面端的登录/登出按钮 -->
    <div class="auth-button desktop-only">
      <div v-if="user" class="desktop-user-info">
        <span class="user-email">{{ user.email }}</span>
        <!-- 用户头像和下拉菜单 -->
        <div class="desktop-user-avatar-container" @mouseover="showDropdown" @mouseleave="hideDropdown"
          @click="toggleDropdown">
          <img :src="userAvatar" alt="用户头像" class="desktop-user-avatar" />
          <!-- 下拉菜单 -->
          <div v-if="dropdownVisible" class="dropdown-menu">
            <!-- 显示用户角色 -->
            <div class="dropdown-item role-item">
              <strong></strong> {{ userRole }}
            </div>
            <div class="dropdown-item">个人资料</div>
            <div class="dropdown-item" @click="logout">登出</div>
          </div>
        </div>
      </div>
      <div v-else>
        <router-link to="/login" class="button">登录</router-link>
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
  </nav>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: 'DesktopNav',
  setup() {
    const user = ref(null);
    const userRole = ref('加载中...');
    const userAvatar = ref('https://www.kahn.love/wp-content/uploads/2024/11/2.webp');
    const dropdownVisible = ref(false);
    const router = useRouter();
    const apiBaseUrl = 'https://new.kahn.love/api/users';

    const getUserInfo = async (email, retryCount = 5) => {
      try {
        const response = await axios.get(`${apiBaseUrl}?email=${encodeURIComponent(email)}`);
        const userData = response.data || {};
        if (userData && userData.role) {
          return { role: userData.role, avatar: userData.avatar };
        } else {
          return { role: 'Member', avatar: 'https://www.kahn.love/wp-content/uploads/2024/11/2.webp' };
        }
      } catch (error) {
        console.error(error.message);
        return { role: 'Member', avatar: 'https://www.kahn.love/wp-content/uploads/2024/11/2.webp' };
      }
    };

    onMounted(() => {
      auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          user.value = currentUser;
          const { role, avatar } = await getUserInfo(currentUser.email);
          userRole.value = role;
          userAvatar.value = avatar;
        } else {
          user.value = null;
        }
      });
    });

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

    const showDropdown = () => {
      dropdownVisible.value = true;
    };

    const hideDropdown = () => {
      dropdownVisible.value = false;
    };

    const toggleDropdown = (event) => {
      // 如果点击了头像图标，显示/隐藏下拉菜单
      dropdownVisible.value = !dropdownVisible.value;
      // 阻止事件冒泡，避免触发 `@mouseleave` 的隐藏行为
      event.stopPropagation();
    };

    // 点击页面其他地方时，关闭下拉菜单
    const closeDropdown = () => {
      dropdownVisible.value = false;
    };

    // 在 mounted 时添加全局点击事件监听，点击其他区域时关闭下拉菜单
    onMounted(() => {
      window.addEventListener('click', closeDropdown);
    });

    // 在 unmounted 时移除全局点击事件监听
    onBeforeUnmount(() => {
      window.removeEventListener('click', closeDropdown);
    });

    return {
      user,
      userRole,
      userAvatar,
      dropdownVisible,
      showDropdown,
      hideDropdown,
      toggleDropdown,
      logout,
    };
  },
};
</script>


<style scoped>
.dropdown-menu {
  position: absolute;
  top: 45px;
  /* 菜单位置位于头像下方 */
  right: 0;
  background-color: var(--menu);
  color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 180px;
  z-index: 10;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #444c56;
}

.role-item {
  background-color: #2d3139;
  font-weight: bold;
  color: #ff6b6b;
}



.button {
  padding: 8px 16px;
  border-radius: 10px;
  border: none;
  text-decoration: none;
  font-size: 14px;
}





/* 桌面端导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
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

.nav-link {
  margin: 0 15px;
}


.auth-button {
  position: absolute;
  right: 20px;
  top: 15px;
}

.desktop-user-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}


.user-email {
  font-size: 14px;
  font-weight: bold;
}


.desktop-user-avatar-container {
  position: relative;
  cursor: pointer;
}

.desktop-user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-left: 10px;
}


.dropdown-item {
  padding: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
}


.desktop-only {
  display: block;
}
</style>