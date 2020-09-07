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
      // this.$api.user.tokenUpdate()

    let userInfo=this.$store.state.userInfo
    let url=this.getParam("https://ams.imofang.cn/cube.aspx?c=mp&module_name=wse&lr=0&at=sure_authorize&oc_id=w_1599445035388&mp_ui=%2fG02NSskKOXZu6OKoAj8oqADq6g0g8NJip74SFdmp0799JoE3J3snw9ccsxdGRxNKF9N1eZjGNMk6b8V%2fo3hSg%3d%3d")
    console.log(url)
    console.log(userInfo)
    if(JSON.stringify(userInfo)=="{}"){
      this.$api.user.userInfo().then(res=>{
      console.log(res.data)
      if(res.data.mobile_bind==0){
          this.$router.push({ name: "login" });

      }
      this.$store.dispatch('USER_INFO',res.data)
    })
    }
    
  },
  mounted(){
    
  },
  methods: {

    getParam (paramName) { 
    return decodeURIComponent((new RegExp('[?|&]' +
      paramName + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
</style>
