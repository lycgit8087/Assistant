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
          this.$router.push({name: 'home',});;
      localStorage.setItem("token","T3lNOG1qWmtwVzNSSEtUTVRNWlhUQnRtdk1nb1QvM1BoaUxzRkhSVHM5NTF0SkJwT3VQSFR5YWh5OVhQR05vblhtWk5NSFNTOFpDTldhZ1dMRmRSeU5OOFJINFhJSWRCL0psV0d0cHA4VW5TcVhHckZXWmVvQlFRZktub2ZRK3ZCd0lpWnhxTEZMOW5zenJzVTdHdlNOU0o3QVFDTU9wcktoTmV6bU5pSVMxd2E2bjd3QTU1QXRlcXhlajZ4VFhXcG1acWQyb0VkZHltL0tkSW11cWpqTGlxN2VyT1hmb1NDTGFTa2dQellBN1Yrb1N1d2E2YmJIcDVNajI1QzBTdjl0MVBQUnZEMTZQeGVpdTV3aWtmVzBzaDByc1JwVTlMVWZPTTBGR1lTR29qOEF0a2xIMzhRMjhzL1NraXBIZFpSVXYzT1BtWEJxcVVxYmFEaGlzajBGRCtrcDBwRU9zKzd3ZmtETyt6WTI3cmpJUUlhYjd3cGNoL3E0OU9mc3BTNzFwajBSVStiVzBTM0R4UDR5azIxQ3pyYnpCVmhDOXczVDhPZ0FMMHZhYkdheXdkU1BjUXFVb3FWWkJlWEVnRms0VjFuc1MyOVNtTjk1aVZFWlpMQkNZcWltWDlTd25vN21pVUZRWXhxWkU9")
    } else {
      //  window.location.href="https://sc.imofang.cn/cube.aspx?c=module&module_name=wse&show_mode=redirect&dt=gauth&lr=0"
      if (process.env.NODE_ENV == "development") {
        msg = {
          mobile_bind: "0",
          token:
            "T3lNOG1qWmtwVzNSSEtUTVRNWlhUQnRtdk1nb1QvM1BoaUxzRkhSVHM5NTF0SkJwT3VQSFR5YWh5OVhQR05vbmI4RjF6ai9kMXkrKyt0L0htdGFpSVFaR3ZGZnByT1loL2dGMDFHZVVaQ3orSlRDNnE0RTE1MDhKTmxSOWdjNURSMGNvdE1mVjl1ckJGdW4rMnFFTisxWGZMdzd5RjhVZHN0clBDNzZXNThSTndSNlA0bjVNc2JyU3cxcytJSGkrdFRXZHRYTVFQUWlvZVVLcDUwLzc2T1kvalhPaTl4YVZZN3lYSVhud2oyTmtCMDR0emlBY0VIblhwR3JiaGhsb21TYW0zYnFOSUV1ZXVVbElkK1drYnlxT1BybWx3VmtRSVJ0RFRhR2RvTGxqL1ZPaWs0bCtvR3h1U3oydndidmhlcEkvSUhWa0FML3FYQnEyV0M4MTRWLzE5aTZnS0cyUURJbVFodWljby9lWVIwcXhNVXIxOTJhTWVvbHcwb1NsNEJQRXRrRDJ6WFQ4d0VwdzMvTzN2MUdCUmVTUmZpMmhZeHU4QVAwQlpKREdkVFN0OVcvbXZOVVRQYUxHc0xQUnpwdlpWTy84RGNvZ0dnclh1MkpjaVE9PQ==",
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

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 1px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
</style>
