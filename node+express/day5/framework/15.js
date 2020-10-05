const express = require('express');
const path  = require('path');
const app = express();
// 模板配置
app.engine('art',require('express-art-template'));
app.set('views',path.join(__dirname,'views'));
app.set('view engine','art');

app.locals.users = [{
    name: '张三',
    age: 20
},{
    name: '李四',
    age: 18
}]

app.get('/index',(req,res) => {
    res.render('index', {
        msg: '首页'
    })
});

app.get('/list',(req,res) => {
    res.render('index', {
        msg: '列表页'
    })
});
app.listen(3000);