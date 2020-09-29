const fs = require('fs');

let promise = new Promise( (resolve,reject) => {

    fs.readFile('./1.txt','utf-8',(err,result) => {
    
        if(err != null) { 
            reject(err); // 文件读取失败。
        }else {
            resolve(result); // 成功就将这个异步API的结果传递到promise的外面。
        }     
    });
});

// 拿到成功信息
promise.then((result) => {
    console.log(result);
})
// 它在new Promise之后就得到了一个promise对象，promise对象下面有一个then()方法，这个then方法里面它要求你传一个匿名函数，也就是说，
// 当异步API执行成功的时候，你调用了resolve。调用resolve实际上就是在调用then方法里面的这个函数，也就是说它在调用resolve的时候传递
// 了个实参,那么就可以在then里面的函数接收它，promise.then((result) => {});

// 拿到错误信息(链式编程)
.catch( (err) => {
    console.log(err);
})