<template>
  <div>
    <h2>{{$store.state.counter}}</h2>
    <h2>{{$store.getters.powerCounter}}</h2>
    <h2>{{$store.getters.moreStu}}</h2>
     <h2>{{$store.getters.moreAgStu(25)}}</h2>
  </div>
</template>

<script>
export default {
  name: "HelloVuex"
}
</script>

<style>

</style>