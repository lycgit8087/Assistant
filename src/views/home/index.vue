<template>
  <div class="home">
    <van-nav-bar :title="tabValue==0?'我代理的订单':'我的'" :fixed="true" placeholder />
    <!-- 订单 -->
    <template v-if="tabValue==0">
     <Order></Order>
    </template>
    <!-- 我的 -->
    <template v-if="tabValue==1" >
        <My></My>
    </template>
    <!-- 固定标签 -->
    <van-tabbar v-model="tabValue">
      <van-tabbar-item icon="bars">订单</van-tabbar-item>
      <van-tabbar-item icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import My from '@/views/my'
import Order from '@/views/order'

export default {
  name: "home",
  components:{
      My,
      Order
  },
  data() {
    return {
      tabValue: 0
    };
  },
  created() {
    let userInfo=this.$store.state.userInfo
    
    this.$api.user.userInfo().then(res=>{
      console.log(res)
    })
    console.log(userInfo)
    if(JSON.stringify(userInfo)=="{}"){
      
    }
    
  },
  mounted(){
    
  },
  methods: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
</style>
