<template>
  <div id="app">
    <tab-bar>
      <tab-bar-item>
        <!-- slot="item-icon"动态替换插槽，替换之后在TabBarItem.vue中就没有写死-->
        <img slot="item-icon" src="./assets/img/tabbar/home.svg" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item>
        <img slot="item-icon" src="./assets/img/tabbar/category.svg" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item> 
        <img slot="item-icon" src="./assets/img/tabbar/shopcart.svg" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item>
        <img slot="item-icon" src="./assets/img/tabbar/profile.svg" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
// 导入TabBar组件
import TabBar from "./components/tabbar/TabBar";
import TabBarItem from "./components/tabbar/TabBarItem";
export default {
  name: "App",
  components: {
    // 注册组件
    TabBar,
    TabBarItem,
  },
};
</script>

<style>
/* 动态引入css文件 */
@import "./assets/css/base.css";
</style>
