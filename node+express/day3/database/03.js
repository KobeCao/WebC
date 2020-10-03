// 引入mongoose模块,用来操作数据库
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    //连接成功
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

//设定集合规则
// 创建mongoose.Schema构造函数的实例即可创建集合
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    isPublished: Boolean
});
// 使用规则去创建集合 
const Course = mongoose.model('Course',courseSchema);

// 向集合中插入文档

// 在集合的构造函数下面，有create()方法，它可以向集合中插入文档。
// 第一个参数：要向集合中插入的文档是对象类型。
// 第二个参数：回调函数。当系统调用这个回调函数的时候，传递了两个参数，第一个是错误对象
// (如果文档插入成功，将会是空，如果文档插入失败，会返回错误信息)，第二个参数会 // 是插入的这个文档。  

// Course.create({name: 'javascript基础',author: '黑马讲师',isPublished: true},(err,doc) =>{
//     console.log(err);
//     console.log(doc);
// })

Course.create({name: 'javascript高级',author: '黑马讲师',isPublished: false})
    .then( result => {
        console.log(result) // 成功的结果
    })
    .catch( err => {
        console.log(err)
    })