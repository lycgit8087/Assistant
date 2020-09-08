<template>
  <div class="order-edit">
    <van-nav-bar title="下单渠道" left-arrow @click-left="backTo" :fixed="true" placeholder />

    <van-form validate-first @submit="addAgent">
      <!-- 智能识别地址 -->
      <div class="place_text">
        <span>地址智能识别</span>
        <p>自动识别</p>
      </div>
      <div class="borderView">
        <van-field
          v-model="placeText"
          rows="3"
          autosize
          :border="false"
          type="textarea"
          placeholder="复制文字自动识别，如：陈靖如  18578784506  广州市天河区育新街89号天佑小区5栋301"
        />
      </div>

      <!-- 商品名称 -->
      <div class="edit_title">
        <van-image fit="cover" :src="red_icon" />
        <span>商品名称</span>
      </div>
      <div class="borderView">
        <van-field v-model="shopname" :rules="[{ validator:this.$util.textValidator, message: '请输入商品名称规格等信息' }]"  :border="false" placeholder="请输入商品名称规格等信息" />
      </div>

      <!-- 收件人 -->
      <div class="edit_title">
        <van-image fit="cover" :src="red_icon" />
        <span>收件人</span>
      </div>
      <div class="borderView">
        <van-field v-model="username" :rules="[{ validator:this.$util.userNameValidator, message: '请输入两位数以上中文收件人名字' }]" :border="false"  placeholder="请输入收件人名字" />
      </div>

      <!-- 收件人 -->
      <div class="edit_title">
        <van-image fit="cover" :src="red_icon" />
        <span>联系方式</span>
      </div>
      <div class="borderView">
        <van-field v-model="phone" :border="false" placeholder="请输入联系方式" maxlength="11" :rules="[{ validator:this.$util.phoneValidator, message: '请填写11位有效手机号码' }]" />
      </div>

      <!-- 收件人 -->
      <div class="edit_title">
        <van-image fit="cover" :src="red_icon" />
        <span>收货地址</span>
      </div>

      <div class="borderView">
        <van-field readonly clickable name="area" :value="areaValue" :rules="[{ validator:this.$util.textValidator, message: '请填写省市区' }]"  placeholder="点击选择省市区" @click="showArea = true" :border="false"  />
      </div>

      <!-- 详细地址 -->
      <div class="borderView mt10">
        <van-field v-model="placeDetail" :rules="[{ validator:this.$util.textValidator, message: '请填写详细地址' }]" :border="false" placeholder="详细地址" />
      </div>

      <!-- 收件人 -->
      <div class="edit_title">
        <span>订单备注</span>
      </div>

       <div class="borderView">
        <van-field
          v-model="message"
          rows="3"
          autosize
          :border="false"
          type="textarea"
          placeholder="请输入订单备注信息（选填）"
        />
      </div>

      
      <van-popup v-model="showArea"  position="bottom">
        <van-area :area-list="areaList" @confirm="onConfirm" :value="defaultPlace" @cancel="showArea = false" />
      </van-popup>

      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交订单</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import AreaList from  "../../assets/js/area"
import {mixin} from "../../mixin/mixin"
import util from "../../utils/util";
  
export default {
  name: "order-edit",
   mixins:[mixin],

  data() {
    return {
      value1: "",
      pattern: /\d{6}/,
      areaValue:"",
      message: "",
      phone:"",
      username: "",
      red_icon: require("../../assets/images/required.png"),
      showArea:false,
      areaList: AreaList,
      defaultPlace:"",
      placeText:"",
      shopname:"",
      placeDetail:""
    };
  },
   //监控data中的数据变化
  watch: {
    placeText(val) {
      if(val.length==0)return
      this.debounce(this);
    },
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onLoad() {},
    popupToggle() {
      let { popupShow } = this;
      this.popupShow = !popupShow;
    },
     onConfirm(values) {
       console.log(values)
      this.areaValue = values.map((item) => item.name).join('/');
      this.showArea = false;
    },

    // 切换地址显示
    placeToggle(){
      let {placeShow}=this
      this.placeShow=!placeShow
    },
    // 添加下单链接
    addAgent() {
      let {ltag,placeDetail,shopname,placeText,username,phone,areaValue}=this
      this.$api.order.online({
        ltag:ltag
      }).then(res=>{
        console.log(res)
      })


    },

    // 智能识别地址
    addrClean(){
      let {placeText}=this
      this.$api.order.addrClean({
        text:placeText
      }).then(res=>{
        if(res.data.length){
           let placeData=res.data[0]
            this.phone=placeData.mobile
            this.placeDetail=placeData.detail
            this.username=placeData.name
            this.message=placeData.notes
            this.defaultPlace=`${placeData.province_code},${placeData.city_code},${placeData.area_name}`
            this.areaValue=`${placeData.province_name}/${placeData.city_name}/${placeData.area_name}`

        }
      })

    },

      // 防抖
    debounce: util.debounce((vm) => {
      // do something，这里this不指向Vue实例,用vm传入
      vm.addrClean();
    }, 1000),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* @import url('../../assets/index.css'); */
html {
  background: #fff;
}
.order-edit {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px 20px;
  box-sizing: border-box;
}

.place_text {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 17px;
}
.place_text > span {
  font-size: 14px;
  font-weight: 400;
  color: #202020;
}
.place_text > p {
  width: 64px;
  height: 24px;
  background: #e96960;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
}
.borderView {
  border: 1px solid #e9e9e9;
}
.edit_title {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 400;
  color: #202020;
   margin: 15px 0;
}
.edit_title .van-image {
  width: 16px;
  height: 16px;
  margin-right: 5px;
 
}
</style>
