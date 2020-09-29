const fs = require('fs');
// 改造现有的异步函数API,让其返回promise对象，从而支持异步函数语法
const promisify = require('util').promisify;

// fs.readFile() 是通过返回值的方式来获取文件读取结果的，它不返回promise对象，
// 所以。调用已经声明好的promisify方法改造现有异步API让其返回promise对象。，
const readFile = promisify(fs.readFile); // promisify这个方法它会返回一个新的读取文件的方法
async function run() { 
    // 通过返回值的方式拿到这个文件的内容  同步的写法
    let r1 = await readFile('./1.txt','utf-8') // await它可以暂停异步函数的执行，等待后面这个API返回结果。然后才能够读取下一个文件
    let r2 = await readFile('./2.txt','utf-8')
    let r3 = await readFile('./3.txt','utf-8')
    console.log(r1)
    console.log(r2)
    console.log(r3)
}
// 调用run方法去读取文件
run();
