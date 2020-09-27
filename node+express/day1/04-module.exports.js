const greeting = name => `hello ${name}`; // `hello ${name}` 模板字符串的用法
let x = 100;
exports.x = x;
module.exports.greeting = greeting;

// 当exports对象和module.exports对象指向的不是一个对象时 以module.exports为准。
module.exports = {
    name: 'wangWu '
}
exports = {
    age: 20
}