var moduleA = (function () {
  // 1.定义一个导出的对象
  var obj = {}

  // 小明
  var name = '小明'
  var age = 22

  function sum(num1, num2) {
    return num1 + num2
  }

  var flag = true

  if (flag) {
    console.log(sum(10, 20));
  }

  // 2.在对象内部添加变量和方法
  obj.flag = flag;
  obj.sum = sum;
  // 3.将对象返回
  return obj
})()

// 小明
// var name = '小明'
// var age = 22
//
// function sum(num1, num2) {
//   return num1 + num2
// }
//
// var flag = true
//
// if (flag) {
//   console.log(sum(10, 20));
// }
//
// module.exports = {
//   flag: flag,
//   sum: sum
// }


