// loadgin.vue
<template>
<div class="loading-view" >
  <van-popup
    :close-on-click-overlay="false"
    v-model="show"
  >
    <div class="loadingWrap">
      <van-loading color="#1989fa" v-if="show" type="circular" />
    </div>
  </van-popup>
  </div>
</template>

<script>
export default {
  name: "loading",
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style >
/* //@import url(); 引入公共css类 */
    .van-overlay{
        background-color:transparent
    }
  .loading-view  .van-popup{
        background-color:transparent

    }
</style>
