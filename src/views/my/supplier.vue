<!-- supplier -->
<template>
  <div class="supplier">
    <van-nav-bar left-arrow @click-left="backTo" title="供应商管理" :fixed="true" placeholder />

    <div class="pview nopadding">
      <!-- 搜索按钮 -->
      <van-search class="poeple_search" v-model="searchValue" placeholder="请输入搜索关键词" />
      <div class="allpeople">
        <div v-for="(ditem,dindex) in list" :key="dindex">
          <p class="childTitle">{{ditem.title}}</p>
          <div class="allpeoplechild haspadding" v-for="(item,index) in ditem.data" :key="index">
            <van-image fit="cover" :src="item.avatar" />
            <div class="allpeoplechild_right">
              <p class="allpeoplechild_right_des">
                <span>{{item.name}}</span>
              </p>
              <!-- 下单渠道 -->
              <van-cell-group>
                <van-cell
                  :title="litem.name"
                  title-class="blue-color"
                  v-for="(litem,lindex) in item.link_data"
                  :key="lindex"
                >
                  <template #right-icon>
                    <div class="iconview" @click="openShare">
                      <van-image class="shareCls" fit="cover" :src="shareIcon" />
                      <span>分享</span>
                    </div>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
          </div>
        </div>
      </div>
    </div>

   <van-share-sheet v-model="showShare" title="立即分享给好友" :options="shareOptions" @select="onSelect" />
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mixin } from "../../mixin/mixin";
import util from "../../utils/util";

export default {
  //import引入的组件需要注入到对象中才能使用
  name: "supplier",
  components: {},
  mixins: [mixin],
  data() {
    //这里存放数据
    return {
      searchValue: "",
      list: [],
      shareIcon: require("../../assets/images/shareIcon.png"),
      oldList:[],
      showShare:false
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {
    // 搜索
    searchValue(val) {
      this.debounce(this);
    },
  },
  //方法集合
  methods: {
    goto(name) {
      this.$router.push({ name: name });
    },
    // 处理列表数据
    disposeData(data) {
      let newData = this.$util.filter_identical(data, "first_letter");
      let listData = newData.sort(this.$util.sortBy("title"));
      return listData;
    },

    // 开启分享
    openShare(){
      this.showShare=true
    },
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

    // 防抖
    debounce: util.debounce((vm) => {
      // do something，这里this不指向Vue实例,用vm传入
      vm.searchIt();
    }, 500),
    // 获取数据
    getList() {
      let { supplierList, peoplesearch } = this;
      this.$api.supplier
        .list({
          name: peoplesearch,
        })
        .then((res) => {
          let { data } = res;
          data.forEach((item, index) => {
            item.first_letter = item.first_letter.toUpperCase();
          });
          this.oldList = data;
          let listData = this.disposeData(data);
          console.log(listData);
          this.list = listData;
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getList();
    this.$api.orderLink.linkShareConfig({
      url:'https://network-modules.imofang.cn'
    }).then(res=>{
      console.log(res)
    })
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
html {
  background: #fff !important;
}
.pview {
  width: 100%;
  height: 590px;
  display: flex;
  flex-direction: column;
  padding: 15px;
  box-sizing: border-box;
  background: #fff;
}
.pview_title {
  font-size: 14px;
  font-weight: 400;
  color: #bdbdbd;
  margin-bottom: 10px;
}
.supplier .poeple_search {
  padding: 10px 30px;
  margin-bottom: 0;
}
.allpeople {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.allpeoplechild_right {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.allpeoplechild_right_des {
  height: 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
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
.iconview {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: #9798a8;
}

.shareCls {
  width: 15px;
  height: 15px;
}
.childTitle {
  width: 100%;
  height: 26px;
  display: flex;
  align-items: center;
  padding: 0 30px;
  box-sizing: border-box;
  font-size: 11px;
  background: #FBFCFE;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #bdbdbd;
}
.nopadding{
  padding: 0 !important;
}
.haspadding{
  padding: 10px 30px !important;
}
</style>