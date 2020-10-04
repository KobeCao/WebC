// 导入模板引擎
const template =  require('art-template');
// 导入拼接模板引擎
const path = require('path');
// template方法是用来拼接字符串的
// 1. 模板路径要使用绝对路径 __dirname 当前文件所在的路径-template
const views = path.join(__dirname,'views','02.art');
// 2. 要在模板中显示的数据 对象类型。
// template方法他有一个返回值，返回值实际就是拼接好的字符串，可以通过一个变量去接收它。
const html = template(views,{
    name: '张三',
    age: 17

})
console.log(html);