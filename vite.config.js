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

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

// Export the Vite configuration
export default defineConfig({
  plugins: [vue()],
  
  server: {
    port: 5173, // 确保端口与您的项目一致

    // 使用 configureServer 添加自定义中间件
    configureServer: (server) => {
      server.middlewares.use(async (req, res, next) => {
        // 检查是否为 POST 请求到 /api/addUser
        if (req.url === '/api/addUser' && req.method === 'POST') {
          let body = ''

          // 收集请求体数据
          req.on('data', (chunk) => {
            body += chunk.toString()
          })

          // 请求体数据接收完毕
          req.on('end', () => {
            try {
              const userData = JSON.parse(body) // 解析 JSON 数据

              const filePath = path.resolve(__dirname, 'src/localUsers.json') // 确保路径正确
              const fileExists = fs.existsSync(filePath)
              const fileData = fileExists ? fs.readFileSync(filePath, 'utf-8') : '[]'
              const users = JSON.parse(fileData)

              // 检查用户是否已存在，避免重复
              const existingUser = users.find(user => user.email.toLowerCase() === userData.email.toLowerCase())

              if (!existingUser) {
                users.push(userData) // 添加新用户
                fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8') // 写入文件
                console.log(`✅ 用户 ${userData.email} 已成功添加为 ${userData.role}`)

                // 发送成功响应
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: '用户已成功添加' }))
              } else {
                console.log(`⚠️ 用户 ${userData.email} 已存在，未重复添加`)

                // 发送已存在响应
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: '用户已存在，未重复添加' }))
              }
            } catch (error) {
              console.error('❌ 发生错误:', error)

              // 发送错误响应
              res.writeHead(500, { 'Content-Type': 'application/json' })
              res.end(JSON.stringify({ message: '添加用户失败', error: error.message }))
            }
          })
        } else {
          next() // 不是 /api/addUser 的请求，继续下一个中间件
        }
      })
    }
  },

  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: ({ name }) => {
          if (/\.(css|less|sass|scss)$/.test(name ?? '')) {
            return 'assets/css/[name]-[hash][extname]'
          }
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 使用 @ 别名引用 src 目录
    }
  }
})