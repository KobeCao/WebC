// 异步执行
console.log('代码开始执行');
setTimeout( () => { console.log('2秒后执行的代码')},2000);
setTimeout( () => { console.log('"0秒"秒后执行的代码')},0);
console.log('代码结束执行');