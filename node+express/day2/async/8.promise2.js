const fs = require('fs');

// 依次读取三个文件
function p1() { //在p1里面直接return一个 Promise 对象。
    return new Promise( (resolve,reject) => {
        fs.readFile('./1.txt', 'utf8', (err, result) => {
            if( err != null) {
                reject(result);
            }else {
                resolve(result);
            }
        })
    });
}
function p2(){
    return new Promise( (resolve,reject) => {
        fs.readFile('./2.txt', 'utf8', (err, result) => {
            if( err != null) {
                reject(result);
            }else {
                resolve(result);
            }
        })
    });
}
function p3(){
    return new Promise( (resolve,reject) => {
        fs.readFile('./3.txt', 'utf8', (err, result) => {
            if( err != null) {
                reject(result);
            }else {
                resolve(result);
            }
        })
    });
}

//调用函数
// 因为在p1函数内部，我们没有return任何东西，默认就是undefined，得到的结果就是错误的，
// 想要使用p1().then(() =>{})，我们只需要将 p1函数里面的 new Promise这个对象给返回出来。
// 使用链式编程，得到其他的返回结果
// 在当前这个p1.then()这个对象里面只需要return一个Promise对象，那下一个(也就是p2)p2.then()当中拿到的结果就是你在上一个p1.then里面
// return 的这个Promise对象的结果。
p1().then((r1) =>{
    console.log(r1);
    return p2(); // 返回的就是一个Promise对象
})
.then((r2)=>{ // 拿到的就是p1.then()里面返回的return p2()的结果。
    console.log(r2);
    return p3();
})
.then((r3) =>{
    console.log(r3);
})

