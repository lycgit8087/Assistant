<!-- order-detail -->
<template>
  <div class="order-detail">
    <van-nav-bar title="订单详情" left-arrow @click-left="backTo" :fixed="true" placeholder />

    <div class="detail_top">
      <div class="detail_top_des">
        <van-field class="title-field" :readonly="isReadonly" rows="1" autosize type="textarea"  v-model="goods" :border="false"  />
        <span :style="'background:'+color" >{{status_text}}</span>
      </div>
      <p v-if="orderTime" class="detail_top_time">下单时间：{{orderTime}}</p>
    </div>

    <!-- 留言 -->
    <van-field
      :readonly="isReadonly"
      v-model="message"
      border
      rows="1"
      autosize
      label="留言"
      placeholder="留言信息"
      type="textarea"
    />
    <div class="people_des">
      <!-- 收件人信息 -->
      <van-field v-model="name" label="收件人" :readonly="isReadonly" />
      <van-field v-model="phone" label="联系方式" :readonly="isReadonly" />
      <van-field
        v-model="place"
        rows="2"
        autosize
        label="收货地址"
        type="textarea"
        :readonly="isReadonly"
        show-word-limit
      />
    </div>

    <!-- 快递单号 -->
    <van-field v-model="exnumber" :readonly="isReadonly||identity!=2" clearable label="快递单号" placeholder="快递单号" right-icon="scan" />

    <!-- 快递公司 -->

    <van-cell v-if="exnumber"  >
      <template #title>
        <van-tag plain type="primary">{{exTag}}</van-tag>
        <span >{{exName}}</span>
      </template>
    </van-cell>

    <!-- 物流信息 -->
    <van-steps direction="vertical" :active="0">
      <van-step v-for="(item,index) in ex_info" :key="index">
        <p class="info-text">{{item.time}}</p>

        <p class="info-title" v-html="item.remark" ></p>
      </van-step>
    </van-steps>

      <van-button v-if="!isReadonly" class="edit-btn" type="info" @click="orderEdit">保存</van-button>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mixin } from "../../mixin/mixin";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "order-detail",
  components: {},
  mixins: [mixin],
  data() {
    //这里存放数据
    return {
      isReadonly:true,
      message: "", //留言
      place: "", //收件人地址
      name: "", //收件人名字
      phone: "",
      exnumber: "",
      ex_info: [],
      orderid: 0, //商品ID
      goods: "", //商品描述
      status_text: "", //订单状态
      orderTime: "", //订单时间
      color:"",
      type_arr: [
        { text: "待确认", color: "#E96960", type: 0 },
        { text: "待发货", color: "#FFA726", type: 1 },
        { text: "已发货", color: "#E96960", type: 2 },
        { text: "已签收", color: "#75C16D", type: 6 },
      ],
      exName: "",
      exTag: "",
      identity:0,
      status:0
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    exnumber(val) {
      this.expressMatching();
    },
  },
  //方法集合
  methods: {
    getDetail() {
      let { orderid, type_arr ,isReadonly} = this;
      this.$api.order
        .detail({
          orderid: orderid,
        })
        .then((res) => {
          let detail = res.data;
          this.name = detail.name;
          this.place = detail.address;
          this.status_text = detail.status_text;
          this.phone = detail.mobile;
          this.message = detail.notes;
          this.goods = detail.goods;
          this.ex_info = detail.ex_info;
          this.exnumber = detail.exnumber;
          this.c=detail.time
          this.identity=detail.identity
          this.status=detail.status
           
          if(detail.status>1){
            isReadonly=true
          }else{
            if(detail.identity==0){
              isReadonly=true
            }else{
              
              isReadonly=false
            }
          }
          this.isReadonly=isReadonly
          let colorNum=type_arr.findIndex(itme=>itme.type==detail.status)
          let color=colorNum==-1?"#E96960":type_arr[colorNum].color
          
          this.color=color
          detail.ex_info.forEach(item=>{
            item.remark=this.selectPhoneNumber(item.remark)
          })
        });
    },

    // 订单编辑
    orderEdit(){
      let {message,name,phone,place,exnumber,orderid,goods,extag}=this
     
      this.$api.order.edit({
        orderid:orderid,
        name:name,
        mobile:phone,
        goods:goods,
        address:place,
        notes:message,
        exnumber:exnumber,
      }).then(res=>{
          console.log(res)
          this.$Notify({ type: 'success', message: '保存成功' });

      })
    },

    // 匹配快递公司
    expressMatching() {
      let { exnumber } = this;
      this.$api.order
        .expressMatching({
          exnumber: exnumber,
        })
        .then((res) => {
          let listData = res.data;
          if(listData.length){
            listData=listData[0]
            this.exName = listData.name;
            this.exTag = listData.tag;
          }
          
        });
    },
    //替换字符串中的手机号码
    selectPhoneNumber(str) {
    return str= str.replace(/[(（](\d+)[)）]|(1[^012]\d{9})|(0\d{2,3}-?\d{6,8})/g, (a,b,c,d)=>`<a href='tel:${(d||c||b||a)}'>${(d||c||b||a)}</a>` )
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.orderid = this.$route.query.orderid;
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
.info-title{
font-size: 16px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #707070;
line-height: 1.5;

}
.info-text{
font-size: 14px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #707070;
margin-bottom: 10px;

}
.detail_top_des {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}
.dis-class{
  color: #202020;
  font-size: 14px;
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
.edit-btn{
  width: 194px;
  transform: translate(-50%,-0%);
  position: fixed;
  bottom: 20px;
  left: 50%;
}
.title-field{
  font-size: 16px !important;;
  padding: 0 !important;
}
</style>