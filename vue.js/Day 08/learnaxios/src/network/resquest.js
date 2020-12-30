import axios from 'axios'
// success,failure本身就是函数
export function request(config,success,failure) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })

  //发送真正的网络请求
  instance(config)
    .then(res => { // 传入一个函数，把结果回调过去
      success(res)
    })
    .catch(err =>{
      failure(err) // 传入一个函数，把结果回调过去
    })
}

