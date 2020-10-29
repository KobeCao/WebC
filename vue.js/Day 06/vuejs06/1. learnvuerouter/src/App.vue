<template>
  <div id="app">
     <!-- <router-link to="/about" tag="button" replace>首页</router-link>
     <router-link to="/home" tag="button" replace>关于</router-link> -->
     <!-- <button @click="homeClick">首页</button>
     <button @click="aboutClick">关于</button> -->

     <router-link to="/about">首页</router-link>
     <router-link to="/home">关于</router-link>
     <!-- <router-link :to="'/User/'+userId">用户</router-link> -->
     <!-- <router-link to="/Profile">档案</router-link> -->
     <!-- <router-link :to="{path: '/Profile',query: {name: 'why',age: 18,height: 1.88}}">档案</router-link> -->
     <button @click="UserClick">用户</button>
     <button @click="ProfileClick">档案</button>
     
     <keep-alive>
       <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userId: "lisi",
    };
  },
  methods: {
    // 通过代码修改路由 vue-router
    homeClick() {
      // this.$router.push('/about');
      this.$router.replace("/about");
      console.log("homeClick");
    },
    aboutClick() {
      // this.$router.push('/home');
      this.$router.replace("/home");
      console.log("aboutClick");
    },
    UserClick() {
      this.$router.push("/user/" + this.userId);
    },
    ProfileClick() {
      this.$router.push({
        path: "/profile/",
        query: {
          name: "kobe",
          age: 18,
          height: 1.88,
        },
      });
    },
  },
};
</script>

<style>
</style>
