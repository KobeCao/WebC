// 引用系统模块 用于创建网站服务器的模块
const http = require('http');
// 创建web服务器 app 对象就是网站服务器对象
const app = http.createServer();
// 处理请求参数模块
const querystring = require('querystring'); // 处理字符串 
// 当客户端请求来的时候，就会触发事件函数
app.on('request',(req,res) => { 
    // post参数是通过事件的方式接收的
    // data事件(当有请求参数传输的时候会触发data事件)
    // end事件(当请求参数完成的时候，会触发end事件)。
    
    // 接收POST参数 由于POST参数不是一次性接收完的，所以声明一个变量，在触发data事件的时候，我们把当前传递过来的参数和我们声明的变量
    // 进行拼接。然后在end事件触发的时候，输出这个参数(变量)就可以了
    let postParams = '';
    // 绑定事件
    req.on('data', params => {  //  params当前传递过来的参数
        // 拼接 postParams
        postParams += params; // 这个变量里面存储的就是传递过来的参数

    });

    req.on('end', () => {
        // 在querystring模块下有个parse方法，将这样的一个字符串转换为对象格式。
       console.log(querystring.parse(postParams)); // 输出
     
    });
    //对于客户端的每次请求，服务端都要去做出响应,否则客户端就处于等待的状态。
    res.end('ok');
});
// 监听3000端口
app.listen(3000);
console.log('服务器已启动，监听3000端口，请访问localhost:3000');