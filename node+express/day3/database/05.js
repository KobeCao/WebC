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

// 查找到一条文档并且删除， 返回删除的文档
// 删除一个 查询条件匹配了多个文档，那么将会删除第一个匹配的文档 删除王五
// User.findByIdAndDelete({_id: '5c09f267aeb04b22f8460968'}).then(result => console.log(result));
// 删除多个文档
User.deleteMany({}).then(result => console.log(result));