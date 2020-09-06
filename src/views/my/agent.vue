<!-- My -->
<template>
  <div class="agent">
    <van-nav-bar left-arrow @click-left="backTo" title="我代理的订单" :fixed="true" placeholder />
    <div class="agentList">
      <p>渠道管理</p>

      <div class="agentListChild">
        <div class="agentListChildLeft flex-align-center ">
          <p class="mr10 f16">王耀峰的订单</p>
          <van-icon name="edit" />
        </div>
        <div class="agentListChildRight flex-align-center">
          <div class="mr20 flex-align-center" >
            <van-icon name="eye-o" />
            <p class="f16 ml5">预览</p>
          </div>
          <van-icon name="delete" />
        </div>
      </div>
    </div>

      <div class="fix-btn">
      <van-button type="info" class="addbtn"  @click='toAddAgent' >新增链接</van-button>
    </div>

  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mixin } from "../../mixin/mixin";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "agent",
  components: {},
  mixins: [mixin],
  data() {
    //这里存放数据
    return {
      myList: [
        { title: "代理商管理", name: "mail-list", icon: "cluster-o" },
        { title: "供应商管理", name: "supplier", icon: "points" },
      ],
      orderList: [
        {
          title: "我供货的订单",
          type: "2",
          url: require("../../assets/images/money.png"),
        },
        {
          title: "我代理的订单",
          type: "1",
          url: require("../../assets/images/dollar.png"),
        },
        {
          title: "我购买的订单",
          type: "0",
          url: require("../../assets/images/charity.png"),
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goto(name) {
      this.$router.push({ name: name });
    },
    openIt() {
      this.$api.user.tokenUpdate((res) => {
        console.log(res);
      });
    },
    toAddAgent(){
      this.$router.push({ name: "order-edit" });

    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    console.log(this.$store.state.userInfo);
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style >
/* //@import url(); 引入公共css类 */
html {
  background: #fbfcfe;
  height: 100%;
}

.agentList {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  box-sizing: border-box;
}
.agentList > p {
  font-size: 18px;
  font-weight: 500;
  color: #4b4b4b;
  margin-top: 20px;
  margin-bottom: 10px;
}
.agentListChild{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #F2F2F2;
    padding: 12px;
    box-sizing: border-box;
}
.agentListChild>div{
    display: flex;
    align-items: center;
}
.addbtn {
  width: 255px;
}
.agentListChildLeft{
    display: flex;
    align-items: center;
font-size: 16px;
font-weight: 400;
color: #202020;

}

</style>