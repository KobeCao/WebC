// 1. 引入系统模块
const http = require('http');
const url = require('url');
// 2. 创建网站服务器
const app = http.createServer();
// 3. 为网站服务器对象添加请求事件
// 4. 实现路由功能
    // 4.1 获取客户端的请求方式
    // 4.2 获取客户端的请求地址
app.on('request',(req,res) => {
    // 获取请求方式
    const method = req.method.toLowerCase(); // 调用toLowerCase()方法把获取到的方法转换成小写

    // 获取请求地址 req.url它获取过来的地址包含了GET方式的请求参数，得到纯粹的请求地址，可以使用系统模块url里面的方法parse
    // 把这个req.url解析一下，parse可以返回url的各个部分，其中包含pathname(请求地址)。
    const pathname = url.parse(req.url).pathname;

    // 响应报文
    res.writeHead(200, {
        'content-type': 'text/html;charset=utf-8'
    });
    
    //判断
    if(method == 'get') {
        
        if(pathname == '/' || pathname == '/index') {
            res.end('欢迎来到首页');
        }else if(pathname == '/list') {
            res.end('欢迎来到列表页');
        }else {
            res.end('404 Not Found 您访问的页面不存在');
        }
    }else if(method == 'post') {

    }
});
app.listen(3000);
console.log('服务器启动成功');