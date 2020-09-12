import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 const state={   //要设置的全局访问的state对象
     userInfo:{},
     wxurl:"https://ams.imofang.cn/cube.aspx",
     shareUrl:"https://network-modules.imofang.cn"
     //要设置的初始属性值
   };
const getters = {   //实时监听state值的变化(最新状态)
    keepAlive: state => state.keepAlive
};
const mutations = {
   SET_USER_INFO(state,INFO){
    state.userInfo =INFO
   },
};
 const actions = {
   USER_INFO(context,INFO){
    context.commit('SET_USER_INFO',INFO);
   },
};
  const store = new Vuex.Store({
       state,
       getters,
       mutations,
       actions
});
export default store;