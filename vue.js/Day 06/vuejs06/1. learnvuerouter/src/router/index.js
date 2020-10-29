//配置所有的路由相关信息
// 1.导入路由
import VueRouter from 'vue-router'
import Vue from 'vue'

// import Home from '../components/Home.vue'
// import About from '../components/About.vue'
// import User from '../components/User.vue'

//使用路由懒加载
const Home = () => import('../components/Home.vue');
// 子组件
const HomeNews = () => import('../components/HomeNews.vue');
const HomeMessage = () => import('../components/HomeMessage.vue');

const About = () => import('../components/About.vue');
const User = () => import('../components/User.vue');
const Profile = () => import('../components/Profile.vue');

// 2. 使用路由
// 2.1 通过Vue.use(插件),来安装这个插件,相当于内部执行了Vue.install方法
Vue.use(VueRouter)

// 2.2 创建路由VueRouter对象
//配置路由和组件之间的映射关系
const routes = [
  {
    path: '',
    // redirect 重定向
    redirect: '/Home'
  },
  {
    path:'/home',
    component: Home,
    meta: {
      title: '关于'
    },
    children: [
      {
        path: '',
        redirect: 'news'
      },
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
  },
  {
    path:'/about', 
    component: About,
    meta: {
      title: '首页'
    },
  },
  {
    path: '/user/:abc',
    component: User,
    meta: {
      title: '用户'
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    },
  }
];
const router = new VueRouter({
  //routes：配置路由和组件之间的映射关系
  routes,
  mode: 'history'
})
// 前置钩子/前置守卫
router.beforeEach((to,from,next) => {
  // 从from跳转到to
  document.title = to.matched[0].meta.title
  next()
  console.log('++++++++++');
})

//后置钩子(hook)
router.afterEach((to,from) => {
  console.log('--------------');
})
// 将router对象传入到实例中:导出,并且在main.js里面挂载该路由
export default router