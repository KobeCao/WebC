<template>
  <div>
    <h2>我是关于</h2>
    <p>我是关于内容，呵呵呵</p>

    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  //这两个函数，只有该组件被保持了状态使用了keep-alive时，才是有效的。
  activated() {
    this.$router.push(this.push);
    console.log('activated');
  },
  deactivated() {
    console.log('deactivated');
  },
  // 记录离开时的路径
  beforeRouteLeave(to,from,next) {
    console.log(this.$route.path);
    this.path = this.$route.path;
    next();
  }
};
</script>
<style>
</style>