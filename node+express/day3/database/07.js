// 引入mongoose模块,用来操作数据库
const mongoose = require('mongoose');
// 连接数据库
mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
    //连接成功
    .then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'));

//
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        // 可以自定义错误的信息，在值的后面
        required: [true, '请传入文章标题'],
        minlength: [2, '文章长度不能小于2'], // minlength 规定传入的字符串最小长度是几
        maxlength: [5, '文章长度不能大于5'], // maxlength 规定传入的字符串最大长度是几
        trim: true  // 去除字符串两边的空格
    },
    age: {
        type: Number,
        // 数字最小范围
        min: 18,
        // 数字最大范围
        max: 100
    },
    publishDate: { //  publishDate 文章发布日期
        type: Date, // 日期类型
        default: Date.now // 默认值，指定当前时间
    },
    category: {  // category 文章分类
        type: String,
        // 枚举 列举出当前字段可以拥有的值
        enum: {
            values: ['html', 'css', 'javascript', 'node.js'],
            message:  '分类名称要在一定的范围之内'
        }
    },
    author: {
        type: String,
        validate: {  //validate: 自定义验证器
            validator: v => {
                // 返回布尔值
                // true 验证成功
                // false 验证失败
                // v 要验证的值
                return v && v.length > 4
            },
            // 自定义错误消息
            message: '传入的值不符合验证规则'
        }
    }
});
const Post = mongoose.model('Post', postSchema);
// 使用create()方法向集合中插入文档。
Post.create({ title: 'aaa', age: 20, category: 'java', author: 'bd' })
    .then(result => console.log(result)) // 可以拿到插入成功的返回值
    //拿到具体的报错的信息
    .catch(error => {
        // 获取错误信息对象
        const err = error.errors;
        // 循环错误信息对象
        for (var attr in err) {
            // 将错误信息打印在控制台中
            console.log(err[attr]['message']);
        }
    });