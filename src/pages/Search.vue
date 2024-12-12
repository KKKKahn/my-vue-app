<template>
    <div class="search-page">
      <h1>搜索</h1>
      <div class="search-box">
        <input v-model="query" type="text" placeholder="输入搜索内容..." />
        <button @click="handleSearch">搜索</button>
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
 .search-page {
  padding: 20px;
}




.search-box {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

input[type="text"] {
  width: 300px;
  padding: 12px;
  font-size: 16px;
  background-color: #222831;
  color: white;
  border-radius: 8px;
  border: 1px solid #6c5ce7;
}

input[type="text"]::placeholder {
  color: #888;
}
  </style>