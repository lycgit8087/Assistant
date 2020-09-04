<!-- login -->
<template>
  <div class="login">
    <van-nav-bar title="注册登录" :fixed="true" />
    <div class="loginView">
      <p class="loginViewTitle">
        <span>您是</span>
      </p>
      <div class="identity">
        <div
          :class="identityNum==index?'active_boder':''"
          @click="chnageIdentity(index)"
          v-for="(item,index) in identity"
          :key="index"
        >
          <van-image fit="cover" :src="item.url" />
          <p>{{item.text}}</p>
        </div>
      </div>
      <van-form validate-first @submit="onsubmit">
        <van-field
          :maxlength="11"
          :rules="[{ validator, message: '请输入11位有效手机号码' }]"
          v-model="phone"
          type="tel"
          placeholder="请输入手机号码"
        />
        <van-field
          :rules="[{ validator:smsValidator, message: '请输入有效短信验证码' }]"
          v-model="sms"
          center
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button
              v-if="!timeShow"
              size="small"
              type="primary"
              color="#082A54"
              @click="getSms"
            >发送验证码</van-button>
            <van-button
              v-if="timeShow"
              disabled
              size="small"
              type="primary"
              color="#082A54"
            >{{countDownNum}}s后重新获取</van-button>
          </template>
        </van-field>
        <van-button
          class="loginbtn"
          native-type="submit"
          type="primary"
          color="#082A54"
          size="large"
        >登录</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { Toast, Notify } from "vant";
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "login",
  components: {},
  data() {
    //这里存放数据
    return {
      value: "",
      phone: "",
      sms: "",
      identity: [
        {
          text: "消费者",
          url: require("../../assets/images/charity.png"),
          type: 0,
        },
        {
          text: "代理商",
          url: require("../../assets/images/dollar.png"),
          type: 1,
        },
        {
          text: "供应商",
          url: require("../../assets/images/money.png"),
          type: 2,
        },
      ],
      identityNum: -1,
      countDownNum: 60,
      couttime: null,
      timeShow: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    validator(val) {
      return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(val);
    },
    smsValidator(val) {
      return /\d{6}/.test(val);
    },
    chnageIdentity(index) {
      this.identityNum = index;
    },
    // 获取验证码
    getSms() {
      let { phone } = this;
      this.$api.user.getSms("sms_vcode_get", "/?c=api", {
        mobile: phone,
      }).then((res) => {
        this.timeShow = true;
        this.countDown();
        console.log(res);
      });
    },
    countDown() {
      let startime = 60;
      this.couttime = setInterval(() => {
        this.countDownNum--;
        if (this.countDownNum === 0) {
          this.timeShow = false;
          this.countDownNum = 60;
          clearInterval(this.couttime);
        }
      }, 1000);
    },

    // 登录注册
    onsubmit() {
      let { phone, sms, identityNum, identity } = this;
      if (identityNum == -1) {
        Notify({
          message: "请选择您的身份",
          type: "warning",
          duration: 3 * 1000,
        });
        return;
      }
      this.$api.user.userBind("user_bind", "/?c=api", {
        utype: identity[identityNum].type,
        mobile: phone,
        vcode: sms,
      }).then((res) => {
        console.log(res);
        localStorage.setItem("token",res.token)
        let token_time= Date.parse(res.token_expires)
        localStorage.setItem("token_time",token_time)
        if(identity[identityNum].type==0){
          this.$router.push({name: 'home',});

        }else{
          this.$router.push({name: 'machine',});

        }
      });
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
  margin-bottom: 40px;
}
.loginViewTitle > span {
  border-bottom: 9px solid #082a54;
}
.identity {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 50px;
  box-sizing: border-box;
}
.identity > div {
  width: 70px;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 5px 25px 1px rgba(55, 58, 64, 0.14);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #082a54;
  box-sizing: border-box;
}
.identity > div .van-image {
  width: 30px;
  height: 30px;
  margin-bottom: 5px;
}
.active_boder {
  border: 2px solid #082a54;
}
.loginbtn {
  margin-top: 46px;
}
.loginView {
}
</style>