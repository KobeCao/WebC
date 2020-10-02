// 引用系统模块 用于创建网站服务器的模块
const http = require('http');
//引入url模块
const url = require('url');
//引入path模块
const path = require('path');
// 引入fs模块
const fs = require('fs');
// 引入mime模块
const mime = require('mime');
// 创建web服务器 app 对象就是网站服务器对象
const app = http.createServer();
// 当客户端请求来的时候，就会触发事件函数
app.on('request',(req,res) => {

    // 获取用户的请求路径
    let pathname =  url.parse(req.url).pathname;
    // 当用户在地址栏中不用输入default也能出现页面。
    pathname = pathname == '/' ? '/default.html' : pathname;

    // __dirname获取当前目录的绝对路径
    // 在程序代码当中拼接路径最好使用系统path模块下面的join(),因为它可以帮我们拼接路径的分隔符
    // 将用户的请求路径转换为实际的服务器硬盘路径。
    let realPath = path.join(__dirname , 'public' + pathname);

    // mime第三方模块，可以根据你当前的请求路径分析出这个资源的类型，然后把类型通过返回值的方式反给你。
    let type = mime.getType(realPath);
    // 读取文件
    fs.readFile(realPath,(error,result) => {
        // 如果文件读取成功，error是空(null),result是文件内容。如果error读取失败，error则是一个失败的对象(里面存储着失败的信息)
        if(error != null) {
            // 设置状态码 在访问的页面article.html和default.html页面中已经声明字符编码，只需要声明错误的页面字符编码
            res.writeHead(200,{
                'content-type':'text/html; charset=utf8'
            });
            res.end('文件读取失败');
            return;
        }
        // 解决根据我当前请求的这个文件它的类型去设置它的类型
        res.writeHead(200, {
             'content-type': type  //将返回值给到'content-type',那种类型返回就那种
        })
        res.end(result);
    });

});
// 监听3000端口
app.listen(3000);
console.log('服务器已启动，监听3000端口，请访问localhost:3000');