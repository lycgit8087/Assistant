<!-- order-detail -->
<template>
  <div class="order-detail">
    <div class="detail_top">
      <div class="detail_top_des">
        <p>佰儒 2020特级新茶安溪铁观音茶叶 1包</p>
        <span>已发货</span>
      </div>
      <p class="detail_top_time">下单时间：2020/08/16 09:35</p>
    </div>

    <!-- 留言 -->
    <van-field v-model="message" rows="1" autosize label="留言" type="textarea" placeholder="请输入留言" />
    <div class="people_des">
      <!-- 收件人信息 -->
      <van-field v-model="name" label="收件人" placeholder="请输入留言" />
      <van-field v-model="phone" label="联系方式" placeholder="请输入留言" />
      <van-field
        v-model="place"
        rows="2"
        autosize
        label="收货地址"
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
<van-field
    v-model="qrcode"
    clearable
    label="快递单号"
    placeholder="快递单号"
    right-icon="scan"
    />
    <!-- 物流信息 -->
    <van-steps direction="vertical" :active="0">
      <van-step>
        <h3>【城市】物流状态1</h3>
        <p>2016-07-12 12:40</p>
      </van-step>
      <van-step>
        <h3>【城市】物流状态2</h3>
        <p>2016-07-11 10:00</p>
      </van-step>
      <van-step>
        <h3>快件已发货</h3>
        <p>2016-07-10 09:30</p>
      </van-step>
    </van-steps>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "order-detail",
  components: {},
  data() {
    //这里存放数据
    return {
      message: "",
      place: "",
      name: "",
      phone: "",
      qrcode: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
<style  scoped>
/* //@import url(); 引入公共css类 */
html {
  background: #fbfcfe;
}
.detail_top {
  background: #fff;
  padding: 20px;
  padding-right: 0;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 2px;
}
.detail_top_des {
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.detail_top_des {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
.detail_top_des > p {
  width: 60vw;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #202020;
}
.detail_top_des > span {
  width: 71px;
  height: 22px;
  background: #75c16d;
  border-top-left-radius: 11px;
  border-bottom-left-radius: 11px;

  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
}
.detail_top_time {
  font-size: 12px;
  font-weight: 400;
  color: #7a7a7a;
}
.people_des {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>