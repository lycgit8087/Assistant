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
  name: "Home",
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
    localStorage.setItem("token","")
    // localStorage.setItem("token","T3lNOG1qWmtwVzNSSEtUTVRNWlhUUHlDdmY5ZUhZQW9zaktIVlNESkVFNktjbEtYYzhrdHJ4SWtXa2puYUVMajBCV0NwdzIyT0R5TXRVNTZyNnhEZW1CaVlOT0ZOQ0FmdHNOU1VpZURqaHVOeE9VVmJXcHFlL1pZa0FBczZ0L25wbEUxbWxZcEZyMndNV3ExWW5uT1F4T1Q2eHR0dUhuSVNNamJvTnRLOTlCVitUWkdlS3hxSnc1dWdHUGZ2OStUTXdNZ2Y3SjJTQVNYemU3Yjg2SUhIV2lVRlROcGEyR3RsZFlXa3l1VkM4VWRQRUdPdmh3d1lxWS9tcXoydU5nS0NyVWlheDZQUk9iSGt4RHRzNitUK0RiUWFTa2RZUEhDaElucnpWVnRKMXVzMDkvdzZ3Y2NiYjNlWGRGQS9URU43UTNPVTNFc1BPQlV0UlNBbDRNRTFDRlpITzYzZ1YyRmFpOElXNHBzWGxQcTR2K2Y2OVZyYmdlVktKNTluOTBHT2lvcTNQdzBaU0FBY3ZVa1FuTiszR3dMMUdGdnlHdUM2bmpxbk1VVGlTbEU5REwzODZ5THVGVTVGeDU0SU5QK0hqQ1VKYmdzWkpzUUlwMzVuY3dXQVE9PQ==")
    this.$post("user_info", "/?c=api", {
      }).then(res=>{
        console.log(res)
      })
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
