// 引入模块
const mongoose = require('mongoose');
// connect 连接 第一个参数是要连接的数据库地址以及数据库的名字。
// 由于mongoose.connect 它返回的是一个Promise对象，就可以使用它的.then()和catch()方法。
mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true, useUnifiedTopology: true })
    .then( () => console.log('数据库连接成功'))
    .catch( err => console.log(err,'数据库连接失败'))