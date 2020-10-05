// 引入express框架
const express = require('express');
// 创建路由对象
const admin = express.Router();
// 在home路由对象下面挂载路由
admin.get('/index',(req,res) => {
    res.send('欢迎来到博客管理页面');
});
// 导出路由对象
module.exports = admin;