import Vue from 'vue'
import VueRouter from 'vue-router'

// 通过懒加载的方式导入
const Home = () => import('../views/home/Home.vue')
const Category = () => import('../views/category/Category.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')
//安装插件
Vue.use(VueRouter)

// 配置路由对象
const routes = [
  {
    path: '',
    // redirect 重定向
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  }
]
// 创建路由对象
const router = new VueRouter({
  routes,
  // 使用history模式
  mode: 'history'
})
export default router
