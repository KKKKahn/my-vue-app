// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [vue()],
// })

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// export default defineConfig({
//   plugins: [vue()],
//   build: {
//     rollupOptions: {
//       output: {
//         chunkFileNames: 'assets/js/[name]-[hash].js',
//         entryFileNames: 'assets/js/[name]-[hash].js',
//         assetFileNames: ({name}) => {
//           if (/\.(css|less|sass|scss)$/.test(name ?? '')) {
//             return 'assets/css/[name]-[hash][extname]'
//           }
//           return 'assets/[name]-[hash][extname]'
//         }
//       }
//     }
//   }
// })

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // 目标服务器
        changeOrigin: true, // 必须为 true
        rewrite: (path) => path.replace(/^\/api/, '') // 移除 /api 前缀
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({name}) => {
          if (/\.(css|less|sass|scss)$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  }
});