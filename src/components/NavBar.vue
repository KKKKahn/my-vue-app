<template>
    <nav class="navbar">
      <ul class="nav-list">
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/search">搜索</router-link></li>
        <li><router-link to="/tools">工具</router-link></li>
        <li><router-link to="/contact">留言</router-link></li>
        <li><router-link to="/about">关于</router-link></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    background-color: rgba(29, 29, 39, 0.9);
    height: 70px; /* 固定导航栏高度 */
    display: flex;
    align-items: center; /* 垂直居中导航项 */
    justify-content: center; /* 水平居中导航列表 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .nav-list {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
  }
  
  .nav-list li {
    margin: 0 20px;
  }
  
  .nav-list li a {
    color: #e1e1e1;
    font-size: 18px;
    font-weight: bold;
  }
  
  .nav-list li a:hover {
    color: #6c5ce7;
    text-decoration: underline;
  }
  </style>