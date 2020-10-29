<template>
  <div>
    <h2>我是prolife组件</h2>
    <p>我是profile的组件的内容</p>
    <h2>{{$route.query.name}}</h2>
    <h2>{{$route.query.age}}</h2>
    <h2>{{$route.query.height}}</h2>
  </div>
</template>
<script>
export default {
  name: "Profile"
}
</script>

<style>

</style>