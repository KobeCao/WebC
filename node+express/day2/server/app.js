// 引用系统模块 用于创建网站服务器的模块
const http = require('http');
// 用于处理url地址
const url = require('url');
// 创建web服务器 app 对象就是网站服务器对象
const app = http.createServer();
// 当客户端请求来的时候，就会触发事件函数
app.on('request',(req,res) => {
    // 获取请求方式
    // req.method
    // console.log(req.method);
    
    //  获取请求地址
    //  req.url
    //  console.log(req.url);
    
    //  获取请求报文信息
    //  req.headers
    //  console.log(req.headers);
    
    // 设置状态码
    res.writeHead(200,{
        'content-type':'text/html; charset=utf8'
    });

    console.log(req.url);
    // 1. 要解析的地址
    // 2. 将查询参数解析成对象形式
    // 利用对象解构的形式将query解构出来 因为在url里面包含了query和pathname属性
     let {query,pathname} = url.parse(req.url,true); // 拿pathame去做判断，因为它不包含请求参数，请求地址
     console.log(query.name);
     console.log(query.age);

    if(pathname == '/index' || pathname == '/') {
        res.end('<h2>欢迎来到首页</h2>');
    } else if(pathname == '/list') {
        res.end('welcome to listpage');
    }else{
        res.end('404 Not Found');
    }
   
    if(req.method == 'POST') {
        res.end('post');
    }else if(req.method == 'GET') {
        res.end('get');
    }

    res.end('<h1>hi,user</h1>');
});
// 监听3000端口
app.listen(3000);
console.log('服务器已启动，监听3000端口，请访问localhost:3000');