<!-- login -->
<template>
  <div class="machine">
    <van-nav-bar title="添加下单小助手" :fixed="true" placeholder />
    <p class="skip" @click="toHome" >跳过</p>
    <div class="machine_qrcode mt30 flexallcenter">
      <van-image fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <span class="machine_qrcode_text">长按添加下单小助手</span>
      <span class="machine_qrcode_text">它让您快速生成订单</span>
    </div>

    <p class="mach_text">第一步：您只需要把客户的下单信息(如姓名:曾某某，电话:18866677755 地址:广州市天河区华观路火炉山热点创意园301)发给小助手；</p>
    <p class="mach_text">第二步：回到订单列表页面，已经生成一个待确认的订单，您只需要批量操作进行订单确认，发给供应商确认等待发货；</p>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "machine",
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    toHome(){
          this.$router.push({name: 'home',});
      
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  >
html {
  background: #fff;
}
.machine {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
  width: 100%;
  align-items: center;
}
.skip {
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #bdbdbd;
  width: 100%;
  text-align: right;
  margin-top: 15px;
}
.machine_qrcode {
  width: 255px;
  height: 276px;
  background: #082a54;
  box-shadow: 0px 9px 15px 1px rgba(0, 120, 255, 0.15);
  border-radius: 5px;
  flex-direction: column;
  margin-bottom: 37px;
}
.machine_qrcode .van-image {
  width: 175px;
  height: 175px;
  margin-bottom: 5px;
}
.machine_qrcode_text {
  width: 144px;
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 5px;
}
.mach_text {
  font-size: 12px;
  font-weight: 400;
  color: #000000;
  margin-bottom: 15px;
  width: 295px;
}
</style>