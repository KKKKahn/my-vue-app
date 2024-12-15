# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).



🚀 目标

您希望在用户注册后，自动将其角色设置为“Member”，并将角色信息存储在本地的 localUsers.json 文件中。您希望避免使用复杂的数据库解决方案，而是通过简单的方式在您的服务器上存储和修改 JSON 文件。

🔍 问题分析
	•	前端限制：浏览器端的 Vue.js 应用无法直接读取或写入服务器上的本地文件系统。
	•	后端需求：需要一个简单的后端服务器来管理 localUsers.json 文件，并通过 HTTP API 允许前端进行读取和写入操作。

🛠️ 解决方案概述

为了实现您的需求，我们将采用以下步骤：
	1.	使用 JSON Server：这是一个简易的工具，可以快速将 JSON 文件转化为 RESTful API，无需编写额外的后端代码。
	2.	配置前端与 JSON Server 通信：在用户注册后，将用户信息发送到 JSON Server，以更新 localUsers.json。
	3.	在导航栏中获取用户角色信息：通过向 JSON Server 发送请求，根据用户的邮箱获取角色和头像信息。

✅ 详细步骤

步骤 1：安装和配置 JSON Server

1️⃣ 全局安装 JSON Server

在您的项目根目录下（例如 /Users/kahn/my-vue-app），打开终端并运行：

npm install -g json-server

2️⃣ 创建 localUsers.json 文件

在项目根目录下创建一个名为 localUsers.json 的文件，并初始化为空数组：

{
  "users": []
}

文件路径：

/Users/kahn/my-vue-app/localUsers.json

3️⃣ 启动 JSON Server

在终端中运行以下命令，以启动 JSON Server 并监听在 http://localhost:3001：

json-server --watch localUsers.json --port 3001

预期输出：

\{^_^}/ hi!

  Loading localUsers.json
  Done

  Resources
  http://localhost:3001/users

  Home
  http://localhost:3001

📌 注意： 保持 JSON Server 在后台运行，或使用终端多任务功能（如 tmux、screen 或新开一个终端标签页）以便同时运行前端和后端。

步骤 2：修改前端代码以与 JSON Server 通信

1️⃣ 安装 Axios

Axios 是一个流行的 HTTP 客户端，用于发送请求到后端 API。安装 Axios：

cd /Users/kahn/my-vue-app
npm install axios

2️⃣ 修改 Register.vue 以在注册后添加用户到 localUsers.json

文件：src/components/Register.vue

解释：
	•	Axios POST 请求：在成功注册 Firebase 用户后，向 JSON Server 发送 POST 请求，将用户的邮箱、默认角色和头像信息添加到 localUsers.json 中。
	•	错误处理：如果 JSON Server 返回错误信息，显示具体的错误原因。

3️⃣ 修改 NavBar.vue 以在登录后获取用户角色和头像

文件：src/components/NavBar.vue



解释：
	•	Axios GET 请求：在用户登录后，向 JSON Server 发送 GET 请求，根据用户的邮箱获取其角色和头像信息。
	•	使用查询参数 ?email= 来查找特定用户。
	•	如果找到用户，更新 userRole 和 userAvatar。
	•	如果未找到用户，显示“未知角色”及默认头像。
	•	错误处理：处理网络错误和未找到用户的情况。

3️⃣ 确保 localUsers.json 文件结构正确

在 localUsers.json 文件中，确保用户对象包含 email、role 和 avatar 字段。例如：

{
  "users": [
    {
      "email": "958984289@qq.com",
      "role": "Admin",
      "avatar": "https://example.com/avatar1.png"
    },
    {
      "email": "user2@example.com",
      "role": "Member",
      "avatar": "https://example.com/avatar2.png"
    }
  ]
}

步骤 3：测试整个流程

1️⃣ 启动 JSON Server

在项目根目录下（/Users/kahn/my-vue-app），运行：

json-server --watch localUsers.json --port 3001

2️⃣ 启动前端开发服务器

在另一个终端窗口中，运行：

npm run dev

3️⃣ 注册新用户
	•	访问注册页面（例如，http://localhost:3000/register）。
	•	输入新的电子邮件和密码，点击“注册”。
	•	注册成功后，用户将被添加到 localUsers.json 文件中，角色设置为“Member”。

4️⃣ 登录用户
	•	访问登录页面（例如，http://localhost:3000/login）。
	•	使用刚注册的电子邮件和密码登录。
	•	登录成功后，导航栏应显示用户的邮箱、角色（“Member”）和头像。

5️⃣ 验证 localUsers.json 文件

打开 localUsers.json，确认新用户已添加：

{
  "users": [
    {
      "email": "958984289@qq.com",
      "role": "Admin",
      "avatar": "https://example.com/avatar1.png"
    },
    {
      "email": "user2@example.com",
      "role": "Member",
      "avatar": "https://example.com/avatar2.png"
    },
    {
      "email": "newuser@example.com",
      "role": "Member",
      "avatar": "https://example.com/default-avatar.png"
    }
  ]
}

