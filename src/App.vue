<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" class="app-middle-content" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" class="app-middle-content" />
  </div>
</template>

<script>
const wxurl = "https://ams.imofang.cn/cube.aspx";
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    this.useParams();
    localStorage.setItem("indexUrl", wxurl + "?ac=index");
  },
  methods: {
    // url传参
    useParams() {
      // 判断是否有token
      let token = localStorage.getItem("token");
      if (process.env.NODE_ENV == "development") {
        this.$router.push({ name: "home" });
        localStorage.setItem(
          "token",
          "NHdFMXVBZFdVdGRpellYQVNPSTU2OU9HSFY1S21jMkYvNld5Ly9QeUpQVEJvSEdNbnpyWEtjNC8vZzFTUzkzR0ZOdjczU2hWc09OeGh1SjJCdjZmOFhYQnBhRDJ4Q0hIUk5pN2xFZnpUWlprRGdkWWFEQlBPbGplYjArTHBMamJzb1htbjlTbXJBUFRadnZYcHpRd1ZXZi95Q08vUXJwU3BtT3NYYVNYbTltajcvazh6VUhadU5QWVJNWTJPUjhreEVFbEJXNzFHY1ZqeVZnS2xpWmtTQzdXVVF2WDB1dmtNaDFwY3J3bGJnM2pKZVNPUHBQK1NYejQ4L3g5MUxlem4xRGN2WTJmVGlPYzViRFVYRkpCQURhL2dKcTF1TFFDSkpKcCtiVk1UeDMyM3l5THVqa0RRS3dKVXBJT05waW80OFNlMnJXYnRSWFIxMFVUcE1yK1ZMbmN3RmQ3UDQ2YkR3aXVnOTRwRVhPSEYxWXBEVzNaTmF0KzhoemZuN2d1UnBKVS9HTURpbUc1R1BUelZwSUtBL3hya1liUHNSdE5TanErNzcwRnYxdk9JOStwTEowU0ZncEY2TW5kckxCSmdyMVVBdWVyVzRHRnlZaGd2MHdrR2o3SEtSL1dVbjIrWjgwOUM4bTJ1cFE9"
        );
        let token_time = 1599566995000;
        console.log(token_time);
        localStorage.setItem("token_time", token_time);
        return;
      }

      let params = this.getUrlParams();
      let pageUrl = [
        { ac: "index", name: "home" },
        { ac: "order", name: "order" },
        { ac: "personal", name: "my" },
      ];
      console.log(params);
      let pageNum = pageUrl.findIndex((item) => item.ac == params.ac);
      if (token) {
        this.setToken(params, pageUrl[pageNum].name);
      } else {
        if (params.hasOwnProperty("token")) {
          this.setToken(params);
        } else {
          let url = `${wxurl}?c=module&module_name=wse&show_mode=redirect&dt=gauth&lr=0&rpath=${window.location.href}`;
          window.location.href = this.urlMerge(url, params);
        }
      }
    },
    // 合并url
    urlMerge(url, data) {
      for (let i in data) {
        url += `&${i}=${data[i]}`;
      }
      return url;
    },
    // 设置并且跳转
    setToken(data, name = "home") {
      localStorage.setItem("token", data.token);
      localStorage.setItem("token_time", data.token_expires);
      if (data.mobile_bind == 0) {
        this.$router.push({ name: "login" });
      } else {
        this.$router.push({ name: name });
      }
    },

    // 获取url参数
    getUrlParams(name) {
      // 不传name返回所有值，否则返回对应值
      var url = window.location.search;
      if (url.length == 0) {
        return false;
      }
      url = url.substr(1);
      url = url.split("&");
      var name = name || "";
      var nameres;
      var obj = {};

      // 获取全部参数及其值
      for (var i = 0; i < url.length; i++) {
        var info = url[i].split("=");
        obj[info[0]] = decodeURI(info[1]);
      }
      url = obj;
      // 如果传入一个参数名称，就匹配其值
      if (name) {
        for (var i = 0; i < url.length; i++) {
          for (const key in url[i]) {
            if (key == name) {
              nameres = url[i][key];
            }
          }
        }
      } else {
        nameres = url;
      }
      // 返回结果
      return nameres;
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
.f12 {
  font-size: 12px;
}
.f16 {
  font-size: 16px;
}
.van-image {
  overflow: hidden;
}
.mt10 {
  margin-top: 10px;
}
.mr10 {
  margin-right: 10px;
}
.mr20 {
  margin-right: 20px;
}
.ml5 {
  margin-left: 5px;
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

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 1px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.fix-btn {
  position: fixed;
  bottom: 3vh;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
