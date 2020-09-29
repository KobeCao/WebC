// 1. 在普通函数定义的前面加上async关键字 普通函数就变成了异步函数
// 2. 异步函数默认的返回值是promise对象
// 3. 如果异步函数内部的API执行出错，使用throw关键字进行错误的抛出

// await关键字
// 1.它只能出现在异步函数中
// 2.await promise 它可以暂停异步函数的执行，等待promise对象返回结果后再向下执行函数

// async function fn() {
// }
// console.log(fn()); // 输出函数调用的结果  Promise { undefined } 。默认的返回值
// 加入参数 

// async function fn() {
//     throw '发生了一些错误'; // throw一旦执行，后面的代码就不在执行
//     return 123;
// }
// // console.log(fn()); // 输出函数调用的结果  Promise {123 } 

// fn().then(function(data) { // data接收异步函数的返回值
//     console.log(data);
// }).catch(function (err) {
//     console.log(err);
// })

// 使用异步函数依次输出三个文件
async function p1 () {
    return 'p1';    
}
async function p2 () {
    return 'p2';    
}
async function p3 () {
    return 'p3';    
}

async function run() {
    // await关键字
    let r1 = await p1()
    let r2 = await p2()
    let r3 = await p3()
    console.log(r1);
    console.log(r2);
    console.log(r3);
}
run();

