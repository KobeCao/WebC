<template>
  <div>
    <h2 class="title">{{message}}</h2>
    <button @click="btnClick">按钮</button>
    <h2>{{name}}</h2>
    <cpn></cpn>
  </div>
</template>

<script>

//导入
import Cpn from './Cpn.vue'

export default {
  name: "App",
  // 对导入的Cpn进行注册
  components: {
    Cpn
  },
    data() {
    return {
      message: 'hello webpack',
      name: 'caoBin'
    }
  },
  methods: {
    btnClick() {
    }
  }
}
</script>

<style>
  .title {
    color: yellow;
  }
</style>