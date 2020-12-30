import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)

// 创建对象

const moduleA =  {
  state: {
    name: 'Tom'
  },
  mutations: {
    updateName(state,payload) {
      state.name = payload
    }
  },
  actions: {},
  getters: {},
}
const store = new Vuex.Store({
  state: {  // state:保存状态 定义共享的状态
    counter: 1000,
    students: [
      {id: 110, name: 'hangSan',age: 18},
      {id: 111, name: 'liSi', age: 24},
      {id: 112, name: 'why', age: 30},
      {id: 113, name: 'tom', age: 26},
    ]
  },
  mutations: {
    // 定义方法  默认参数state  通过mutations来修改方法
    increment(state) {
      state.counter++
    },
    decrement(state) {
      state.counter--
    },
    incrementCount(state,count) {
      state.counter += count
    }
  },
  actions: {
    // context：上下文
    dateIn(context) {
      setTimeout( ()=> {
        context.commit('dateIn')
      },1000)
    }
  },
  getters: {
    powerCounter(state) {
      return state.counter * state.counter
    },
    moreStu(state) {
      return state.students.filter( s => s.age > 20)
    },
    moreStuLength(state,getters) { // 将getters作为参数
      return getters.moreStu.length
    },
    moreAgStu(state) {
      // return function(age) {
      //   return state.students.filter( s => s.age > age)
      // }
      return age => {
        return state.students.filter( s => s.age > age)
      }
    }
  },
  modules: {
    a: moduleA,
  }
})
// 导出store
export default store