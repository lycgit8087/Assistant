<!-- mail-list -->
<template>
  <div class="mail-list">
    <van-nav-bar left-arrow @click-left="backTo" title="代理商管理" :fixed="true" placeholder />
    <van-search v-model="searchValue" placeholder="请输入搜索关键词" />

    <van-index-bar :index-list="indexList">
      <div v-for="(item,index) in list" :key="index">
        <van-index-anchor :index="item.title" />
        <van-swipe-cell
          v-for="(ditem,dindex) in item.data"
          :key="dindex"
          :before-close="beforeClose"
          :name="ditem.lid"
          
        >
          <div class="mial_people" @click="toAgent(ditem.name)" >
            <div class="mial_people_left">
              <van-image fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              <div class="mial_people_left_des">
                <p>
                  <span>{{ditem.name}}</span>
                  <span>（下单渠道数：{{ditem.link_count}}）</span>
                </p>
                <span>{{ditem.mobile}}</span>
              </div>
            </div>
            <p :class="ditem.rstatus==0?'rclass':'gclass'" >{{ditem.rstatus==0?"未注册":"已注册"}}</p>
          </div>
          <template #right>
            <van-button @click="setBtnType(0)" square text="删除" type="danger" class="delete-button" /><van-button @click="setBtnType(1)" square type="primary" text="编辑" />
          </template>
        </van-swipe-cell>
      </div>
    </van-index-bar>

    <div class="fix-btn">
      <van-button type="info" class="addbtn" @click="show=true">添加代理商</van-button>
    </div>
    <van-popup v-model="show" closeable @close="closePopup">
      <div class="addpeople flex-align-center">
        <van-form validate-first @submit="onsubmit">
          <p class="add-people-title">添加代理商</p>
          <p class="add-people-text">代理商名称</p>
          <van-field
            v-model="username"
            :rules="[{ validator:regUserName, message: '请输入代理商名称' }]"
            class="field-no-padding"
            :border="false"
            placeholder="代理商名称"
          />

          <p class="add-people-text">手机号码</p>
          <van-field
            :maxlength="11"
            :rules="[{ validator, message: '请输入11位有效手机号码' }]"
            v-model="phone"
            class="field-no-padding"
            :border="false"
            placeholder="请输入手机号码"
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
import util from "../../utils/util";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "mail-list",
  components: {},
  mixins: [mixin],

  data() {
    //这里存放数据
    return {
      value: "",
      show: false,
      username: "",
      phone: "",
      searchValue: "",
      list: [],
      oldList: [],
      indexList: [],
      btnType:0,
      editLid:0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    searchValue(val) {
      this.debounce(this);
    },
  },
  //方法集合
  methods: {
    // 获取列表
    getList() {
      let { searchValue, indexList } = this;
      this.$api.agent
        .list({
          is_link: 0,
          name: "",
        })
        .then((res) => {
          indexList = [];
          let { data } = res;
          data.forEach((item, index) => {
            item.first_letter = item.first_letter.toUpperCase();
          });
          this.oldList = data;
          let listData = this.disposeData(data);
          listData.forEach((item) => {
            indexList.push(item.title);
          });
          this.indexList = indexList;
          this.list = listData;
        });
    },
    // 处理列表数据
    disposeData(data) {
      let newData = this.$util.filter_identical(data, "first_letter");
      let listData = newData.sort(this.$util.sortBy("title"));
      return listData;
    },

    toAgent(position){
      console.log(position)
      if(position=="cell"){
      this.$router.push({ name: "agent" });

      }
    },

    // 防抖
    debounce: util.debounce((vm) => {
      // do something，这里this不指向Vue实例,用vm传入
      vm.searchIt();
    }, 500),

    // 搜索
    searchIt() {
      let { searchValue, list, oldList } = this;
      if (searchValue.length) {
        list.forEach((item, index) => {
          item.data = item.data.filter(
            (ditem) => ditem.name.indexOf(searchValue) != -1
          );
        });
        list = list.filter((item) => item.data.length != 0);
      } else {
        list = this.disposeData(oldList);
      }
      this.list = list;
    },

    // 代理商添加
    onsubmit() {
      let {editLid}=this
      if(editLid==0){
          this.addAgent()
      }else{
          this.editAgent()
      }
      
    },
    // 关闭弹出框

    closePopup(){
        this.username=""
        this.phone=""
        this.editLid=0

    },
    // 添加代理商
    addAgent(){
      let { username, phone } = this;
      this.$api.agent
        .add({
          name: username,
          mobile: phone,
        })
        .then((res) => {
          this.$Toast.success("添加成功");
          this.show = false;
          setTimeout(() => {
            this.getList();
          }, 500);
        });
    },

    // 编辑代理商
    editAgent(){
      let { username, phone,editLid } = this;
      this.$api.agent
        .edit({
          lid:editLid,
          name: username,
          mobile: phone,
        })
        .then((res) => {
          this.$Toast.success("编辑成功");
          this.show = false;
          this.editLid=0
          setTimeout(() => {
            this.getList();
          }, 500);
        });
    },

    // 删除确认框
    beforeClose({ name, position, instance }) {
      let {btnType}=this
      if (position == "right") {
        console.log(btnType)
        if(btnType==0){
           this.$Dialog
          .confirm({
            message: "确定删除吗？",
          })
          .then(() => {
            instance.close();
          }).catch(()=>{
            instance.close();
            
          });
        }else{
          this.editPeople(name)
          instance.close();
        }
       
      }
    },
    // 编辑代理商
    editPeople(editLid){
      let {list}=this
      this.editLid=editLid

      this.show=true
      let people={}
      list.forEach((item, index) => {
            people= item.data.filter((ditem) => ditem.lid == editLid);
          });
      people=people[0]
          console.log(people)
          this.username=people.name
          this.phone=people.mobile

    },

    setBtnType(type){
      this.btnType=type
    },

    // 删除代理商
    del(lid) {
      let { list } = this;
      this.$api.agent
        .del({
          lid: lid,
        })
        .then((res) => {
          list.forEach((item, index) => {
            item.data = item.data.filter((ditem) => ditem.lid != lid);
          });
        });
      this.list = list;
    },

    // 检测手机号码
    validator(val) {
      return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(val);
    },
    // 检测用户名
    regUserName(val) {
      return /^[\u4E00-\u9FA5]{2,4}$/.test(val);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getList();
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
<style  scoped>
/* //@import url(); 引入公共css类 */
.mail-list {
  padding-bottom: 100px;
  box-sizing: border-box;
}
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
}
.gclass{
  background: #75c16d;
}
.rclass{
  background: #E96960;

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
.van-swipe-cell__right .van-button--normal {
  height: 100% !important;
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

.addbtn {
  width: 255px;
}
</style>