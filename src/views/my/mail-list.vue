<!-- mail-list -->
<template>
  <div class="mail-list">
    <van-nav-bar title="代理商管理" :fixed="true" placeholder />
    <van-search v-model="value" placeholder="请输入搜索关键词" />

    <van-index-bar>
      <van-index-anchor index="A" />
      <van-swipe-cell v-for="(item,index) in 3" :key="index" >
        <div class="mial_people">
          <div class="mial_people_left">
            <van-image fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div class="mial_people_left_des">
              <p>
                <span>林有有</span>
                <span>（下单渠道数：3）</span>
              </p>
              <span>185 7876 5543</span>
            </div>
          </div>

          <p>已注册</p>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" />
        </template>
      </van-swipe-cell>
    
    </van-index-bar>

    <div class="fix-btn" >
        <van-button type="info" class="addbtn" @click="show=true" >添加代理商</van-button>

    </div>
   <van-popup v-model="show" closeable>
      <div class="addpeople flex-align-center" >
        <p class="add-people-title" >添加代理商</p>
        <p class="add-people-text" >代理商名称</p>
        <van-field v-model="username"  class="field-no-padding" :border="false" placeholder="请输入商品名称规格等信息" />

        <p class="add-people-text" >手机号码</p>
        <van-field v-model="ophone" class="field-no-padding" :border="false"  placeholder="请输入手机号码" />
        <van-button class="keepbtn" type="info">保存</van-button>
      </div>
   </van-popup>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "mail-list",
  components: {},
  data() {
    //这里存放数据
    return {
      value: "",
      show:true,
      username:"",
      ophone:"",

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

.mial_people {
  width: 100%;
  background: #fff;
  padding: 0 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}
.mial_people > p {
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 400;
  color: #ffffff;
  padding: 5px 5px;
  box-sizing: border-box;
  background: #75c16d;
}
.mial_people_left {
  height: 100%;
  display: flex;
  align-items: center;
}
.mial_people_left .van-image {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  margin-right: 16px;
}
.mial_people_left_des {
  display: flex;
  flex-direction: column;
  height: 44px;
}
.mial_people_left_des > span {
  font-size: 12px;
  font-weight: 600;
  color: #707070;
}
.mial_people_left_des > p {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.mial_people_left_des > p span:nth-child(1) {
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #202020;
  width: 70px;
}
.mial_people_left_des > p span:nth-child(2) {
  font-size: 12px;
  font-weight: 500;
  color: #7ebeff;
  line-height: 17px;
}
 .van-swipe-cell__right .van-button--normal{
    height: 100% !important;
}
.addpeople{
  width: 297px;
height: 330px;
background: #FFFFFF;
border-radius: 10px;
padding: 15px 21px;
box-sizing: border-box;
flex-direction: column;

}
.add-people-title{
  display: flex;
  font-size: 18px;
  font-weight: 500;
  color: #28292E;
  margin-bottom: 10px;

}
.add-people-text{
font-size: 14px;
font-weight: 400;
color: #28292E;
margin-bottom: 9px;
width: 100%;
margin-top: 20px;

}
.keepbtn{
 width: 255px !important;
  box-shadow: 0px 9px 15px 1px rgba(0, 120, 255, 0.15);
  border-radius: 5px;
  margin-top: 57px;
}
.fix-btn{
  position: fixed;
  bottom: 3vh;
  left: 50%;
  transform: translate(-50%,0);
}
.addbtn{
  width: 255px;
}
</style>