// 引入express框架
const express = require('express');
// 引入第三方模块body-parser
const bodyParser = require('body-parser');
// 创建网站服务器
const app = express();

// 拦截所有的请求 对请求参数进行处理,在app.use里面调用bodyParser.urlencoded()方法，
// 在方法当中有一个必填参数extended，将其设置为false: 方法的内部使用系统模块querystring来处理请求参数的格式。
// 设置为true: 方法内部要使用一个第三方模块qs处理请求参数的格式
app.use(bodyParser.urlencoded({extended: false}));

app.post('/add',(req,res) => {
    res.send(req.body); // body属性就是bodyParser在req对象当中添加的一个属性，这个属性的值就是post请求参数
});
// 端口监听
app.listen(3000);
console.log('服务器连接成功');