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

// 使用User.find()查询User下面的所有文档，由于User.find()返回Promise对象,所以可以使用Promise下面的方法。
// User.find().then( result => console.log(result));

// 查询某一条数据 {}里面的就是查找条件
// User.find({_id: '5c09f267aeb04b22f8460968'}).then( result => console.log(result));

// findOne()方法返回一条文档 默认返回当前集合中的第一条
// User.findOne().then(result => console.log(result));

// 根据条件查询
// User.findOne({name: '李四'}).then(result => console.log(result));

// 查询用户集合中年龄大于20并且小于40的
// User.find({age: {$gt: 20, $lt: 40}}).then(result => console.log(result));

// 匹配包含足球的字段
// User.find({hobbies: {$in: ['足球']}}).then(result => console.log(result));

// 选择要查询的字段.select() 查询name和email  -_id 就是不要查询这个_id
// User.find().select('name email -_id').then(result => console.log(result));

//将数据按照年龄进行升序排序 sort()
// User.find().sort('age').then(result => console.log(result));
// 降序
// User.find().sort('-age').then(result => console.log(result));

//skip跳过多少条数据  limit限制查询数量
User.find().skip(2).limit(3).then(result => console.log(result));