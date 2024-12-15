// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001; // 后端服务器端口

// 中间件
app.use(cors());
app.use(bodyParser.json());

// API 路由：添加用户
app.post('/api/addUser', (req, res) => {
  const { email, role, avatar } = req.body;

  if (!email || !role || !avatar) {
    return res.status(400).json({ message: '缺少必要的用户信息' });
  }

  const filePath = path.join(__dirname, 'public', 'localUsers.json');

  // 读取现有用户数据
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ 读取 localUsers.json 文件失败:', err.message);
      return res.status(500).json({ message: '服务器内部错误' });
    }

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      console.error('❌ 解析 localUsers.json 失败:', parseErr.message);
      return res.status(500).json({ message: '服务器内部错误' });
    }

    // 检查用户是否已存在
    const existingUser = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return res.status(200).json({ message: '用户已存在，未重复添加' });
    }

    // 添加新用户
    users.push({ email, role, avatar });

    // 写回文件
    fs.writeFile(filePath, JSON.stringify(users, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('❌ 写入 localUsers.json 文件失败:', writeErr.message);
        return res.status(500).json({ message: '服务器内部错误' });
      }

      console.log(`✅ 用户 ${email} 已成功添加为 ${role}`);
      return res.status(200).json({ message: '用户已成功添加' });
    });
  });
});

// API 路由：获取用户信息
app.get('/api/getUser', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: '缺少用户邮箱' });
  }

  const filePath = path.join(__dirname, 'src', 'localUsers.json');

  // 读取现有用户数据
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('❌ 读取 localUsers.json 文件失败:', err.message);
      return res.status(500).json({ message: '服务器内部错误' });
    }

    let users = [];
    try {
      users = JSON.parse(data);
    } catch (parseErr) {
      console.error('❌ 解析 localUsers.json 失败:', parseErr.message);
      return res.status(500).json({ message: '服务器内部错误' });
    }

    // 查找用户
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: '用户未找到' });
    }
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 后端服务器正在运行，访问 http://localhost:${PORT}/api/addUser`);
});