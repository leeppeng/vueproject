<template>
<div class="g-bd g-bd-home">
  <m-bread>购物车</m-bread>
  <div id="g-main" class="ma">
    <div class="n-cart">
      <div class="f-cb s-fc4 head">
        <div class="check f-fl">
          <i class="checkbox u-checkbox" :class="{'checked':checkAll}" @click="Allchecked"></i>
        </div>
        <div class="cnt f-fl">
          <div class="coverwrap f-fl s-fc333">全选</div>
          <div class="product f-fl">商品</div>
          <div class="pri1 f-fl text_c">金额</div>
          <div class="num f-fl text_c">数量</div>
          <div class="pri2 f-fl text_c">小计</div>
          <div class="man f-fl">操作</div>
        </div>
      </div>
      <ul>
        <li class="f-cb s-fc4 first">
          <div class="f-fl product">全部商品&nbsp;(&nbsp;{{allProNum}}&nbsp;)&nbsp;</div>
          <!--div class="f-fr f-mgr20">
            <div class="f-fl icon"><i></i></div>
            <div class="f-fl txt s-fc333">
              全场满<em class="f-red">¥119</em>免运费
            </div>
          </div-->
        </li>
        <li class="f-cb" v-for="(product,index) in cartlist" :key="index">
          <div class="check f-fl">
            <i class="checkbox u-checkbox " :class="{'checked':product.checked}" @click="changeChecked(product)"></i>
          </div>
          <div class="cnt f-fl">
            <div class="coverwrap f-fl">
              <div class="cover f-bd2">
                <a target="_blank" href="">
                  <img :src="/static/+product.coverUrl">
                </a>
              </div>
            </div>
            <div class="msg f-fl">
              <a target="_blank" href="">
                <p class="tit f-thide">{{product.productName}}</p>
              </a>
              <p class="sku s-fc4 f-thide">{{product.attrValue}}</p>
            </div>
            <div class="price f-fl text_c">{{product.price | formatMoney}}</div>
            <div class="ctrl f-fl f-pr text_c">
              <!--m-counter :num="product.num" :min="1" @on-change="productNum"></m-counter-->
              <div class="u-counter f-fl number">
                <a class="btn btn-dis j-x" @click="changMoney(product,-1)"><i class="u-icn u-icn-27"></i></a>
                <span class="tot">
                  <input type="text" class="text" disabled v-model="product.num">
                </span>
                <a class="btn j-x" @click="changMoney(product,1)"><i class="u-icn u-icn-28"></i></a>
              </div>
            </div>
            <div class="price line f-fl text_c">{{product.price*product.num | formatMoney}}</div>
            <div class="delete f-fl" @click="DelDialog(product)"></div>
          </div>
        </li>
        <li class="bottom" id="bottom">
          <div class="f-cb s-fc4">
            <div class="check f-fl">
              <i class="checkbox u-checkbox" :class="{'checked':checkAll}" @click="Allchecked"></i>
            </div>
            <div class="f-fl">
              <div class="coverwrap f-fl s-fc333">全选</div>
              <div class="product f-fl">已选择 <em class="f-red">{{choneckProNum}}</em> 件商品</div>
            </div>
            <div class="paybtn f-fr" :class="{'disabled':checkedCount == '0'}" @click="ConfirmOrder">结算</div>
            <div class="f-fr">
              <span class="s-fc4">
                已享受免运费
                &nbsp;|&nbsp;
              </span>
              <span class="s-fc1">合计&nbsp;:&nbsp;</span>
              <span class="f-red">
                {{totalMoney | formatMoney}}
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <m-dialog :is-show="isDelcart" @on-close="closeDialog">
    <div class="del-dialog">
      <p>确定要删除此本宝宝吗？</p>
      <span class="del-btn" @click="delTrue">确定</span><span class="del-btn close" @click="closeDialog">关闭</span>
    </div>
  </m-dialog>
