import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 用户数据文件路径
const usersFilePath = path.join(__dirname, 'localUsers.json');

// 读取用户数据
const readUsersData = () => {
  try {
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('❌ 读取 localUsers.json 文件失败:', error.message);
    return [];
  }
};

// 写入用户数据
const writeUsersData = (usersData) => {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
    console.log('✅ 用户数据已成功写入 localUsers.json');
  } catch (error) {
    console.error('❌ 写入 localUsers.json 文件失败:', error.message);
  }
};

// 模拟 getUserByEmail（不需要联网）
const getUserByEmail = (email) => {
  const usersData = readUsersData();
  const user = usersData.find(user => user.email === email);
  if (!user) {
    throw new Error(`用户 ${email} 未找到`);
  }
  console.log(`✅ 找到了用户 ${email}`);
  return user;
};

// 模拟 setCustomUserClaims（不需要联网）
const setCustomUserClaims = (email, role) => {
  const usersData = readUsersData();
  const userIndex = usersData.findIndex(user => user.email === email);
  if (userIndex === -1) {
    throw new Error(`用户 ${email} 未找到`);
  }
  usersData[userIndex].role = role; // 设置自定义声明
  writeUsersData(usersData);
  console.log(`✅ 成功为 ${email} 设置自定义声明为 ${role}`);
};

const setCustomClaims = () => {
  const usersData = readUsersData();
  for (const user of usersData) {
    try {
      console.log(`🚀 正在为用户 ${user.email} 设置角色 ${user.role}...`);
      setCustomUserClaims(user.email, user.role);
      console.log(`✅ 成功为 ${user.email} 设置自定义声明为 ${user.role}`);
    } catch (error) {
      console.error(`❌ 设置 ${user.email} 的角色时出错:`, error.message);
    }
  }
};

const run = () => {
  try {
    setCustomClaims();
    console.log('✅ 所有自定义声明已成功设置。');
  } catch (error) {
    console.error('❌ 设置自定义声明时出错:', error);
  } finally {
    console.log('🛠️ 脚本执行结束，准备退出...');
    process.exit(0);
  }
};

run();