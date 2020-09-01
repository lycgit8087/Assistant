import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import My from '@/views/my'
import Order from '@/views/order'
import OrderDetail from '@/views/order/order-detail'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
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
    }
  ]
})
