// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import axios from 'axios';
import 'vant/lib/index.css';
import 'amfe-flexible/index.js'
import {post,fetch,patch,put,get_token,get_new_token} from './utils/request'
import store from "./store"
// Vue.prototype.$get_new_token=get_new_token
// Vue.prototype.$post=post;

Vue.use(Vant);
Vue.prototype.$axios=axios;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
