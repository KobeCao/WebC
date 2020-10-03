// 引入mongoose模块,用来操作数据库
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    //连接成功
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

//用户集合规则
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
// 文章集合规则
const postSchema = new mongoose.Schema({
    title: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // 规定好的mongodb当中的ObjectId字段的数据类型。
        ref: 'User1' // 写要关联的集合
    }
});
// 用户集合
const User1 = mongoose.model('User1',userSchema);
// 文章集合
const Post1 = mongoose.model('Post1',postSchema);

// 创建用户
// User1.create({name: 'itMa'}).then(result => console.log(result));

// 创建文章
// Post1.create({title: '123',author:'5f64be71861a736ce4afa4f3'}).then(result => console.log(result));

// 查询  在populate()方法里面输入要查询的字段
Post1.find().populate('author').then(result => console.log(result));
