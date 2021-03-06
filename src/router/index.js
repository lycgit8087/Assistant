import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from '@/views/home'
import My from '@/views/my'
import Order from '@/views/order'
import OrderDetail from '@/views/order/order-detail'
import Maillist from '@/views/my/mail-list'
import Login from '@/views/login'
import OrderEdit from '@/views/order/order-edit'
import Supplier from '@/views/my/supplier'
import Machine from '@/views/login/machine'
import Agent from '@/views/my/agent'








Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [{
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: Supplier,
      title: "供应商管理"
    },
    {
      path: '/agent',
      name: 'agent',
      component: Agent,
      title: "我代理的订单"
    },
    {
      path: '/machine',
      name: 'machine',
      component: Machine,
      title: "添加下单助手"
    },
    {
      path: '/my',
      name: 'my',
      component: My,
      title: "我的"

    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/order-deit',
      name: 'order-edit',
      component: OrderEdit
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: OrderDetail
    },
    {
      path: '/mail-list',
      name: "mail-list",
      component: Maillist,
    }
  ]
})