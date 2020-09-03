<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    let msg = "";

    let token = localStorage.getItem("token");
    if (token) {
    } else {
      //  window.location.href="https://sc.imofang.cn/cube.aspx?c=module&module_name=wse&show_mode=redirect&dt=gauth&lr=0"
      if (process.env.NODE_ENV == "development") {
        msg = {
          mobile_bind: "0",
          token:
            "NHFlYnNFK2lZRm5mMERBMkxtTUFKUkFmQk1aQVJyVUxHb3JCcEdCYjFpekh5b0NsRENva1FXWUFGdUpRTUJIazQ2Z2JtSkVwOHZ1MU9hbzZpRnFYVEE5RXZ1Umd5KzhOVFdZS09OVHhzbm9sOTN0Z25xT1I5UkQvRVJNK2loRldPeWNia2hETFZORFJFa2xWb1crUEF3PT0=",
        };
        localStorage.setItem("token",msg.token)
        if(msg.mobile_bind==0){
          this.$router.push({name: 'login',});
        }
      } else {
        msg = JSON.parse(window.msg);
      }
    }
  },
  methods: {
    getLogin() {},
    getParms() {
      var url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var newUrl = window.location.search.substr(1).match(url);
      if (newUrl != null) {
        return unescape(newUrl[2]);
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
html {
  background: #f3f4f6;
  height: 100%;
  font-size: 12px;
}
body {
  height: 100%;
}
* {
  padding: 0;
  margin: 0;
}
.van-image {
  overflow: hidden;
}
.mt10 {
  margin-top: 10px;
}
.mt20 {
  margin-top: 20px;
}
.mt30 {
  margin-top: 30px;
}
.flexallcenter {
  display: flex;
  align-items: center;
  justify-content: center;
}
.flex-just-center {
  display: flex;
  justify-content: center;
}
.flex-align-center {
  display: flex;
  align-items: center;
}
.field-no-padding {
  padding-left: 0;
  padding-right: 0;
  border-bottom: 1px solid #ebedf0;
}
</style>
