<template>
  <div class="Order">
    <!-- :sticky="true" :offset-top="45" -->
    <van-nav-bar
      title="订单"
      :fixed="true"
      placeholder
      right-text="导出"
      @click-right="rightClick"
    ></van-nav-bar>

    <van-tabs v-model="active" @change="changeActive">
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.title"
        :info="item.info"
      >
        <div class="tabListChild">
          <div class="tabListChildEdit">
            <van-search
              v-model="keyword"
              class="listsearch"
              placeholder="请输入搜索关键词"
            />
            <p
              v-if="identity != 0"
              class="tabListChildFiler"
              @click="peopleToggle(0)"
            >
              <span>筛选</span>
              <van-icon
                name="filter-o"
                :color="isFilter ? '#FFA726' : '#323233'"
              />
            </p>
            <van-button
              v-if="identity != 0"
              type="info"
              size="small"
              @click="popupToggle"
              >批量操作</van-button
            >
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
              v-if="item.listData.length != 0"
              class="vlist"
            >
              <div class="listParent">
                <div
                  class="listChild"
                  @click="to_detail(litem.orderid)"
                  v-for="(litem, index) in item.listData"
                  :key="index"
                >
                  <div class="listChildTop">
                    <p>{{ litem.goods }}</p>
                    <span :style="'color:' + litem.colorText">{{
                      litem.status_text
                    }}</span>
                  </div>
                  <div class="listChildTime">
                    <p>下单时间：{{ litem.time }}</p>
                  </div>
                  <div class="listChildDes">
                    <div class="listChildDesLeft">
                      <p v-if="litem.uname">
                        <van-icon :name="litem.uavatar" />
                        <span>{{ litem.uname }}</span>
                      </p>
                      <span>{{ litem.name }}的订单</span>
                    </div>
                    <div class="listChildDesRight"></div>
                  </div>
                </div>
              </div>
            </van-list>

            <van-empty
              v-if="!isloading && item.listData.length == 0"
              description="暂无数据"
            />
          </van-pull-refresh>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 操作弹出层 -->

    <van-popup v-model="popupShow" position="right">
      <div class="popupView">
        <span class="popupView_title">批量操作订单</span>

        <div class="checkall">
          <van-button round type="info" size="mini" @click="checkAll">{{
            isCheckAll ? "反选" : "全选"
          }}</van-button>
          <p>已选择{{ checkOrder }}个订单</p>
        </div>
        <div class="popuplistView" v-if="decidedList.length != 0">
          <van-list>
            <div
              class="popupView_child"
              v-for="(item, index) in decidedList"
              @click="checkSureOrder(index)"
              :key="index"
            >
              <div class="listChildTop">
                <p>{{ item.goods }}</p>
                <span style="color:#E96960">待确认</span>
              </div>
              <div class="listChildTime">
                <p>下单时间：{{ item.time }}</p>
                <van-icon
                  v-if="item.is_sure"
                  name="checked"
                  color="#E96960"
                  size="20"
                />

                <van-icon v-else name="passed" size="20" />
              </div>
            </div>
          </van-list>
        </div>

        <van-empty v-else description="暂无待确定订单" />

        <!-- 底部操作按钮 -->
        <div class="popupfooter" v-if="decidedList.length != 0">
          <van-button type="info" class="sureclass" @click="peopleToggle(1)"
            >确定</van-button
          >
          <van-button type="danger" class="deleclass" @click="delOrder"
            >删除</van-button
          >
        </div>
      </div>
    </van-popup>

    <!--  选择供应商-->
    <van-popup v-model="peopleShow" position="bottom" closeable>
      <div class="pview">
        <p class="pview_title">
          {{ btnType == 1 ? "请选择供应商" : "请选择代理商" }}
        </p>
        <!-- 搜索按钮 -->
        <van-search
          class="poeple_search"
          v-model="peoplesearch"
          placeholder="请输入搜索关键词"
        />
        <div class="allpeople">
          <div
            class="allpeoplechild"
            v-for="(item, index) in peopleList"
            :key="index"
          >
            <van-image fit="cover" :src="item.avatar" />
            <div class="allpeoplechild_right">
              <p class="allpeoplechild_right_des">
                <span>{{ item.name }}</span>
                <span>{{ item.mobile }}</span>
              </p>
              <!-- 下单链接 -->
              <van-cell-group>
                <van-cell
                  :title="litem.name"
                  v-for="(litem, lindex) in item.link_data"
                  :key="lindex"
                  @click="agentCheck(index, lindex)"
                >
                  <template #right-icon>
                    <div class="iconview">
                      <van-icon
                        v-if="litem.isCheck"
                        name="checked"
                        color="#E96960"
                        size="20"
                      />

                      <van-icon v-else name="passed" size="20" />
                    </div>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
          </div>

          <van-button
            v-if="peopleList.length != 0"
            type="info"
            @click="sureAgentCheck"
            >确定</van-button
          >
        </div>
      </div>
    </van-popup>

    <!-- 右侧固定按钮 -->

    <div class="fix-right" v-if="bthArr.length != 1">
      <div class="fix-right-child">
        <div
          :class="[item.cls, index == btnNum ? 'active-bth' : '']"
          v-for="(item, index) in bthArr"
          @click="checkBtn(item.type, index)"
        >
          {{ item.text }}
        </div>
      </div>
    </div>

    <!-- 右侧导出 -->
    <van-popup v-model="rightShow" position="right">
      <div class="export-view">
        <p class="export-title">导出筛选</p>

        <!-- 选择用户类型· -->
        <div class="export-child">
          <span>用户订单类型</span>
          <div class="export-child-btn">
            <van-button
              @click="userBtnClick(index)"
              v-for="(item, index) in userTypeArr"
              :key="index"
              :type="userTypeIndex == index ? 'info' : 'default'"
              >{{ item.text }}</van-button
            >
          </div>
        </div>
        <!-- 选择时间 -->
        <div class="export-child">
          <span>时间区间</span>
          <div class="time-view" @click="timeShow = true">
            <van-button round size="small">{{
              date.length == 0 ? "开始时间" : dateTimeObj.start
            }}</van-button>
            <span class="longspan"></span>
            <van-button round size="small">{{
              date.length == 0 ? "结束时间" : dateTimeObj.end
            }}</van-button>
          </div>
        </div>

        <!-- 订单状态 -->
        <div class="export-child">
          <span>订单状态</span>
          <div class="export-child-btn">
            <van-button
              @click="orderTypeClick(index)"
              v-for="(item, index) in orderTypeArr"
              :key="index"
              :type="item.isCheck ? 'info' : 'default'"
              >{{ item.text }}</van-button
            >
          </div>
        </div>

        <van-button class="order-btn" type="info" @click="orderExport"
          >导出订单</van-button
        >
      </div>
    </van-popup>

    <van-calendar
      v-model="timeShow"
      :show-subtitle="false"
      :min-date="minDate"
      :max-date="maxDate"
      type="range"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import util from "../../utils/util";

