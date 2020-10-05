// 引入express框架
const express = require('express');
// 创建网站服务器
const app = express();
// 框架当中创建路由
app.get('/',(req,res) => {
    // send()方法，可以对客户端做出响应，在send方法内部，它会自动检测响应内容的类型，将检测出来的类型自动设置到响应头当中，
    // 还可以设置响应内容的类型编码，防止出现乱码，还可以自动设置HTTP状态码
    res.send('hello express');
})
app.get('/list',(req,res) => {
    res.send({name: '张三', age: 20});
})
// 监听端口
app.listen(3000);
console.log('网站服务器启动成功');