<template>
  <div class="Order">
    <van-tabs v-model="active">
      <!-- :sticky="true" :offset-top="50" -->
      <van-tab v-for="(item,index) in tabList" :key="index" :title="item.title" badge="1">
        <div class="tabListChild">
          <div class="tabListChildEdit">
            <van-search v-model="value" placeholder="请输入搜索关键词" />
            <p class="tabListChildFiler">
              <span>筛选</span>
              <van-icon name="filter-o" color="#FFA726" />
            </p>
            <van-button type="info" size="small" @click="popupToggle">批量操作</van-button>
          </div>
          <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="width:100%">
            <van-list
              v-model="item.loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad"
            >
              <div class="listParent">
                <div class="listChild" @click="to_detail"  >
                  <div class="listChildTop">
                    <p>高山铁观音新茶安溪铁观音茶叶清香型500g礼盒装</p>
                    <span>待确认</span>
                  </div>
                  <div class="listChildTime">
                    <p>下单时间：2020/08/16 09:35</p>
                  </div>
                  <div class="listChildDes">
                    <div class="listChildDesLeft">
                      <p>
                        <van-icon name="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
                        <span>王要疯疯</span>
                      </p>
                      <span>王耀峰的订单</span>
                    </div>
                    <div class="listChildDesRight"></div>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 弹出层 -->

    <van-popup v-model="popupShow" position="right">
      <div class="popupView">
        <span class="popupView_title">批量操作订单</span>

        <div class="checkall" >

            <van-button round type="info" size="mini" >全选</van-button>
            <p>已选择2个订单</p>
        </div>
        <div class="popuplistView">
          <van-list>
            <div class="popupView_child" v-for="(item,index) in 9" :key="index">
              <div class="listChildTop">
                <p>高山铁观音新茶安溪铁观音茶叶清香型500g礼盒装</p>
                <span>待确认</span>
              </div>
              <div class="listChildTime">
                <p>下单时间：2020/08/16 09:35</p>
                <!-- <van-icon name="passed"  size="20"/> -->
                <van-icon name="checked" color="#E96960" size="20" />
              </div>
            </div>
          </van-list>
        </div>

        <!-- 底部操作按钮 -->
        <div class="popupfooter" >
            <van-button type="info">确定</van-button>
            <van-button type="danger">删除</van-button>

        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: "Order",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      date: "",
      popupShow: false,
      value: "",
      active: 0,
      refreshing: false,
      type_arr: [
        { text: "待确定", color: "#E96960", type: 0 },
        { text: "待发货", color: "#FFA726", type: 0 },
        { text: "已发货", color: "#E96960", type: 0 },
        { text: "待确定", color: "#75C16D", type: 0 }
      ],
      tabList: [
        {
          title: "全部",
          type: 0,
          listData: [],
          pageNum: 1,
          finished: false,
          loading: true
        },
        {
          title: "待确认",
          type: 0,
          listData: [],
          pageNum: 1,
          finished: true,
          loading: true
        },
        {
          title: "待发货",
          type: 0,
          listData: [],
          pageNum: 1,
          finished: false,
          loading: true
        },
        {
          title: "已发货",
          type: 0,
          listData: [],
          pageNum: 1,
          finished: false,
          loading: true
        },
        {
          title: "已签收",
          type: 0,
          listData: [],
          pageNum: 1,
          finished: false,
          loading: true
        }
      ],
      tabValue: 0
    };
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
    to_detail(){
        console.log(111)
         this.$router.push({
        name: "order-detail",
      });
    },
    onRefresh() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.tabListChild {
  display: flex;
  align-items: center;
}
.popuplistView {
    display: flex;
    flex-direction: column;
    align-items: center;
  height: 80vh;
  overflow-y: scroll;
  margin-bottom: 30px;
  width: 100%;
}
.ListView {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.tabListChild {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 40rpx;
  box-sizing: border-box;
  align-items: center;
}
.tabListChildEdit {
  width: 100%;
  display: flex;
  align-items: center;
  background: #fff;
}
.popupView {
  min-width: 90vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  align-items: center;
}
.listChild {
  width: 100%;
  min-height: 102px;
  background: #ffffff;
  box-shadow: 0px 10px 50px 2px rgba(55, 58, 64, 0.14);
  border-radius: 10px;
  margin-top: 20px;
  padding: 15px;
  box-sizing: border-box;
}
.listParent {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.listChildTop {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 11px;
}
.listChildTop > p:nth-child(1) {
  font-size: 16px;
  font-weight: 400;
  color: #202020;
  width: 200px;
  display: flex;
  flex-wrap: wrap;
}
.listChildTop > span {
  font-size: 12px;
  font-weight: 400;
  color: #e96960;
}
.listChildTime {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 400;
  color: #7a7a7a;
  margin-bottom: 10px;
  justify-content: space-between;
}
.listChildDes {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.listChildDesLeft {
  display: flex;
  align-items: center;
}
.listChildDesLeft > p {
  width: 89px;
  height: 24px;
  background: rgba(39, 60, 85, 0.2);
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 12px;
  margin-right: 8px;
}
.listChildDesLeft > span {
  font-size: 12px;
  font-weight: 500;
  color: #7ebeff;
  text-decoration: underline;
}
.listChildDesLeft > p span {
  margin-left: 5px;
}
.tabListChildFiler {
  font-size: 14px;
  font-weight: 400;
  display: flex;
  align-items: center;
  margin-right: 12px;
  margin-left: 5px;
}
.popupView_title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #202020;
}

.popupView_child {
  width: 100%;
  display: flex;
  flex-direction: column;
  width: 293px;
  height: 102px;
  background: #ffffff;
  box-shadow: 0px 5px 25px 1px rgba(55, 58, 64, 0.14);
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 20px;
}
.checkall{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 9px;
}
.checkall>p{
font-size: 12px;
font-weight: 400;
color: #202020;

}
.popupfooter{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
}
.popupView_child .listChildTop > p {
}
</style>
