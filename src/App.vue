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
  font-size: 12px;

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
.mt20{
  margin-top: 20px;

} 
.mt30{
  margin-top: 30px;
}
.flexallcenter{
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-just-center{
  display: flex;
  justify-content: center;
}
.flex-align-center{
  display: flex;
  align-items: center;
}
.field-no-padding{
  padding-left: 0;
  padding-right: 0;
  border-bottom: 1px solid #ebedf0; 

}
</style>
