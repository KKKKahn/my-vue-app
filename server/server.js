// import express from 'express';
// import fs from 'fs/promises';
// import path from 'path';
// import cors from 'cors';

// const app = express();
// const PORT = process.env.PORT || 3001;


// const USERS_FILE = path.resolve(path.dirname(''), 'localUsers.json'); // ✅ 放在项目根目录



// // 1️⃣ 配置 CORS，允许来自本地和生产环境的请求
// app.use(cors({
//   origin: ['http://localhost:5173', 'https://new.kahn.love'], // 允许的前端地址
//   methods: ['GET', 'POST'],
//   credentials: true
// }));

// app.use(express.json());

// // 2️⃣ 获取所有用户
// app.get('/api/users', async (req, res) => {
//   try {
//     const data = await fs.readFile(USERS_FILE, 'utf8');
//     const users = JSON.parse(data);
    
//     // 过滤指定的用户（如果带有 email 查询参数）
//     if (req.query.email) {
//       const filteredUsers = users.filter(user => user.email === req.query.email);
//       res.json(filteredUsers);
//     } else {
//       res.json(users);
//     }
//   } catch (err) {
//     console.error('❌ 读取 localUsers.json 失败:', err);
//     res.status(500).json({ error: '无法读取用户数据' });
//   }
// });

// // 3️⃣ 向 localUsers.json 中添加新用户
// app.post('/api/users', async (req, res) => {
//   const newUser = req.body;

//   try {
//     // 读取现有的用户数据
//     const data = await fs.readFile(USERS_FILE, 'utf8');
//     const users = JSON.parse(data);

//     // 检查用户是否已存在
//     const existingUser = users.find(user => user.email === newUser.email);
//     if (existingUser) {
//       return res.status(409).json({ error: '用户已存在' });
//     }

//     // 添加新用户到用户列表
//     users.push(newUser);
//     await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
//     console.log('✅ 成功将新用户写入 localUsers.json:', newUser);
//     res.status(201).json({ message: '用户已添加', user: newUser });
//   } catch (err) {
//     console.error('❌ 写入 localUsers.json 失败:', err);
//     res.status(500).json({ error: '无法写入用户数据' });
//   }
// });

// // 启动服务器
// app.listen(PORT, () => {
//   console.log(`🚀 服务器已启动，监听端口: http://localhost:${PORT}`);
// });

import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const app = express();
const PORT = 3001;

// 允许所有来源的请求
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'], 
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 读取 localUsers.json 文件
const localUsersPath = path.join(path.resolve(), 'localUsers.json');

const readUsers = () => {
  try {
    const data = fs.readFileSync(localUsersPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ 无法读取 localUsers.json:', error.message);
    return [];
  }
};

// API 路由
app.get('/api/users', (req, res) => {
  const email = req.query.email ? req.query.email.toLowerCase() : null; 
  if (!email) return res.status(400).json({ message: 'Missing email query parameter' });

  const users = readUsers();
  const user = users.find(user => user.email.toLowerCase() === email);
  if (user) res.status(200).json([user]);
  else res.status(404).json({ message: 'User not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 服务器在 http://localhost:${PORT}`);
});