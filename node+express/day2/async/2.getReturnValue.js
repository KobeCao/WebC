function getMsg(callback) {
    setTimeout(function () {
      callback({ //调用callback就相当于调用了 匿名函数function(){}
        msg:'hello Node.js'
      })
    },2000);
  }
getMsg(function (data) {
    console.log(data);
});
// 在getMsg()这个函数内部，不能通过return去拿到返回值，因为异步API它不会阻止后续代码的执行，
