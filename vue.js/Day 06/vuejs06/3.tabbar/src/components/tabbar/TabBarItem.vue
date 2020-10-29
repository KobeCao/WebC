<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--动态决定文字和图片，不写死-->
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
    <!-- 通过isActive属性来控制显示那张图片 -->
    <div v-if="!isActive" ><slot name="item-icon"></slot></div><!--不活跃的时候展示的界面 -->
    <div v-else><slot name="item-icon-active"></slot></div> <!--活跃的时候展示的界面 -->
    <!--v-bind动态绑定到一个style，并且将style抽到一个计算属性里面-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>

  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  // 在用item的时候，准备跳转的路径
  props: {
    path: String,
    // 动态决定文字颜色
    activeColor: {
      type: String,
      default: 'red' // 默认值是红色
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  computed: {
    // 动态决定isActive是true还是false
    isActive() {
      // $route.path拿到活跃路由(只有一个)的path，判断它的这个path里面有没有props里面item的path,
      // 如果== -1,就是从$route.path里面没有找到this.path，当不等于负一的时候就代表找到了。找到就代表isActive就是true
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      // 先会请求isActive是否处于活跃,如果处于活跃就color:this.activeColor，如果不是处于活跃，给{}空值
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      //导航到不同的界面,不能写死，当用户单击时，
      this.$router.replace(this.path);
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px; 
  vertical-align: middle; /* 属性设置元素的垂直对齐方式。把此元素放置在父元素的中部。 */
  margin-bottom: 2px;
}

.active {
  color: red;
}
</style>