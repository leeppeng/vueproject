import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/home/index'
import Product from 'pages/product/index'
import Detail from 'pages/detail/index'
import Cart from 'pages/cart/index'
import Comfirm from 'pages/comfirm/index'
import User from 'pages/store/user'
import Order from 'pages/store/order'
import Coupon from 'pages/store/coupon'
import Address from 'pages/store/address'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/product',
      component: Product,
      meta: {
        titlet: '商品列表'
      }
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/comfirm',
      component: Comfirm
    },
    {
      path: '/user',
      component: User,
      redirect: '/order',
      children: [
        {
          path: '/order',
          component: Order
        },
        {
          path: '/coupon',
          component: Coupon
        },
        {
          path: '/address',
          component: Address
        }
      ]
    }
  ]
})
