// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();

// 导入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 为路由对象匹配请求路径
app.use('/home', home);
app.use('/admin', admin);
// 端口监听
app.listen(3000);
console.log('服务器连接成功');