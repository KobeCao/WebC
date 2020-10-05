// 引入express框架
const express = require('express');
// 引入第三方模块body-parser
const bodyParser = require('body-parser');
// 创建网站服务器
const app = express();
// 给app.use这个方法里面传递一个函数的调用

app.use(fn ({a: 2})); // 传递实参

function fn(obj) {
    return function(req,res,next) {
        // 在请求处理函数内部对obj进行判断
        if(obj.a == 1) {
            console.log(req.url); // 输出地址
        }else{
            console.log(req.method); // 输出方法
        }
        next()
    }
}
app.get('/',(req,res) => {
    res.send('ok'); 
});
// 端口监听
app.listen(3000);
console.log('服务器连接成功');