import Vue from 'vue'
import Router from 'vue-router'
import Index from 'pages/index'
import Product from 'pages/product'
import Detail from 'pages/detail'
import Cart from 'pages/cart'
import Comfirm from 'pages/comfirm'
import User from 'store/user'
import Order from 'store/my/order'
import Coupon from 'store/my/coupon'
import Address from 'store/my/address'

Vue.use(Router)

export default new Router({
  mode: 'history',
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
      redirect: 'my/order',
      children: [
        {
          path: '/my/order',
          component: Order
        },
        {
          path: '/my/coupon',
          component: Coupon
        },
        {
          path: '/my/address',
          component: Address
        }
      ]
    }
  ]
})