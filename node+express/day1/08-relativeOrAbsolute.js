const fs = require('fs');
const path  = require('path');
console.log(__dirname);
console.log(path.join(__dirname,'01.helloworld.js')); 
//__dirname拿到当前文件的所在得我绝对路径
// 在__dirname的基础上再拼上01.helloworld.js。就是01.helloworld.js这个文件的绝对路径。
fs.readFile(path.join(__dirname,'01.helloworld.js'),'utf-8',(err,doc) => {
    console.log(err);
    console.log(doc);
})