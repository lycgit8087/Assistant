<!-- My -->
<template>
  <div class="agent">
    <van-nav-bar left-arrow @click-left="backTo" title="我代理的订单" :fixed="true" placeholder />
    <div class="peopleTop">
      <div class="peopleTopLeftDetail">
        <p>{{userName}}</p>
        <span>{{userPhone}}</span>
      </div>
      <van-image fit="cover" :src="avatar" />
    </div>
    <div class="agentList">
      <p>渠道管理</p>
      <div class="agentListChild" v-for="(item,index) in list" :key="index">
        <div class="agentListChildLeft flex-align-center">
          <p class="mr10 f16">{{item.name}}</p>
          <van-icon @click="edit(item.ltag,item.name)" name="edit" size="15" />
        </div>
        <div class="agentListChildRight flex-align-center">
          <div class="mr20 flex-align-center">
            <van-image class="shareCls" fit="cover" :src="shareIcon" />
            <p class="f16 ml5">分享</p>
          </div>
          <van-icon @click="del(item.ltag)" name="delete" size="15" color="#E96960" />
        </div>
      </div>
    </div>

    <div class="fix-btn">
      <van-button type="info" class="addbtn" @click="addNew">新增渠道</van-button>
    </div>

    <van-popup v-model="show" closeable @close="closePopup">
      <div class="addpeople flex-align-center">
        <van-form validate-first @submit="submitData">
          <p class="add-people-title">{{isEdit?'编辑渠道':'添加渠道'}}</p>
          <p class="add-people-text">渠道名称</p>
          <van-field
            v-model="agentName"
            :rules="[{ validator:regUserName, message: '请输入渠道名称' }]"
            class="field-no-padding"
            :border="false"
            placeholder="渠道名称"
          />

          <van-button native-type="submit" class="keepbtn" type="info">保存</van-button>
        </van-form>
      </div>
    </van-popup>
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
      aid: 0,
      show: false,
      name: "",
      shareIcon: require("../../assets/images/shareIcon.png"),
      avatar: "",
      userName: "",
      userPhone: "",
      list: [],
      agentName: "",
      ltag: "",
      isEdit: false,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getDetail() {
      //获取详情
      let { aid } = this;
      this.$api.agent
        .detail({
          id: aid,
        })
        .then((res) => {
          let listData = res.data;
          this.userName = listData.name;
          this.avatar = listData.avatar;
          this.userPhone = listData.mobile;
          this.list = listData.link_data;
          console.log(res);
        });
    },
    addNew() {
      this.isEdit = false;
      this.show = true;
      this.agentName = "";
    },
    edit(ltag, name) {
      this.ltag = ltag;
      this.isEdit = true;
      this.show = true;
      this.agentName = name;
    },
    // 编辑渠道
    editIt() {
      this.show = true;
      let { agentName, aid, ltag } = this;
      this.$api.orderLink
        .linkEdit({
          lname: agentName,
          aid: aid,
          ltag: ltag,
        })
        .then((res) => {
          this.$Notify({ type: 'success', message: '编辑成功' });
          this.getDetail();
          this.closePopup();
        });
    },
    // 关闭弹出框
    closePopup() {
      this.show = false;
    },
    submitData() {
      let { isEdit } = this;
      if (isEdit) {
        this.editIt();
      } else {
        this.addAgent();
      }
    },
    // 新增渠道
    addAgent() {
      let { agentName, aid } = this;
      this.$api.orderLink
        .linkAdd({
          lname: agentName,
          aid: aid,
        })
        .then((res) => {
          this.$Notify({ type: 'success', message: '添加成功' });
          this.getDetail();
          this.closePopup();
        });
    },

    // 删除
    del(ltag) {
      let {list}=this
      this.$Dialog
        .confirm({
          message: "确定删除吗？",
        })
        .then(() => {
          this.$api.orderLink
            .linkDele({
              ltag: ltag,
            })
            .then((res) => {
            this.$Notify({ type: 'success', message: '删除成功' });
            this.list=list.filter(item=>item.ltag!=ltag)
            this.closePopup();

            });
        })
        .catch(() => {});
    },

    // 检测用户名
    regUserName(val) {
      return val.length>0;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    console.log(this.$route.query);
    this.aid = this.$route.query.aid;
    this.getDetail();
  },
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
<style >
/* //@import url(); 引入公共css类 */
html {
  background: #fbfcfe;
  height: 100%;
}
.shareCls {
  width: 15px;
  height: 15px;
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
.agentListChild {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: #f2f2f2;
  padding: 12px;
  box-sizing: border-box;
}
.peopleTop {
  width: 100%;
  padding: 31px 40px;
  box-sizing: border-box;
  background: cornflowerblue;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.peopleTop .van-image {
  width: 65px;
  height: 65px;
  border-radius: 11px;
}
.peopleTopLeftDetail {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.peopleTopLeftDetail > p {
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
}
.peopleTopLeftDetail > span {
  font-size: 15px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #d5d5d5;
}
.agentListChild > div {
  display: flex;
  align-items: center;
}
.addbtn {
  width: 255px;
}
.agentListChildLeft {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  color: #202020;
}
.addpeople {
  width: 297px;
  background: #ffffff;
  border-radius: 10px;
  padding: 15px 21px;
  box-sizing: border-box;
  flex-direction: column;
}
.add-people-title {
  display: flex;
  font-size: 18px;
  font-weight: 500;
  color: #28292e;
  margin-bottom: 10px;
}
.add-people-text {
  font-size: 14px;
  font-weight: 400;
  color: #28292e;
  margin-bottom: 9px;
  width: 100%;
  margin-top: 20px;
}
.keepbtn {
  width: 255px !important;
  box-shadow: 0px 9px 15px 1px rgba(0, 120, 255, 0.15);
  border-radius: 5px;
  margin-top: 57px;
}
</style>