// 引入mongoose第三方模块，用来操作数据库
const mongoose = require('mongoose');
// 数据库连接
mongoose.connect('mongodb://localhost/playground',{useNewUrlParser: true, useUnifiedTopology: true })
     // 连接成功 
    .then( () => console.log('数据库连接成功'))
    // 连接失败
    .catch( err => console.log(err,'数据库连接失败'));

//设定集合规则  author：作者 isPublished：是否发布

// 1.用到 mongoose下面的 Schema构造函数，创建集合。实际上就是在创建这个Schema构造函数的实例对象。
// 2.在设定规则的时候，传递一个对象进去，对象里的属性就是这个集合当中的文档可以拥有的属性。属性的值就是当前字段的类型
// 3.创建出来的实例对象，实际就是集合的规则。
const courseSchema = new mongoose.Schema({ 
    // 集合具体的规则
    name: String,
    author: String,
    isPublished: Boolean
});

// 使用规则去创建集合 

// 1.使用mongoose下面的model()方法用来创建集合，model方法的第一个参数是集合的名称，规定大写;例如创建Course它在数据库里面会显示 courses
// 2.第二个参数就是你想为这个集合应用哪一个规则，
// 3.model()方法会返回当前集合的构造函数，返回值是一个构造函数，代表当前集合。我们可以使用这个构造函数下面的各种方法，来对集合当中的数据进行各种操作。
const Course = mongoose.model('Course',courseSchema);

// (创建文档)向集合插入数据

// 创建集合实例。
const course = new Course({
    name: 'node.js基础',
    author: 'pink老师',
    isPublished: true
});
// 调用实例对象下的save()方法 将文档插入数据库中
course.save();
