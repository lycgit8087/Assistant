<template>
  <div class="Order">
    <!-- :sticky="true" :offset-top="45" -->
    <van-tabs v-model="active" @change="changeActive" >
      
      <van-tab v-for="(item,index) in tabList" :key="index" :title="item.title" :info="item.info">
        <div class="tabListChild">
          <div class="tabListChildEdit">
            <van-search v-model="keyword" class="listsearch" placeholder="请输入搜索关键词" />
            <p class="tabListChildFiler" @click="peopleToggle">
              <span>筛选</span>
              <van-icon name="filter-o" color="#FFA726" />
            </p>
            <van-button type="info" size="small" @click="popupToggle">批量操作</van-button>
          </div>
          <van-pull-refresh
            class="refresh-class"
            v-model="item.refreshing"
            @refresh="onRefresh"
            style="width:100%"
          >
            <van-list
              v-model="item.loading"
              :finished="item.finished"
              finished-text="没有更多了"
              @load="onLoad"
              v-if="item.listData.length!=0"
              class="vlist"
            >
              <div class="listParent">
                <div
                  class="listChild"
                  @click="to_detail(litem.orderid)"
                  v-for="(litem,index) in item.listData"
                  :key="index"
                >
                  <div class="listChildTop">
                    <p>{{litem.goods}}</p>
                    <span :style="'color:'+litem.colorText">{{litem.status_text}}</span>
                  </div>
                  <div class="listChildTime">
                    <p>下单时间：{{litem.time}}</p>
                  </div>
                  <div class="listChildDes">
                    <div class="listChildDesLeft">
                      <p v-if="litem.uname">
                        <van-icon :name="litem.uavatar" />
                        <span>{{litem.uname}}</span>
                      </p>
                      <span>{{litem.name}}的订单</span>
                    </div>
                    <div class="listChildDesRight"></div>
                  </div>
                </div>
              </div>
            </van-list>

            <van-empty v-if="!isloading&&item.listData.length==0" description="暂无此类数据" />
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 操作弹出层 -->

    <van-popup v-model="popupShow" position="right">
      <div class="popupView">
        <span class="popupView_title">批量操作订单</span>

        <div class="checkall">
          <van-button round type="info" size="mini" @click="checkAll">{{isCheckAll?'反选':'全选'}}</van-button>
          <p>已选择{{checkOrder}}个订单</p>
        </div>
        <div class="popuplistView">
          <van-list>
            <div
              class="popupView_child"
              v-for="(item,index) in decidedList"
              @click="checkSureOrder(index)"
              :key="index"
            >
              <div class="listChildTop">
                <p>{{item.goods}}</p>
                <span style="color:#E96960">待确认</span>
              </div>
              <div class="listChildTime">
                <p>下单时间：{{item.time}}</p>
                <van-icon v-if="item.is_sure" name="checked" color="#E96960" size="20" />

                <van-icon v-else name="passed" size="20" />
              </div>
            </div>
          </van-list>
        </div>

        <!-- 底部操作按钮 -->
        <div class="popupfooter">
          <van-button type="info" class="sureclass" @click="setSure">确定</van-button>
          <van-button type="danger" class="deleclass" @click="delOrder">删除</van-button>
        </div>
      </div>
    </van-popup>

    <!--  选择供应商-->
    <van-popup v-model="peopleShow" position="bottom" closeable>
      <div class="pview">
        <p class="pview_title">请选择供应商</p>
        <!-- 搜索按钮 -->
        <van-search class="poeple_search" v-model="peoplesearch" placeholder="请输入搜索关键词" />
        <div class="allpeople">
          <div class="allpeoplechild" v-for="item in peopleList" :key="item">
            <van-image fit="cover" :src="item.avatar" />
            <div class="allpeoplechild_right">
              <p class="allpeoplechild_right_des">
                <span>{{item.name}}</span>
                <span>{{item.mobile}}</span>
              </p>
              <!-- 下单链接 -->
              <van-cell-group>
                <van-cell :title="litem.name" v-for="(litem,lindex) in item.link_data" :key="lindex" >
                  <template #right-icon>
                    <div class="iconview">
                      <van-icon name="search" class="search=icon" />
                    </div>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
          </div>

          <van-button type="info">确定</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import util from "../../utils/util";

