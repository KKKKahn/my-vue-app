import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// // 动态确定路径，适配本地和服务器
// const ROOT_PATH = process.env.NODE_ENV === 'production' 
//   ? '/var/www/vue-app/public' // 生产环境路径
//   : path.resolve(path.dirname(''), 'public'); // 本地路径

// const USERS_FILE = path.join(ROOT_PATH, 'localUsers.json'); // 用户文件的路径
const USERS_FILE = path.resolve(path.dirname(''), 'localUsers.json'); // ✅ 放在项目根目录



// 1️⃣ 配置 CORS，允许来自本地和生产环境的请求
app.use(cors({
  origin: ['http://localhost:5173', 'https://new.kahn.love'], // 允许的前端地址
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// 2️⃣ 获取所有用户
app.get('/api/users', async (req, res) => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    const users = JSON.parse(data);
    
    // 过滤指定的用户（如果带有 email 查询参数）
    if (req.query.email) {
      const filteredUsers = users.filter(user => user.email === req.query.email);
      res.json(filteredUsers);
    } else {
      res.json(users);
    }
  } catch (err) {
    console.error('❌ 读取 localUsers.json 失败:', err);
    res.status(500).json({ error: '无法读取用户数据' });
  }
});

// 3️⃣ 向 localUsers.json 中添加新用户
app.post('/api/users', async (req, res) => {
  const newUser = req.body;

  try {
    // 读取现有的用户数据
    const data = await fs.readFile(USERS_FILE, 'utf8');
    const users = JSON.parse(data);

    // 检查用户是否已存在
    const existingUser = users.find(user => user.email === newUser.email);
    if (existingUser) {
      return res.status(409).json({ error: '用户已存在' });
    }

    // 添加新用户到用户列表
    users.push(newUser);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    console.log('✅ 成功将新用户写入 localUsers.json:', newUser);
    res.status(201).json({ message: '用户已添加', user: newUser });
  } catch (err) {
    console.error('❌ 写入 localUsers.json 失败:', err);
    res.status(500).json({ error: '无法写入用户数据' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 服务器已启动，监听端口: http://localhost:${PORT}`);
});