<template>
<div class="g-bd g-bd-hasFooter">
  <m-bread>用户中心</m-bread>
  <div class="sd sd-order">
    <ul class="m-snav m-snav-order">
      <router-link v-for="(nav,index) in leftnav" tag="li" :key="index" :to="{ path: nav.href }" active-class="active"><a><i></i><span>{{nav.name}}</span></a></router-link>
    </ul>
  </div>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</div>
</template>
<script>
import MBread from 'components/bread/bread'
export default {
  components: {
    MBread
  },
  data() {
    return {
      leftnav: [
        {
          name: '我的订单',
          href: 'order',
          active: false
        },
        // {
        //   name: '我的优惠券',
        //   href: 'coupon',
        //   active: false
        // },
        {
          name: '我的收货地址',
          href: 'address',
          active: false
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.g-bd {
    width: 1100px;
    min-height: 750px;
    margin: 0 auto;
    background: #fff;
}
.g-bd .sd-order {
    width: 200px;
    float: left;
}
.m-snav li a {
    display: block;
    height: 50px;
    width: 200px;
    line-height: 50px;
    text-decoration: none;
    font-size: 16px;
    color: #888;
}
.m-snav li.active a span{
    color: #333;
    font-weight: bold;
}
.m-snav li a i {
    display: inline-block;
    height: 24px;
    width: 3px;
}
.m-snav li a span {
    padding-left: 25px;
    vertical-align: top;
}
.m-snav li:hover a span {
    color: #333;
    font-weight: bold;
}
.m-snav li.active i {
    margin: 13px 0 0 0;
    background-color: #d33a31;
}
.m-snav li.active {
    background-color: rgba(0, 0, 0, 0.04);
}
</style>
