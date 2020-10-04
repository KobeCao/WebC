// 引入mongoose模块,用来操作数据库
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('数据库连接成功'))
    .catch(err => console.log(err,'数据库连接失败'));