function getData (callback) { // callback对应的实参就是一个匿名函数，形参的名字相当于就是匿名函数的名字
    callback(123); // 实参

}
getData(function(n) { // 通过形参来调用实参
    console.log('callback函数被调用了');
    console.log(n);
});