export default {
  name: "Order",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      identity: 0,
      date: "",
      popupShow: false,
      btnType: 0,
      keyword: "",
      active: 0,
      peoplesearch: "",
      isloading: false,
      btnNum: 0,
      minDate: new Date(2008, 1, 1),
      maxDate: new Date(2050, 6, 31),
      bthArr: [
        { text: "购买的订单", cls: "onebth", type: 0 },
        { text: "代理的订单", cls: "twobth", type: 1 },
        { text: "供货的订单", cls: "therebth", type: 2 },
      ],
      type_arr: [
        { text: "待确认", color: "#E96960", type: 0 },
        { text: "待发货", color: "#FFA726", type: 1 },
        { text: "已发货", color: "#E96960", type: 2 },
        { text: "已签收", color: "#75C16D", type: 6 },
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
          type: "6",
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
      agetnName: "", //代理商名称
      peopleList: [], //筛选列表
      oldPeopleList: [],
      ltagArr: [],
      rightShow: false,
      userTypeArr: [
        { text: "我代理的订单", type: 1 },
        { text: "我供应的订单", type: 2 },
      ],
      userTypeIndex: 0,
      date: "",
      timeShow: false,
      orderTypeArr: [
        // { text: "全部", isCheck: false, type: "0,1,2" },
        { text: "待发货", isCheck: false, type: "0" },
        { text: "已发货", isCheck: false, type: "1" },
        { text: "已签收", isCheck: false, type: "2" },
      ],
      dateTimeObj: {},
      filterNum: 0, //0 筛选 1 确认订单
    };
  },
  created() {

    if (JSON.stringify(this.$store.state.userInfo) != "{}") {
      console.log(this.$store.state.userInfo);
      let { identity } = this.$store.state.userInfo;
      this.setBtnData(identity);
      this.getList();
    } else {
      this.getInfo();
    }
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
    isFilter() {
      let { ltagArr } = this;
      return ltagArr.length > 0;
    },
  },

  watch: {
    keyword(val) {
      this.debounce(this);
    },
    peoplesearch(val) {
      this.pupupDebounce(this);
    },
  },
  methods: {
    getInfo() {
      this.$api.user.userInfo().then((res) => {
        this.$store.dispatch("USER_INFO", res.data);
        let identity = res.data.identity;
        this.setBtnData(identity);
        this.getList();
      });
    },

    formatDate(date) {
      return `${date.getFullYear() - 1}/${date.getMonth() +
        1}/${date.getDate()}`;
    },

    onConfirm(date) {
      let [start, end] = date;
      this.timeShow = false;
      this.date = `${this.formatDate(start)} - ${this.formatDate(end)}`;
      this.dateTimeObj = {
        start: this.formatDate(start),
        end: this.formatDate(end),
      };
    },
    // 设置右侧显示的状态
    setBtnData(identity) {
      let { btnNum, bthArr, btnType } = this;
      bthArr =
        identity == 3
          ? bthArr
          : bthArr.filter((item) => item.type == identity || item.type == 0);
      btnNum =
        identity == 3 ? 2 : bthArr.findIndex((item) => item.type == identity);
      btnType = identity == 3 ? 2 : bthArr[identity].type;
      this.btnNum = btnNum;
      this.btnType = btnType;
      this.bthArr = bthArr;
      this.identity = identity;
    },

    rightClick() {
      let { btnType, userTypeIndex } = this;
      userTypeIndex = btnType == 3 || btnType == 2 ? 1 : 0;
      this.userTypeIndex = userTypeIndex;
      this.rightShow = true;
    },
    // 订单状态选择
    orderTypeClick(index) {
      let { orderTypeArr } = this;
      this.orderTypeArr[index].isCheck = !orderTypeArr[index].isCheck;
    },

    // 防抖
    debounce: util.debounce((vm) => {
      // do something，这里this不指向Vue实例,用vm传入
      vm.tabList[vm.active].pageNum = 1;
      vm.getList();
    }, 1000),
    pupupDebounce: util.debounce((vm) => {
      // do something，这里this不指向Vue实例,用vm传入
      vm.searchPopup();
    }, 1000),

    // 切换tab
    changeActive() {
      let { tabList, active } = this;
      if (tabList[active].listData.length == 0) {
        this.getList();
      }
    },
    // 选择身份
    checkBtn(type, index) {
      let { bthArr, tabList } = this;
      this.btnNum = index;
      this.btnType = type;
      tabList.forEach((item) => {
        item.pageNum = 1;
        item.info = "";
        item.listData = [];
        item.finished = false;
      });
      this.tabList = tabList;
      this.getList();
    },

    //筛选
    peopleToggle(index) {
      let { btnType, decidedList } = this;
      let orderArr = decidedList.filter((item) => item.is_sure == true);
      if (orderArr.length == 0 && index == 1) {
        this.$Toast("请选择待确定订单");
        return;
      }
      if (btnType == 1) {
        this.getSupplierList();
      } else {
        this.getAgentDetail();
      }
      this.filterNum = index;
      this.peopleShow = !this.peopleShow;
    },

    // 搜索供应商或代理商
    searchPopup() {
      let { peopleList, peoplesearch, oldPeopleList } = this;
      if (peoplesearch.length != 0) {
        this.peopleList = peopleList.filter(
          (item) => item.name.indexOf(peoplesearch) != -1
        );
      } else {
        this.peopleList = oldPeopleList;
      }
    },
    // 获取供应商列表
    getSupplierList() {
      let { peopleList, peoplesearch } = this;
      this.$api.supplier
        .list({
          name: peoplesearch,
        })
        .then((res) => {
          let list = res.data;
          list.forEach((item) => {
            item.link_data.forEach((litem) => {
              litem.isCheck = false;
            });
          });
          this.peopleList = list;
          this.oldPeopleList = list;
        });
    },

    // 用户类型选择
    userBtnClick(index) {
      this.userTypeIndex = index;
    },

    // 获取代理商列表
    getAgentDetail() {
      let { agetnName, peopleList } = this;
      if (peopleList.length != 0) return;
      this.$api.agent
        .list({
          is_link: 1,
          name: agetnName,
        })
        .then((res) => {
          let list = res.data;
          peopleList = [];
          list.forEach((item) => {
            item.link_data.forEach((litem) => {
              litem.isCheck = false;
            });
          });
          this.peopleList = list;
          this.oldPeopleList = list;
        });
    },
    // 选择代理商或供应商
    agentCheck(index, lindex) {
      let { peopleList, filterNum } = this;
      console.log(filterNum);
      if (filterNum == 0) {
        this.peopleList[index].link_data[lindex].isCheck = !peopleList[index]
          .link_data[lindex].isCheck;
      } else {
        peopleList.forEach((item, index) => {
          item.link_data.forEach((fitem) => {
            fitem.isCheck = false;
          });
        });
        peopleList[index].link_data[lindex].isCheck = !peopleList[index]
          .link_data[lindex].isCheck;
        this.peopleList = peopleList;
      }
    },
    // 导出订单

    orderExport() {
      let {
        userTypeArr,
        orderTypeArr,
        userTypeIndex,
        dateTimeObj,
        date,
      } = this;

      let orderIdArr = [];
      orderTypeArr.forEach((item) => {
        if (item.isCheck) {
          orderIdArr.push(item.type);
        }
      });
      if (date.length == 0) {
        this.$Toast("请选择起止时间");
        return;
      }
      if (orderIdArr.length == 0) {
        this.$Toast("请选择要导出的订单类型");
        return;
      }
      this.$api.order
        .orderExport({
          utype: userTypeArr[userTypeIndex].type,
          status: orderIdArr.join(","),
          start_time: dateTimeObj.start,
          end_time: dateTimeObj.end,
        })
        .then((res) => {
          console.log(res.data);
          var a = document.createElement("a");
          a.target = "_self";
          a.href = res.data;
          a.click();
        });
    },

    // 确定选择代理商或供应商
    sureAgentCheck() {
      let { peopleList, filterNum } = this;
      let { ltagArr } = this;
      if (filterNum == 0) {
        ltagArr = [];
        peopleList.forEach((item) => {
          item.link_data.forEach((litem) => {
            if (litem.isCheck) {
              ltagArr.push(litem.ltag);
            }
          });
        });
        this.ltagArr = ltagArr;
        this.peopleShow = false;
        this.getList();
      } else {
        this.setSure();
      }
    },

    // 订单列表
    getList() {
      let { keyword, tabList, active, type_arr, btnType, ltagArr } = this;
      this.isloading = true;
      this.$api.order
        .list({
          type: btnType,
          keyword: keyword,
          status: tabList[active].type,
          page: tabList[active].pageNum,
          ltag: ltagArr.join(","),
        })
        .then((res) => {
          let list = res.data;
          list.forEach((item) => {
            let num = type_arr.findIndex((titem) => titem.type == item.status);
            item.colorText = type_arr[num].color;
          });
          if (tabList[active].pageNum == 1) tabList[active].listData = [];
          this.tabList[active].listData = [
            ...tabList[active].listData,
            ...list,
          ];
          this.tabList[active].refreshing = false;
          this.tabList[active].info =
            this.tabList[active].listData.length == 0
              ? ""
              : this.tabList[active].listData.length;

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
      let { decidedList, decidedPageNum, btnType } = this;
      this.$api.order
        .list({
          type: btnType,
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
      let { decidedList, peopleList } = this;
      let orderArr = decidedList.filter((item) => item.is_sure == true);
      let orderId = orderArr.map((item) => item.orderid);
      let ltag = [];
      peopleList.forEach((item) => {
        item.link_data.forEach((litem) => {
          if (litem.isCheck) {
            ltag.push(litem.ltag);
          }
        });
      });
      this.$api.order
        .edit({
          type: 1,
          orderid: orderId.join(","),
          ltag: ltag.join(","),
        })
        .then((res) => {
          this.$Notify({ type: 'success', message: '订单已确认' });
          this.decidedPageNum = 1;
          this.peopleShow = false;
          this.decidedList = decidedList.filter(
            (item) => item.is_sure == false
          );
          this.getSureList();
        });
    },
    //删除订单
    delOrder() {
      let { decidedList } = this;
      let orderArr = decidedList.filter((item) => item.is_sure == true);
      if (orderArr.length == 0) {
        this.$Toast("请选择待确定订单");
        return;
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
              this.$Notify({ type: 'success', message: '删除成功' });
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
.export-child .van-cell {
  padding: 10px 0;
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

.fix-right {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 40vh;
  right: 0;
  z-index: 55;
  width: 90px;
}
.fix-right-child {
  position: relative;
}
.fix-right-child > div {
  width: 90px;
  height: 30px;
  font-size: 12px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  color: #fff;
  background: cornflowerblue;
  margin-bottom: 10px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  animation: all 500ms ease;
  right: -55%;
  position: absolute;
  opacity: 0.4;
}
.active-bth {
  right: -10% !important;
  opacity: 1 !important;
}
.onebth {
  top: 0;
}
.twobth {
  top: 40px;
}
.therebth {
  top: 80px;
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
.longspan {
  display: flex;
  width: 30px;
  height: 2px;
  background: #202020;
  margin: 0 10px;
}
.sureclass {
  width: 193px;
}
.deleclass {
  width: 90px;
}
.pview {
  width: 100%;
  max-height: 80vh;
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
  margin-bottom: 10px;
  padding: 10px 0;
}
.allpeoplechild > .van-image {
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
.export-view {
  width: 80vw;
  height: 100vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.export-title {
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #202020;
  margin-bottom: 26px;
  margin-top: 40px;
}
.export-child {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 15px;
}
.export-child > span {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #878b94;
  margin-bottom: 10px;
}
.export-child-btn {
  display: flex;
  flex-wrap: wrap;
}
.export-child-btn > button {
  margin-right: 10px;
  margin-bottom: 10px;
}
.order-btn {
  width: 193px;
  margin-top: 200px;
}
.time-view {
  display: flex;
  align-items: center;
}
</style>
