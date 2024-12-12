<template>
    <div class="tools-page">
      <h1>常用工具</h1>
      <div class="tool-buttons">
        <a class="tool-btn" href="https://www.baidu.com" target="_blank">百度</a>
        <a class="tool-btn" href="https://www.google.com" target="_blank">Google</a>
        <a class="tool-btn" href="https://github.com" target="_blank">GitHub</a>
      </div>
    </div>
  </template>
  
  <style scoped>
  .tool-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.tool-btn {
  background: linear-gradient(90deg, #6c5ce7 0%, #0984e3 100%);
  padding: 12px 24px;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.tool-btn:hover {
  background: linear-gradient(90deg, #8e44ad 0%, #3498db 100%);
}
  </style>