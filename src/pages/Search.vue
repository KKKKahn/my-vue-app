<template>
  <div class="search-page">
    <h1>搜索</h1>
    <div class="search-box">
      <input v-model="query" type="text" placeholder="输入搜索内容..." />
      <button @click="handleSearch" class="search-button">搜索</button>
    </div>

    <div v-if="results.length > 0">
      <h2>搜索结果：</h2>
      <ul class="result-list">
        <li v-for="item in results" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div v-else-if="searched">
      <p>没有找到相关内容</p>
    </div>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        query: '',
        dataList: ['Vue教程', '工具介绍', '关于我们', '留言板', '搜索功能', '外部链接集合'],
        results: [],
        searched: false
      }
    },
    methods: {
      handleSearch() {
        this.searched = true
        if (!this.query) {
          this.results = []
          return
        }
        const q = this.query.toLowerCase()
        this.results = this.dataList.filter(item => item.toLowerCase().includes(q))
      }
    }
  }
  </script>
  
  <style scoped>
/* 页面整体布局 */
.search-page {
  width: 100%; /* 确保占满父容器的宽度 */
  max-width: 100%; /* 确保不会超出父容器的宽度 */
  box-sizing: border-box; /* 确保内边距不影响宽度 */
  padding: 20px; /* 给一些内边距，避免内容太靠边 */
}

.search-box {
  display: flex; 
  justify-content: center; 
  gap: 10px; 
  margin-bottom: 20px;
  width: 100%; 
  max-width: 100%; 
  flex-wrap: wrap; 
}

input[type="text"] {
  flex: 1; 
  width: 100%; 
  max-width: 400px; /* 在大屏幕上确保更大宽度 */
  padding: 12px;
  font-size: 16px;
  background-color: #222831;
  color: white;
  border-radius: 8px;
  border: 1px solid #6c5ce7;
  box-sizing: border-box; 
}

input[type="text"]::placeholder {
  color: #888;
}

.search-button {
  padding: 12px 20px;
  font-size: 16px;
  background-color: #6c5ce7;
  color: white;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  white-space: nowrap; 
  width: 120px; /* 限制按钮宽度，避免太宽 */
}

.search-button:hover {
  background-color: #8e44ad;
}

/* 媒体查询：手机小屏幕的适配 */
@media (max-width: 768px) {
  .search-box {
    flex-direction: column; /* 垂直布局 */
    gap: 10px;
  }

  input[type="text"], 
  .search-button {
    width: 100%; /* 在小屏幕上宽度为 100% */
    max-width: 100%; /* 确保不会超出容器宽度 */
  }

  .search-button {
    font-size: 14px;
    padding: 10px;
  }
}

/* 媒体查询：大屏幕的适配 */
@media (min-width: 768px) {
  .search-box {
    flex-direction: row; /* 在大屏幕上水平布局 */
    justify-content: center;
  }

  input[type="text"] {
    max-width: 400px; /* 让输入框更大一些 */
    width: 100%; 
  }

  .search-button {
    width: 120px; /* 固定按钮宽度，避免太大 */
  }
}
  </style>