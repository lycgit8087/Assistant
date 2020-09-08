// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'amfe-flexible/index.js'
import api from './api'
import util from './utils/util.js'

import store from "./store"
import { Toast, Notify, Dialog} from "vant";
import Vconsole from 'vconsole'

Vue.use(Vant);
Vue.prototype.$api = api
Vue.prototype.$util = util
Vue.config.productionTip = false
Vue.prototype.$Toast = Toast
Vue.prototype.$Notify = Notify
Vue.prototype.$Dialog = Dialog

// if(process.env.NODE_ENV != "development"){
  let vConsole = new Vconsole()
  Vue.use(vConsole)
// }




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
