// 引入http模块
const http = require('http');
// 引入router模块
const getRouter = require('router');
// 引入模板引擎
const template = require('art-template');
//引入path模块
const path = require('path');
// 引入querystring模块
const querystring = require('querystring');
// 引入serve-static 静态资源模块
const serveStatic =  require('serve-static');
// 引入处理日期的第三方模块
const dateformat  = require('dateformat');

// 引入路由
const router = require('./router/index');
// 实现静态资源访问服务
const serve = serveStatic(path.join(__dirname,'public'));

// 配置模板的根目录
template.defaults.root = path.join(__dirname,'views');

// 在模板当中不能默认调用方法，需要导入模板变量的方式把这个方法导入到模板当中
// 处理日期格式的方法
template.defaults.imports.dateformat = dateformat;

// 导入数据库模块到当前文件
require('./model/connect.js');
// 导入学生信息集合 创建一个变量Student去接收它
const Student = require('./model/user');
// 创建网站服务器
const app = http.createServer();
// 当客户端访问服务器端的时候
app.on('request',(req,res) => {
    // 启用路由 调用router这个方法，将请求对象和相应对象传给它，在这个方法内部他会通过这个请求对象对这个当前请求进行判断，
    // 判断之后再去调用我们定义好的路由。
    router(req,res, () => {});
    // 启动静态资源访问 过程和上面一样
    serve(req,res, () => {});

});

// 监听80端口
app.listen(80);
console.log('服务器启动成功');