// 引入mongoose模块,用来操作数据库
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    //连接成功
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

//设定集合规则
// 创建mongoose.Schema构造函数的实例即可创建集合
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    password: String,
    hobbies: [String]
    
});
// 使用规则去创建集合 
const User = mongoose.model('User',userSchema);

// 更新(更改)单个集合中的文档
// User.updateOne({name: '李四'},{name: '李狗蛋'}).then(result => console.log(result));
// 更新多个集合中的文档
User.updateMany({},{age: 55}).then(result => console.log(result));