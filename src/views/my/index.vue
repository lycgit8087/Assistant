<!-- My -->
<template>
  <div class="my">
    <div class="my_top">
      <van-image fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
      <span>施瓦辛格</span>
    </div>

    <!-- 订单管理 -->
  <div class="my_order">
    <span>订单管理</span>
    <div class="my_order_chlid">
      <div v-for="(item,index) in 3" :key="index">
        <van-image fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <span>我代理的订单</span>
      </div>
    </div>
  </div>

  <van-cell-group>
  <van-cell v-for="(item,index) in myList" :key="index" icon="location-o" :title="item.title" is-link @click="goto(item.name)"  />
</van-cell-group>



  </div>

  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "my",
  components: {},
  data() {
    //这里存放数据
    return {
      myList:[
        {title:"代理商管理",name:"mail-list"},
        {title:"供应商管理",name:"supplier"},
      ]

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goto(name){
       this.$router.push({name: name,});
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style >
/* //@import url(); 引入公共css类 */
html {
  background: #fbfcfe;
  height: 100%;
}
body {
  height: 100%;
}
.my {
  width: 100vw;
  height: 100vh;
  background: #fbfcfe;
  display: flex;
  flex-direction: column;
}
.my_top {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.my_top .van-image {
  width: 99px;
  height: 99px;
  box-shadow: 0px 10px 10px 0px rgba(179, 179, 201, 0.5);
  border-radius: 50%;
  margin-bottom: 25px;
  overflow: hidden;
  margin-top: 20px;
}
.my_top > span {
  font-size: 18px;
  font-weight: 500;
  color: #202020;
  margin-bottom: 30px;
}
.my_order {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  box-sizing: border-box;
}
.my_order > span {
  font-size: 18px;
  font-weight: 500;
  color: #4b4b4b;
  margin-bottom: 20px;
}
.my_order_chlid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
}
.my_order_chlid > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.my_order_chlid > div > span {
  font-size: 14px;
  font-weight: 400;
  color: #4b4b4b;
  margin-top: 10px;
}
.my_order_chlid > div .van-image {
  width: 40px;
  height: 40px;
}
</style>