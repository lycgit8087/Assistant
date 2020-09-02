<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html{
  background: #f3f4f6;
  height: 100%;

}
body{
  height: 100%;
}
*{
  padding: 0;
  margin: 0;
}
.van-image{
  overflow: hidden;
  }
.mt10{
  margin-top: 10px;
}

</style>
