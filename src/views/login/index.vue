<!-- login -->
<template>
  <div class="login">
    <van-nav-bar title="注册登录" :fixed="true" />
    <div class="loginView">
      <p class="loginViewTitle">
        <span>登录</span>
      </p>
      <van-field :maxlength="11" :rules="[{ validator, message: '请输入正确内容' }]" v-model="tel" type="tel" placeholder="请输入手机号码" />
      <van-divider />
      <van-field  v-model="sms" center clearable  placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary" color="#082A54" >发送验证码</van-button>
        </template>
      </van-field>
      <van-divider />   
      <van-button type="primary" color="#082A54" size="large">登录</van-button>
    </div>
  </div>
  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "login",
  components: {},
  data() {
    //这里存放数据
    return {
      value: "",
      tel: "",
      sms:"",
      pattern:''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
      validator(val) {
          console.log(val)
      return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(val);
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
/* //@import url(); 引入公共css类 */
html {
  background: #fff;
}
.loginView {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  height: 100vh;
  padding-top: 50px;
  box-sizing: border-box;
}
.loginViewTitle {
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 25px;
  font-weight: 400;
  color: #28292e;
  margin-top: 60px;
  margin-bottom: 80px;
}
.loginViewTitle > span {
  border-bottom: 9px solid #082a54;
}
</style>