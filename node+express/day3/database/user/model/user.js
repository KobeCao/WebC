// 创建用户集合的代码
// 引入操作数据库模块
const mongoose = require('mongoose');
// 创建用户集合规则
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
// 创建集合实例。返回集合构造函数
const User = mongoose.model('User', UserSchema);
// 将User这个构造函数给它开放出去。
module.exports = User;