</div>
</template>
<script>
import MBread from 'components/bread/bread'
import MDialog from 'base/dialog/dialog'
import MCounter from 'base/controls/count'
export default {
  components: {
    MDialog,
    MBread,
    MCounter
  },
  data() {
    return {
      totalMoney: 0,
      choneckProNum: 0,
      cartlist: [],
      buyList: [],
      isDelcart: false,
      delProduct: ''
    }
  },
  filters: {
    formatMoney: function(value) {
      return '￥' + value.toFixed(2)
    }
  },
  computed: {
    checkAll() {
      return this.checkedCount === this.cartlist.length
    },
    checkedCount() {
      let i = 0
      this.cartlist.forEach((item) => {
        if (item.checked) i++
        console.log(i)
      })
      return i
    },
    allProNum () {
      return this.$store.state.cartNum
    }
  },
  methods: {
    getCart() {
      let session = JSON.parse(sessionStorage.getItem('cartInfoArr'))
      this.$http.get('api/getProduct', {'id': 123}).then((res) => {
        // console.log(res.data.data)
        let productList = res.data.data.hotProduct
        productList.forEach(item => {
          if (session !== null) {
            session.forEach(value => {
              if (value.id === item.id) {
                item.num = value.num
                this.cartlist.push(item)
              }
            })
          }
        })
        console.log(this.cartlist)
      }, (err) => {
        console.log(err)
      })
    },
    productNum(num) {
      console.log(num)
      this.clacTotalPrice()
    },
    changeSession(id, num) {
      let session = JSON.parse(sessionStorage.getItem('cartInfoArr'))
      for (let item in session) {
        if (id === session[item].id) {
          session[item].num = num
        }
      }
      console.log(session)
      sessionStorage.setItem('cartInfoArr', JSON.stringify(session))
    },
    changMoney(product, way) {
      if (way > 0) {
        product.num++
      } else {
        product.num--
        if (product.num < 1) {
          product.num = 1
        }
      }
      this.changeSession(product.id, product.num)
      this.clacTotalPrice()
      this.cartNum()
    },
    changeChecked(item) {
      if (typeof item.checked === 'undefined') {
        this.$set(item, 'checked', true)
      } else {
        item.checked = !item.checked
      }
      this.clacTotalPrice()
    },
    Allchecked() {
      console.log(this.checkAll)
      let flag = !this.checkAll
      if (flag) {
        this.cartlist.forEach((item, index) => {
          if (typeof item.checked === 'undefined') {
            this.$set(item, 'checked', flag)
          } else {
            item.checked = true
          }
        })
      } else {
        this.cartlist.forEach((item, index) => {
          item.checked = false
        })
      }
      this.clacTotalPrice()
    },
    clacTotalPrice() {
      this.totalMoney = 0
      this.choneckProNum = 0
      this.cartlist.forEach((product, index) => {
        if (product.checked) {
          this.totalMoney += product.num * product.price
          this.choneckProNum += product.num
        }
      })
    },
    cartNum() {
      let sum = 0
      this.cartlist.forEach((product, index) => {
        sum += product.num
      })
      this.$store.commit('updateCartNum', sum)
    },
    DelDialog(product) {
      this.isDelcart = !this.isDelcart
      this.delProduct = product
    },
    delTrue() {
      let index = this.cartlist.indexOf(this.delProduct)
      this.cartlist.splice(index, 1)
      let session = JSON.parse(sessionStorage.getItem('cartInfoArr'))
      for (let item in session) {
        if (this.delProduct.id === session[item].id) {
          console.log(item)
          session.splice(item, 1)
        }
      }
      sessionStorage.setItem('cartInfoArr', JSON.stringify(session))
      this.cartNum()
      this.isDelcart = false
      this.clacTotalPrice()
    },
    closeDialog() {
      this.isDelcart = false
    },
    ConfirmOrder() {
      if (this.checkedCount > 0) {
        let info = []
        this.cartlist.forEach(item => {
          if (item.checked) {
            let arr = {'id': item.id, 'num': item.num}
            info.push(arr)
          }
        })
        console.log(info)
        // let info = [{'id': this.proDetail.id, 'num': this.num}]
        // sessionStorage.removeItem('producrArr')
        // sessionStorage.setItem('producrArr', JSON.stringify(info))
        // this.$router.push({
        //   path: 'comfirm'
        // })
      }
    }
  },
  mounted() {
    this.getCart()
  }
}
</script>
<style lang="scss" scoped>
.g-bd {
  width: 1100px;
  min-height: 750px;
  margin: 0 auto;
  background: #fff;
  .n-cart{
    .product {width: 404px;}
    .pri1 {width: 116px;}
    .num {width: 108px;margin: 0 79px 0 42px;}
    .pri2 {width: 110px;}
    .head {
      width: 100%;
      height: 66px;
      line-height: 66px;
      font-size: 14px;
      .check i {
        position: relative;
        top: 5px;
        display: inline-block;
        cursor: pointer;
      }
    }
    ul {
      border: 1px solid rgba(0, 0, 0, 0.1);
      font-size: 14px;
      li {
        width: 100%;
        height: 117px;
        overflow: hidden;
      }
      li.first {
        width: 100%;
        height: 40px;
        overflow: hidden;
        line-height: 40px;
        background: #f4f4f4;
        .product {margin-left: 60px;}
        .icon {
          margin-right: 12px;
          i {
            display: inline-block;
            position: relative;
            top: 5px;
            width: 44px;
            height: 20px;
            background-position: 0px -36px;
          }
        }
        .txt {margin-right: 12px;}
      }
      li.bottom {
        width: 100%;
        height: 50px;
        border-top: 1px solid #f2f2f2;
        overflow: hidden;
        line-height: 50px;
        .check .checkbox {top: 5px;}
        .paybtn {
          width: 160px;
          height: 50px;
          line-height: 50px;
          margin-left: 30px;
          font-size: 16px;
          background-color: #d33a31;
          color: #fff;
          text-align: center;
          cursor: pointer;
        }
        .paybtn.disabled {background: #ccc;}
      }
    }
    .checkbox {
      position: relative;
      top: 50px;
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 0 20px;
      cursor: pointer;
      background: url('../../common/image/cart.png') no-repeat 0 9999px;
      background-position: -118px -0px;
    }
    .checked {background-position: -54px -36px;}
    .cnt {
      width: 1036px;
      img {
        width: 80px;
        height: 80px;
        margin-top: 19px;
        background-color: #f5f5f5;
      }
      .msg {margin: 38px 66px 0 0;}
      .tit {width: 340px;}
      .sku {width: 340px; margin-top: 8px;}
      .price {width: 116px;height: 117px;line-height: 117px;}
      .ctrl {
        top: 46px;
        width: 133px;
        height: 26px;
        margin: -5px 49px 0 42px;
        position: relative;
        zoom: 1;
        .u-counter {
          width: 132px;
          height: 30px;
          border: 1px solid #e5e5e5;
          border-left: none;
          .btn {
            float: left;
            width: 34px;
            height: 30px;
            border-left: 1px solid #e5e5e5;
            i {
              position: relative;
              left: 3px;
              top: 1px;
              display: block;
              width: 100%;
              height: 100%;
            }
          }
          .btn-dis i {opacity: 0.3;}
          .u-icn {
            display: inline-block;
            vertical-align: middle;
            overflow: hidden;
            background: url(../../common/image/icon.png) no-repeat 0 9999px;
          }
          .u-icn-27 {background-position: 0px -508px;}
          .u-icn-28 {background-position: -38px -508px;}
        }
        .tot {
          float: left;
          width: 59px;
          height: 30px;
          border-left: 1px solid #e5e5e5;
          input {
            width: 100%;
            margin: 0;
            padding: 0;
            border: none;
            font-size: 14px;
            height: 30px;
            line-height: 30px;
            text-align: center;
          }
        }
      }
    }
    .coverwrap {width: 100px;}
    .delete {
      position: relative;
      z-index: 3;
      top: 5px;
      height: 10px;
      width: 10px;
      margin: 50px 60px 0 0;
      background: url('../../common/image/cha.png');
      cursor: pointer;
    }
  }
}

.s-fc333 {color: #333;}
.f-mgr20 {margin-right: 20px;}
.f-thide {word-wrap: normal;white-space: nowrap;}
.f-thide, .f-thide2, .f-thide3, .f-thide4 {
  overflow: hidden;
  text-overflow: ellipsis;
}

.del-dialog{
  padding: 50px 10px;
  background: #fff;
  border-radius: 4px;
  width: 380px;
  font-size: 18px;
  text-align: center;
  span.del-btn{
    padding: 10px 30px;
    background: #d33a31;
    color: #fff;
    margin: 40px 10px 0px;
    font-size: 14px;
    display: inline-block;
    border-radius: 3px;
    cursor: pointer;
  }
  span.del-btn.close{
    background: #eee;
    color: #333;
  }
}
</style>
