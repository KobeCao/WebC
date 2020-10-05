const express = require('express');
const path = require('path'); 
const app = express();

// 拼接路径path.join(__dirname,'public');
// 实现静态资源访问功能
app.use(express.static(path.join(__dirname,'public')))
// 端口监听
app.listen(3000);