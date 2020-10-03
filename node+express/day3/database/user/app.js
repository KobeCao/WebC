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
// 引入操作数据库模块
const mongoose = require('mongoose');
// 引入url模块
const url = require('url');
// 数据库连接 27017是mongodb数据库的默认端口
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

// 创建用户集合规则中
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    age: {
        type: Number,
        min: 18,
        max: 80
    },
    password: String,
    email: String,
    hobbies: [String] // 代表有多个，数组里面的值都需要是字符串类型
});

// 创建集合实例。
const User = mongoose.model('User', UserSchema);
// 创建服务器
const app = http.createServer();

// 为服务器对象添加请求事件
app.on('request', async (req, res) => {
    // 获取路由的请求方式
    const method = req.method;
    // 获取路由的请求地址
    const { pathname } = url.parse(req.url) // parse方法返回一个对象，在这个对象下面有一个属性叫pathname,这个pathname就是纯粹的请求地址

    if (method == 'GET') {  // GET方式大多都是数据的请求或者是页面的成立
        // 呈现用户列表页面
        if (pathname == '/list') {
            // 使用异步函数查询用户信息  使用async关键字， 通过异步函数的方式我们就可以通过返回值拿到find的结果。
            let users = await User.find();
            // 将页面存到变量里面，然后再把这个变量相应给客户端
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
                        <a href="add.html" class="btn btn-primary">添加用户</a>
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
            // 要想得到数据库里面的数据，就先循环整个数据，在循环数据的过程中，去拼接这个字符串以及数据，在拼接之前先拆分，好拼接
            // 对数据进行循环
            users.forEach(item => {
                // item 就是数组中的一个对象
                list += `	
                <tr>
				<td>${item.name}</td>
				<td>${item.age}</td>
				<td>
				
            `;
            // 因为爱好是一个数组。所以将其拆分出来，
            item.hobbies.forEach( item => { 
                list += `<span>${item}</span>`;
            })
            list += `</td>
            <td>${item.email}</td>
            <td>
                <a href="" class="btn btn-danger btn-xs">删除</a>
                <a href="" class="btn btn-success btn-xs">修改</a>
            </td>
        </tr>`;
            })
            list += `</table>
            </div>
        </body>
        </html>`
            res.end(list);
        }

    } else if (method == 'POST') { // POST方式大多都是实现一些功能(添加数据，修改数据)

    }
})

// 监听端口
app.listen(3000);