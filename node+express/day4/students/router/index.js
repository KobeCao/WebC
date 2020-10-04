// 引入模板引擎
const template = require('art-template');
// 引入querystring模块
const querystring = require('querystring');
// 引入router模块
const getRouter = require('router');
// 获取路由对象
const router = getRouter();
// 导入学生信息集合 创建一个变量Student去接收它
const Student = require('../model/user');
//呈递学生档案信息页面 
router.get('/add', (req,res) => {
    let html =  template('index.art',{});
    res.end(html); // 将字符串响应给客户端
 });
 
// 呈递学生档案信息列表页面
router.get('/list', async (req,res) => {
    // 查询学生信息
    let students = await Student.find();
    let html = template('list.art',{
    // 将students和template模板拼接
    students: students    
    });
    res.end(html);
});

// 实现学生信息添加功能路由
router.post('/add',(req,res) => {
    // 接收post请求参数
    let formData = '';
    // 接收post参数
    req.on('data',param => { //当有请求参数传输的时候会触发post里面的data事件
        formData +=param;
    });
    req.on('end',async () => { // 当请求参数完成的时候，会触发end事件
        // 将用户提交的信息添加到数据库中
        await Student.create(querystring.parse(formData));
        // 301代表重定向
        // location 跳转地址
        res.writeHead(301, {
            Location: '/list'
        });
        res.end()
    })

});
// 将路由模块router暴露出去
module.exports = router;