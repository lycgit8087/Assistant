import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from '@/views/home'
import My from '@/views/my'
import Order from '@/views/order'
import OrderDetail from '@/views/order/order-detail'
import Maillist from '@/views/my/mail-list'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/order',
      name: 'order',
      component: Order,
      children:[
        
      ]
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: OrderDetail
    },
    {
      path:'/',
      name:"mail-list",
      component: Maillist,
    }
  ]
})
