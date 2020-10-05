// 引入express框架
const express = require('express');
// 引入第三方模块body-parser
const bodyParser = require('body-parser');
// 创建网站服务器
const app = express();

app.get('/index/:id/:name/:age',(req,res) => {
    res.send(req.params); 
});
// 端口监听
app.listen(3000);
console.log('服务器连接成功');