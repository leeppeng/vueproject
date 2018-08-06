<template>
<div class="g-bd">
  <m-bread>订单确认</m-bread>
  <div id="g-main" class="ma">
    <addr-choose></addr-choose>
    <div class="m-msg">
      <div class="head"></div>
      <div class="body">
        <ul>
          <li class="bggray f-cb s-fc999">
            <span class="intro f-fl">商品信息</span>
            <span class="money f-fl">金额</span>
            <span class="number f-fl">数量</span>
            <span class="all f-fl">小计</span>
          </li>
          <li class="f-cb" v-for="item in buyList" :key="item.id">
            <span class="pic f-fl">
              <img :src="/static/+item.coverUrl" alt="商品图片">
            </span>
            <span class="msg f-fl">
              <div class="promes">
                <p class="name f-thide">{{item.name}}</p>
              <p class="attr f-thide">{{item.suggestWord}}</p>
              </div>
            </span>
            <span class="price f-fl">{{item.price | formatMoney}}</span>
            <span class="num f-fl">{{item.num}}</span>
            <span class="total f-fl">{{item.num*item.price | formatMoney}}</span>
          </li>
        </ul>
        <div class="line-bt"></div>
        <div class="u-price f-mgt30 f-mgr60">
          <div class="line f-cb f-pr">
            <span class="pr f-fr">¥<em>188</em></span>
            <span class="f-fr">商品合计：</span>
          </div>
          <div class="line f-cb f-pr">
            <span class="pr f-fr">
              <span class="u-fee"></span>¥<em>0</em>
            </span>
            <span class="f-fr">运费：</span>
          </div>
          <div class="line tot f-cb">
            <span class="pr f-fr"><em><i class="f-fs20">¥</i>188</em></span>
            <span class="f-fr">实付金额：</span>
          </div>
        </div>
        <div class="m-btmlay f-mgr60">
          <div class="f-cb text_r">
            <span class="paybtn btn-r">提交订单</span>
          </div>
          <div class="f-cb">
            <div class="inner text_r">
              李鹏&nbsp;&nbsp;
              18763960633&nbsp;&nbsp;
              山东省济宁市邹城市&nbsp;&nbsp;
              香城镇
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import MBread from 'components/bread/bread'
import AddrChoose from './addrchoose'
export default {
  components: {
    MBread,
    AddrChoose
  },
  computed: {},
  data() {
    return {
      buyList: []
    }
  },
  filters: {
    formatMoney: function(value) {
      return '￥' + value.toFixed(2)
    }
  },
  methods: {
    Prosession() {
      let session = JSON.parse(sessionStorage.getItem('producrArr'))
      // let sessionArr = session.productId
      console.log(session)
      this.$http.get('/api/getProduct').then(res => {
        // console.log(res.data.data.hotProduct)
        let productList = res.data.data.hotProduct
        productList.forEach(item => {
          session.forEach(value => {
            if (value.id === item.id) {
              item.num = value.num
              this.buyList.push(item)
            }
          })
        })
        console.log(this.buyList)
      }, err => {
        console.log(err)
      })
    }
  },
  mounted() {
    this.Prosession()
  }
}
</script>

<style lang="scss" scoped>
.m-msg{
  margin-bottom: 60px;
  .head{
    margin: 50px 0 18px 0;
    font-size: 16px;
  }
  .body{
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 14px;
    color: #333;
    li{
      display: flow-root;
    }
  }
  .bggray span{
    height: 40px;
    line-height: 40px;
  }
  .intro{
    width: 566px;
    margin-left: 20px;
  }
  .money{
    width: 195px;
    margin-left: 40px;
  }
  .number{
    width: 50px;
    margin: 0 80px 0 0;
  }
  .all{
    width: 80px;
    margin-left: 40px;
  }
  .pic{
    width: 100px;
    height: 117px;
    img{
      width: 80px;
      height: 80px;
      margin: 18px 0 0 20px;
      background-color: #f9f9f9;
    }
  }
  .msg{
    width: 466px;
    height: 100%;
    margin-left: 20px;
    p{width: 379px;}
    .name{margin-top: 37px;}
    .attr{
      margin-top: 10px;
      color: #999;
      font-size: 12px;
    }
  }
  .price{
    width: 195px;
    line-height: 117px;
    margin-left: 40px;
  }
  .num{
    width: 50px;
    line-height: 117px;
    margin: 0 80px 0 10px;
  }
  .total{
    width: 80px;
    line-height: 117px;
    margin-left: 34px;
  }
  .line-bt{
    margin-left: 20px;
    width: 1058px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }
  .f-mgr60{margin-right: 60px;}
  .f-mgt30{ margin-top: 30px;}
}
.u-price .line{
  display: flow-root;
}
.u-price .line span{
  height: 26px;
  line-height: 26px;
  font-size: 14px;
  text-align: right;
}
.u-price .line .pr{
  min-width: 125px;
}
.u-price .tot{
  height: 30px;
  line-height: 30px;
  margin-top: 20px;
}
.m-btmlay .paybtn{
  width: 174px;
  height: 50px;
  margin: 5px 0 10px 0;
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  background-color: #d33a31;
  color: #fff;
  cursor: pointer;
  display: inline-block;
}
.m-btmlay .inner{
  margin-bottom: 24px;
  line-height: 26px;
  text-align: right;
  font-size: 14px;
  color: #666;
}
</style>
