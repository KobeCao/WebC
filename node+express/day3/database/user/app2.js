// 搭建网站服务器，实现客户端与服务器端的通信
// 连接数据库，创建用户集合，向集合中插入文档
// 当用户访问/list时，将所有用户信息查询出来
// 	实现路由功能
// 	呈现用户列表页面
// 	从数据库中查询用户信息 将用户信息展示在列表中
// 将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
// 	修改用户信息分为两大步骤
// 		1.增加页面路由 呈现页面
// 			1.在点击修改按钮的时候 将用户ID传递到当前页面
// 			2.从数据库中查询当前用户信息 将用户信息展示到页面中
// 		2.实现用户修改功能
// 			1.指定表单的提交地址以及请求方式
// 			2.接受客户端传递过来的修改信息 找到用户 将用户信息更改为最新的
// 当用户访问/delete时，实现用户删除功能
const http = require('http');
// 引入url模块
const url = require('url');
const querystring = require('querystring');

// 引入连接数据库的代码
require('./model/index.js');
// 引入创建用户集合的代码
const User = require('./model/user.js');


const app = http.createServer();
app.on('request', async (req, res) => {

    const method = req.method;
    // 请求地址 parse方法返回一个对象，在这个对象下面有一个属性叫query,在这个属性里面，保存了get请求参数，默认情况下是字符串类型，
    //  将其转换成对象类型，在url.parse里面传递第二个参数true，这样query就是一个对象类型。
    const { pathname, query } = url.parse(req.url, true);

    if (method == 'GET') {  // GET方式大多都是数据的请求或者是页面的成立
        if (pathname == '/list') {
            let users = await User.find();
            let list = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h6>
                        <a href="/add" class="btn btn-primary">添加用户</a>
                    </h6>
                    <table class="table table-striped table-bordered">
                        <tr>
                            <td>用户名</td>
                            <td>年龄</td>
                            <td>爱好</td>
                            <td>邮箱</td>
                            <td>操作</td>
                        </tr>
           
         `
                ;
            users.forEach(item => {
                list += `	
                <tr>
				<td>${item.name}</td>
				<td>${item.age}</td>
				<td>
				
            `;
                item.hobbies.forEach(item => {
                    list += `<span>${item}</span>`;
                })
                list += `</td>
            <td>${item.email}</td>
            <td>
                <a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">删除</a>
                <a href="/modify?id=${item._id}" class="btn btn-success btn-xs">修改</a> 
            </td>
        </tr>`;
            })
            list += `</table>
            </div>
        </body>
        </html>`
            res.end(list);
        } else if (pathname == '/add') {
            // 呈现用户列表界面
            let add = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>添加用户</h3>
                    <form method="post" action="/add">
                      <div class="form-group">
                        <label>用户名</label>
                        <input name="name" type="text" class="form-control" placeholder="请填写用户名">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input name="password" type="password" class="form-control" placeholder="请输入密码">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input name="age" type="text" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input  name="email" type="email" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                        <div>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="足球" name="hobbies"> 足球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="篮球" name="hobbies"name="hobbies"> 篮球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="喝酒"> 喝酒
                            </label>
                            <label class="checkbox-inline">
                              <input type="checkbox" value="烫头"> 烫头
                            </label>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary">添加用户</button>
                    </form>
                </div>
            </body>
            </html>
        `;
            res.end(add);
            // 修改用户信息
        } else if (pathname == '/modify') {
            // 通过返回值的方式去接收用户的信息
            let user = await User.findOne({ _id: query.id});
            // 声明一个爱好数组
            let hobbies = ['足球', '篮球', '橄榄球', '敲代码', '抽烟', '喝酒', '烫头']
            console.log(user)
            // 呈现用户表单界面
            let modify = `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>用户列表</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
            </head>
            <body>
                <div class="container">
                    <h3>修改用户</h3>
                    <form method="post" action="/modify?id=${user._id}">
                      <div class="form-group">
                        <label>用户名</label>
                        <input value="${user.name}" name="name" type="text" class="form-control" placeholder="请填写用户名">
                      </div>
                      <div class="form-group">
                        <label>密码</label>
                        <input value="${user.password}"  name="password" type="password" class="form-control" placeholder="请输入密码">
                      </div>
                      <div class="form-group">
                        <label>年龄</label>
                        <input value="${user.age}" name="age" type="text" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>邮箱</label>
                        <input  value="${user.email}" name="email" type="email" class="form-control" placeholder="请填写邮箱">
                      </div>
                      <div class="form-group">
                        <label>请选择爱好</label>
                      <div>  
           `;
            hobbies.forEach(item => {
                // 判断当前循环项在不在用户的爱好数据组  includes() 包含的意思，如果包含就返回true
                let isHobby = user.hobbies.includes(item);
                if(isHobby) {
                    modify += `<div>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                    </label>
               `   
                }else {
                    modify += `<div>
                    <label class="checkbox-inline">
                      <input type="checkbox" value="${item}" name="hobbies"> ${item}
                    </label>
               `      
                }
            })
            modify += ` </div>
                    </div>
                <button type="submit" class="btn btn-primary">修改用户</button>
            </form>
        </div>
    </body>
</html>`;
            res.end(modify);
        } else if (pathname == '/remove') {
            // res.end(query.id)
            await User.findOneAndDelete({_id: query.id});
            res.writeHead(301,{
              Location: '/list'
            });
            res.end();
        }

    } else if (method == 'POST') { // POST方式大多都是实现一些功能(添加数据，修改数据)
        // 用户添加功能
        if (pathname == '/add') {
            // 先接收用户提交的信息
            // 先声明一个变量拼接参数
            let formData = '';
            // 接收post参数
            req.on('data', param => { //当有请求参数传输的时候会触发post里面的data事件
                formData += param;
            })
            // post参数接收完毕
            req.on('end', async () => { // 当请求参数完成的时候，会触发end事件
                let user = querystring.parse(formData)
                // 将用户提交的信息添加到数据库中
                await User.create(user);
                // 301代表重定向
                // location 跳转地址
                res.writeHead(301, {
                    Location: '/list'
                });
                res.end();
            })

        }else if(pathname == '/modify') {
            // 先接收用户提交的信息
            // 先声明一个变量拼接参数
            let formData = '';
            // 接收post参数
            req.on('data', param => { //当有请求参数传输的时候会触发post里面的data事件
                formData += param;
            });
            // post参数接收完毕
            req.on('end', async () => { // 当请求参数完成的时候，会触发end事件
                // 将参数转换成了对象格式
                let user = querystring.parse(formData)
                // 将用户修改的信息添加到数据库中
                await User.updateOne({_id: query.id},user);
                // 301代表重定向
                // location 跳转地址
                res.writeHead(301, {
                    Location: '/list'
                });
                res.end();
            })
        }
    }
})

// 监听端口
app.listen(3000);