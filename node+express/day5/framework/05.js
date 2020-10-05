// 引入express框架
const express = require('express');
const fs = require('fs');
// 创建网站服务器
const app = express();
// 定义普通的路由中间件
app.get('/index',(req,res,next) => {
    // 创建一个错误实例 并且将错误抛出去(让程序报错)
    // throw new Error('程序发生了未知错误');   
    fs.readFile('./demo.txt','utf-8',(err,result) => {
        if(err != null) {
            next(err);
        }else {
            res.send(result);
        }
    })
    // res.send('程序正常执行');      
})

// 错误处理中间件  err 错误对象 err.message  里面保存的就是我们写的错误信息
app.use((err,req,res,next) => {
    res.status(500).send(err.message);
})
// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');