export default {
  name: "Order",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      date: "",
      popupShow: false,
      keyword: "",
      active: 0,
      peoplesearch: "",
      isloading: false,
      type_arr: [
        { text: "待确认", color: "#E96960", type: 0 },
        { text: "待发货", color: "#FFA726", type: 1 },
        { text: "已发货", color: "#E96960", type: 2 },
        { text: "已签收", color: "#75C16D", type: 3 },
      ],
      tabList: [
        {
          title: "全部",
          type: "0,1,2,3",
          listData: [],
          pageNum: 1,
          finished: false,
          loading: true,
          info: "",
          refreshing: false,
        },
        {
          title: "待确认",
          type: "0",
          listData: [],
          pageNum: 1,
          finished: true,
          loading: true,
          info: "",
          refreshing: false,
        },
        {
          title: "待发货",
          type: "1",
          listData: [],
          pageNum: 1,
          finished: false,
          loading: true,
          info: "",
          refreshing: false,
        },
        {
          title: "已发货",
          type: "2",
          listData: [],
          pageNum: 1,
          finished: false,
          loading: true,
          info: "",
          refreshing: false,
        },
        {
          title: "已签收",
          type: "3",
          listData: [],
          pageNum: 1,
          finished: false,
          loading: true,
          info: "",
          refreshing: false,
        },
      ],
      tabValue: 0,
      peopleShow: false,
      decidedList: [], //待确定列表
      decidedPageNum: 1,
      agetnName:"",//代理商名称
      peopleList:[]//筛选列表
    };
  },
  created() {
    this.getList();
  },
  computed: {
    checkOrder() {
      let arr = this.decidedList.filter((item) => item.is_sure);
      return arr.length;
    },
    // 是否全选
    isCheckAll() {
      let { decidedList } = this;
      let arr = this.decidedList.filter((item) => item.is_sure);

      return decidedList.length == arr.length;
    },
  },

  watch: {
    keyword(val) {
      this.debounce(this);
    },
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },

    // 防抖
    debounce: util.debounce((vm) => {
      // do something，这里this不指向Vue实例,用vm传入
      vm.tabList[vm.active].pageNum = 1;
      vm.getList();
    }, 500),

    // 切换tab
    changeActive() {
      let { tabList, active } = this;
      if (tabList[active].listData.length == 0) {
        this.getList();
      }
    },

    // 获取代理商列表
    getAgentDetail(){
      let {agetnName,peopleList}=this
      this.$api.agent.list({
        is_link:1,
        name:agetnName
      }).then(res=>{
        let list=res.data
        peopleList=[]
        this.peopleList=list
        console.log(res)
      })
    },

    // 订单列表
    getList() {
      let { keyword, tabList, active, type_arr } = this;
      this.isloading = true;
      this.$api.order
        .list({
          keyword: keyword,
          status: tabList[active].type,
          page: tabList[active].pageNum,
        })
        .then((res) => {
          let list = res.data;
          list.forEach((item) => {
            let num = type_arr.findIndex((titem) => titem.type == status);
            item.colorText = type_arr[num].color;
          });
          if(tabList[active].pageNum==1)tabList[active].listData=[]
          this.tabList[active].listData =[...tabList[active].listData,...list];
          this.tabList[active].refreshing = false;
          this.tabList[active].info=this.tabList[active].listData.length==0?'':this.tabList[active].listData.length

          if (list.length < 10) {
            this.tabList[active].finished = true;
          }
          this.isloading = false;
        });
    },

    // 加载更多
    onLoad() {
      let { tabList, active, type_arr } = this;
      this.tabList[active].pageNum = tabList[active].pageNum + 1;
      this.getList();
    },
    // 下拉刷新
    onRefresh() {
      let { tabList, active, type_arr } = this;
      this.tabList[active].pageNum = 1;
      this.getList();
    },

    checkSureOrder(index) {
      let { decidedList, decidedPageNum } = this;
      this.decidedList[index].is_sure = !decidedList[index].is_sure;
    },

    // 获取确定订单
    getSureList() {
      let { decidedList, decidedPageNum } = this;
      this.$api.order
        .list({
          status: 0,
          page: decidedPageNum,
        })
        .then((res) => {
          if (decidedPageNum == 1) decidedList = [];
          let list = res.data;
          list.forEach((item) => {
            item.is_sure = false;
          });
          this.decidedList = [...decidedList, ...list];
          console.log(res);
        });
    },
    //全选
    checkAll() {
      let { decidedList, decidedPageNum } = this;
      let arr = decidedList.filter((item) => item.is_sure == false);

      decidedList.forEach((item) => {
        item.is_sure = arr.length == 0 ? false : true;
      });
    },

    //确认订单
    setSure() {
      let { decidedList } = this;
      let orderArr = decidedList.filter((item) => item.is_sure == true);
      if(orderArr.length==0){
        this.$Toast('请选择待确定订单');
        return
      }
      let orderId = orderArr.map((item) => item.orderid);
      this.$api.order
        .edit({
          type: 1,
          orderid: orderId.join(","),
        })
        .then((res) => {
          this.$Toast.success("已确认");
          this.decidedPageNum = 1;
          this.getSureList();
        });
    },
    //删除订单
    delOrder() {
      let { decidedList } = this;
      let orderArr = decidedList.filter((item) => item.is_sure == true);
      if(orderArr.length==0){
        this.$Toast('请选择待确定订单');
        return
      }
      let orderId = orderArr.map((item) => item.orderid);

      this.$Dialog
        .confirm({
          message: "确定删除吗？",
        })
        .then(() => {
          this.$api.order
            .del({
              orderid: orderId.join(","),
            })
            .then((res) => {
              console.log(res);
              this.$Toast.success("删除成功");
              this.decidedPageNum = 1;
              this.getSureList();
            });
        })
        .catch(() => {});
    },
    // 批量确定弹出框显示
    popupToggle() {
      let { popupShow } = this;
      console.log(popupShow);
      if (!popupShow) {
        this.getSureList();
      }
      this.popupShow = !popupShow;
    },

    // 跳转订单详情
    to_detail(orderid) {
      this.$router.push({
        name: "order-detail",
        query: { orderid: orderid },
      });
    },

    //筛选
    peopleToggle() {
      this.peopleShow = !this.peopleShow;
      this.getAgentDetail()
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  >
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
  justify-content: space-between;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
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
  height: 24px;
  background: rgba(39, 60, 85, 0.2);
  border-radius: 3px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 12px;
  margin-right: 8px;
  padding: 0 5px;
  box-sizing: border-box;
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
.refresh-class {
  height: 100%;
}
.checkall {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 9px;
}
.checkall > p {
  font-size: 12px;
  font-weight: 400;
  color: #202020;
}
.popupfooter {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
}
.sureclass {
  width: 193px;
}
.deleclass {
  width: 90px;
}
.pview {
  width: 100%;
  max-height: 590px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
}
.pview_title {
  font-size: 14px;
  font-weight: 400;
  color: #bdbdbd;
  margin-bottom: 10px;
}
.poeple_search {
  padding: 0;
  margin-bottom: 20px;
}
.listsearch {
  flex: 1;
  padding-left: 0;
  padding-right: 0;
}
.allpeople {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.allpeoplechild {
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
}
.allpeoplechild .van-image {
  width: 44px;
  height: 44px;
  border-radius: 11px;
  margin-right: 16px;
}
.allpeoplechild_right {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.vlist {
  padding-bottom: 80px;
}
.allpeoplechild_right_des {
  height: 44px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.allpeoplechild_right_des span:nth-child(1) {
  font-size: 14px;
  font-weight: 600;
  color: #202020;
  margin-bottom: 2px;
}
.allpeoplechild_right_des span:nth-child(2) {
  font-size: 12px;
  font-weight: 600;
  color: #707070;
}
.cellclass {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
