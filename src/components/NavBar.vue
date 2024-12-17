<template>
  <div>
    <!-- 判断设备类型并加载对应的组件 -->
    <DesktopNav v-if="isDesktop" />
    <MobileNav v-else />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import DesktopNav from './DesktopNav.vue';  // 桌面端导航栏组件
import MobileNav from './MobileNav.vue';    // 移动端导航栏组件

export default {
  name: 'NavBar',
  components: {
    DesktopNav,
    MobileNav,
  },
  setup() {
    const isDesktop = ref(false);

    const checkDevice = () => {
      isDesktop.value = window.innerWidth > 768; // 判断是否为桌面端
    };

    onMounted(() => {
      checkDevice();
      window.addEventListener('resize', checkDevice); // 监听窗口大小变化
    });

    return {
      isDesktop,
    };
  },
};
</script>

<style scoped>

</style>