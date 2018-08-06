<template>
<div id="g-main" class="mn mn-order">
  <div class="n-myorder" id="module-root">
    <div class="m-tab">
      <ul class="s-brdb1" id="tab">
        <li v-for="(item,index) in tabs" :key="index" :class="[current===item.state?'z-sel':'']" @click="toggleTab(item.state)"><a :title="item.label">{{item.label}}</a></li>
      </ul>
    </div>
    <ul class="orderul" v-if="orderList.length">
      <li class="orderlist" v-for="(order,index) in filteredOrder" :key="index">
        <h3><span class="dealtime">下单时间：{{order.time}}</span> 订单号：{{order.id}}</h3>
        <div class="ordercont">
          <div class="img"><img :src="'/static/'+order.pic" alt="" width=100 height=100></div>
          <div class="name">{{order.name}}</div>
          <div class="price">单价<br>￥{{order.price}}</div>
          <div class="num">数量<br/>{{order.num}}</div>
          <div class="detail">查看详情</div>
        </div>
      </li>
    </ul>
    <div class="empty" v-else>
      <i class="icn"></i>
      <p class="text_c">您当前没有待支付的订单</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      orderList: [],
      current: 'paying',
      tabs: [
        {
          label: '待支付',
          state: 'paying'
        },
        {
          label: '待发货',
          state: 'toship'
        },
        {
          label: '待收货',
          state: 'receipt'
        },
        {
          label: '全 部',
          state: 'all'
        }
      ]
    }
  },
  computed: {
    filteredOrder() {
      let completed = this.current
      if (completed === 'all') {
        return this.orderList
      }
      if (completed === 'paying') {
        return this.orderList.filter(item => completed === item.statr)
      }
      if (completed === 'toship') {
        return this.orderList.filter(item => completed === item.statr)
      }
      if (completed === 'receipt') {
        return this.orderList.filter(item => completed === item.statr)
      }
    }
  },
  methods: {
    getOrderList() { // /api/getOrder
      this.$http.post('api/getOrder').then((res) => {
        this.orderList = res.data.data
        // this.orderList = res.data.orderList
        console.log(res.data)
      }, (err) => {
        console.log(err)
      })
    },
    toggleTab(state) {
      this.current = state
    }
  },
  mounted() {
    this.getOrderList()
  }
}
</script>

<style lang="scss" scoped>
@import "~common/css/mixin.scss";
.g-bd .mn-order{
  width: 870px;
  margin-left: 229px;
  .n-myorder .m-tab ul{
    height: 50px;
    line-height: 50px;
    @include list(row);
    li{
      margin-right: 45px;
      height: 40px;
      line-height: 40px;
      position: relative;
      a{
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #999;
        text-decoration: none;
      }
    }
    li.z-sel a{
      cursor: default;
      color: #000;
      font-weight: bold;
    }
  }
}
.orderul{
  margin: 15px 0;
  .orderlist{
    border: 1px solid #e8e8e8;
    margin-bottom: 15px;
    h3{
      background-color: #f5f5f5;
      height: 43px;
      line-height: 43px;
      .dealtime{
        margin-left: 20px;
        width: 265px;
        display: inline-block;
      }
    }
    .ordercont{
      padding: 20px;
      @include flex(row);
      align-items: center;
      text-align: center;
      div{line-height: 1.8;}
      div.img{margin-right: 20px;}
      div.name{
        width: 200px;
        text-align: left;
      }
      div.price{width: 180px;}
      div.num{width: 100px;}
      div.detail{
        flex: 1;
        cursor: pointer;
      }
    }
  }
}
.n-myorder .empty .icn{
  display: block;
  width: 95px;
  height: 107px;
  margin: 75px auto 20px auto;
  background: url('../../common/image/order_empty.png') no-repeat;
  background-size: 95px auto;
}
.n-myorder .empty p{
  color: #666;
  font-size: 20px;
}
</style>