🔧 安全性和优化建议
	1.	CORS 设置：
	•	目前，JSON Server 允许所有来源的请求。为了提高安全性，可以限制允许的来源。
	•	在启动 JSON Server 时，使用 --cors 参数或在 server.js 中手动配置 CORS。
	2.	数据验证：
	•	确保后端验证接收到的数据，以防止恶意数据注入。例如，检查电子邮件格式、角色值是否有效等。
	3.	并发访问：
	•	JSON Server 适用于小规模应用。如果您的用户量增加，建议迁移到更可靠的数据库解决方案。
	4.	自动化脚本：
	•	使用 concurrently 或其他工具，自动化同时启动前端和 JSON Server。
	•	安装 concurrently：

npm install concurrently --save-dev


	•	修改 package.json 的 scripts 部分：

"scripts": {
  "dev": "concurrently \"npm run frontend\" \"json-server --watch localUsers.json --port 3001\"",
  "frontend": "vite",
  "build": "vite build",
  "serve": "vite preview"
}


	•	运行开发环境：

npm run dev


	5.	环境变量：
	•	将 API 基础 URL（如 http://localhost:3001）存储在环境变量中，便于在不同环境中切换。
	•	在项目根目录下创建 .env 文件：

VITE_API_URL=http://localhost:3001


	•	在前端代码中使用：

const API_URL = import.meta.env.VITE_API_URL;
// 然后使用 API_URL 代替硬编码的 URL
await axios.post(`${API_URL}/users`, { ... });



❓ 常见问题解答

Q1: 为什么在注册后用户未被添加到 localUsers.json？
	•	检查 JSON Server 是否在运行：确保在注册过程中，JSON Server 正在监听 http://localhost:3001。
	•	检查 API 请求：在浏览器开发者工具的“网络”标签中，查看注册请求是否成功（状态码 201）。
	•	查看终端日志：JSON Server 会在终端中显示收到的请求和任何错误信息。

Q2: 登录后导航栏显示“未知角色”，但用户已存在于 localUsers.json 中？
	•	检查邮箱匹配：确保 Register.vue 和 NavBar.vue 中使用的邮箱大小写一致。建议在后端和前端统一转换为小写。
	•	确保 JSON Server 返回正确的数据：访问 http://localhost:3001/users?email=newuser@example.com，确认返回的数据正确。
	•	检查 Axios 请求：确保 NavBar.vue 中的 GET 请求 URL 正确，且能够正确解析响应数据。

Q3: 如何更新用户角色（例如，将“Member”升级为“Admin”）？
	•	使用 JSON Server 的 PATCH 或 PUT 请求：
	•	在前端，创建一个更新角色的功能，发送 PATCH 请求到 http://localhost:3001/users/:id。
	•	例如，假设您知道用户的 ID（即 JSON Server 分配的唯一 ID），您可以发送如下请求：


	•	您也可以手动在 localUsers.json 中编辑用户对象，修改 role 字段，然后重新启动 JSON Server。

Q4: 如何在前端获取用户的唯一 ID（JSON Server 分配的 ID）？
	•	建议：在 localUsers.json 中为每个用户对象添加一个唯一标识符（如 id）。
	•	修改 Register.vue：



	•	JSON Server 会自动为每个新用户分配一个 id 字段。

	•	在 NavBar.vue：
	•	修改 GET 请求以包含 id：



	•	这样您可以在 users 数组中获取到 id 字段。

🎉 总结

通过以下步骤，您已经成功实现了：
	•	用户注册后，自动将其角色设置为“Member”，并将信息存储在本地的 localUsers.json 文件中。
	•	前端应用通过 JSON Server 提供的 API，与后端通信，获取和显示用户的角色和头像信息。
	•	无需使用复杂的数据库解决方案，适合仅有几十个用户的小型应用。

🛠️ 维护和扩展
	1.	手动编辑 localUsers.json：
	•	如果需要手动添加或修改用户信息，可以直接编辑 localUsers.json 文件，并确保 JSON 格式正确。
	2.	自动化同步：
	•	通过 JSON Server，前端可以自动同步用户信息，无需手动操作。
	3.	添加更多功能：
	•	更新用户信息：可以在前端添加功能，允许用户更新头像等信息，发送 PATCH 请求到 JSON Server。
	•	删除用户：添加删除用户功能，发送 DELETE 请求到 JSON Server。
	4.	安全性考虑：
	•	限制访问：目前 JSON Server 允许所有来源的请求。对于生产环境，建议配置更严格的 CORS 规则，或使用认证机制来保护 API 端点。
	•	数据验证：确保后端正确验证接收到的数据，防止恶意数据注入。
	5.	部署：
	•	开发环境：本地运行 JSON Server 和前端应用，适用于开发和测试。
	•	生产环境：对于生产环境，考虑将后端服务器部署到可靠的托管服务，并使用 HTTPS 来保障数据传输安全。

如果您在实施过程中遇到任何问题，或有进一步的需求，请随时告诉我！😊