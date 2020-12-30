import Vue from 'vue'
import App from './App'
import axios from 'axios'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})

// 基本使用
axios({
  url: 'baseURL ="http://152.136.185.210:8000/api/w6"',
  //method: 'post'
}).then(res => {
  console.log(res);
})

// axios({
//   url: 'http://123.207.32.32:8080/home/data',
//   //专门针对get请求的参数拼接 
//   params: {
//     type: 'pop',
//     page: 1
//   }
// }).then(res => {
//   console.log(res);
// })

// // axios发送并发(同时发送两个)请求
// axios.all([axios({
//   url: 'http://123.207.32.32:8080/home/data'
// }),axios({
//   url: 'http://123.207.32.32:8080/home/multidata',
//   params: {
//     type: 'sell',
//     page: 4
//   }
// })]).then(axios.spread(res1,res2 => {
//   console.log(res1);
//   console.log(res2);
// }))
