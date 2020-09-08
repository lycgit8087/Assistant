<!-- supplier -->
<template>
  <div class="supplier">
      <van-nav-bar left-arrow @click-left="backTo" title="供应商管理" :fixed="true" placeholder />

      <div class="pview">
        <!-- 搜索按钮 -->
        <van-search class="poeple_search" v-model="peoplesearch" placeholder="请输入搜索关键词" />
        <div class="allpeople">
          <div class="allpeoplechild" v-for="item in supplierList" :key="item" >
            <van-image fit="cover" :src="item.avatar" />
            <div class="allpeoplechild_right">
              <p class="allpeoplechild_right_des">
                <span>{{item.name}}</span>
              </p>
              <!-- 下单渠道 -->
              <van-cell-group>
                <van-cell :title="litem.name" v-for="(litem,lindex) in item.link_data" :key="lindex"  >
                  <template #right-icon>
                    <div class="iconview" >
                      <van-icon name="share" />
                      <span>分享</span>
                    </div>
                  </template>
                </van-cell>
                
              </van-cell-group>
            </div>
          </div>

          <!-- <van-button type="info">确定</van-button> -->
        </div>
      </div>

  </div>

  
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {mixin} from "../../mixin/mixin"
export default {
  //import引入的组件需要注入到对象中才能使用
  name: "supplier",
  components: {},
   mixins:[mixin],
  data() {
    //这里存放数据
    return {
      peoplesearch:"",
      supplierList:[]

    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goto(name){
       this.$router.push({name: name,});
    },
    
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
      let {supplierList,peoplesearch}=this
      this.$api.supplier.list({
        name:peoplesearch
      }).then(res=>{
        let list=res.data
        this.supplierList=list
        console.log(res)
      })
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style >
html{
    background: #fff;
}
.pview {
  width: 100%;
  height: 590px;
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
.cellclass{
  display: flex;
  align-items: center;
  height: 100%;
}
.iconview{
  display: flex;
  align-items: center;
font-size: 12px;
font-weight: 600;
color: #9798A8;

}
</style>