// 1. 使用commonjs的模块化规范
const { add, mul } = require('./js/mathUtils');

console.log(add(20, 30));
console.log(mul(20, 30));

// 2. 使用ES6的模块化的规范
import { name, age, height } from "./js/info";

console.log(name);
console.log(age);
console.log(height);

// 3. 依赖css文件
require('./css/normal.css');

// 4. 依赖less文件
require('./css/special.less');
// 给HTML界面写入东西
document.writeln('<h2>你好啊，vue.js</h2>');

// 5.使用vue进行开发
import Vue from 'vue'
// import App from './vue/app' // 导入
import App from './vue/App.vue'

new Vue({
  el: '#app',
  template: '<App/>',
  components: {
    App
  }
});