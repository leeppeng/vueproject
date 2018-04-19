<template>
<div class="g-bd">
  <m-bread>订单确认</m-bread>
  <div id="g-main" class="ma">
    <div class="n-order" id="module-root">
      <div class="m-address-box">
        <div class="m-address-front">
          <div class="m-address f-pr">
            <div class="bggray">
              <span>收货信息</span>
            </div>
            <div class="head">
              <span class="f-ib"><i></i><em>默认地址</em></span>
            </div>
            <div class="msg">
              <span class="f-ib f-thide"><em style="letter-spacing: 6px;">收货人:</em>{{addr.name}}</span>
              <span class="phone f-ib f-thide"><em>联系方式&nbsp;:&nbsp;</em>{{addr.cellphone}}</span>
            </div>
            <div class="address">
              <p class="txt f-thide"><em>收货地址&nbsp;:&nbsp;</em>{{addr.provinceCity}}{{addr.detailAddress}}</p>
            </div>
            <div class="line f-pa"></div>
            <div class="modify f-pa">
              <a href="javascript:;" class="s-fcff f-blk" @click="huanAddr">更换收货地址</a>
              <a href="javascript:;" class="btn-b f-mgt5 f-blk" @click="addAddr">新建地址</a>
            </div>
          </div>
        </div>
      </div>
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
            <li class="f-cb">
              <span class="pic f-fl">
                <img src="../common/image/gg2.jpg" alt="商品图片">
              </span>
              <span class="msg f-fl">
                <div class="promes">
                  <p class="name f-thide">音乐运动速干T恤</p>
                <p class="attr f-thide">男款 S码</p>
                </div>
              </span>
              <span class="price f-fl">¥149</span>
              <span class="num f-fl">1</span>
              <span class="total f-fl">¥149</span>
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
  <m-dialog :isShow="isShow" @on-close="closeDialog">
    <div class="addrform">
      <h3>填写收货地址</h3>
      <addr-dialog @on-save="saveAddr"></addr-dialog>
    </div>
  </m-dialog>
  <m-dialog :isShow="ChangeisShow" @on-close="closeChangeDialog">
    <div class="addrform">
      <h3>更换收货地址</h3>
      <div class="zcnt">
        <ul class="addrbox">
          <li v-for="(item,index) in alladdr" :key="index" @click="chooseAddr(index)" :class="{'z-sel':addrIndex===index}">
            <div class="itm name">
              <span class="des f-fl">收 货 人&nbsp; :</span>
              <em class="f-fl f-thide">{{item.name}}</em>
            </div>
            <div class="itm phone">
              <span class="des f-fl">联系方式 :</span>
              <em class="f-fl f-thide">{{item.cellphone}}</em>
            </div>
            <div class="itm detailaddr">
              <span class="des f-fl">收货地址 :</span>
              <em class="f-fl f-thide">{{item.provinceCity}}{{item.detailAddress}}</em>
            </div>
            <div class="default f-pa" v-if="item.defaultAddr">默认地址</div>
          </li>
        </ul>
        <div class="g-addr-btns text_c">
          <a @click="okAddr" class="u-btn-new u-btn-new2">确 定</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a @click="closeChangeDialog" class="u-btn-new u-btn-new3">取 消</a>
        </div>
      </div>
    </div>
  </m-dialog>
</div>
</template>
<script>
import MBread from 'components/bread/bread'
import MDialog from 'base/dialog/dialog'
import AddrDialog from 'components/addrdialog/addrdialog'
export default {
  components: {
    MBread,
    MDialog,
    AddrDialog
  },
  data() {
    return {
      isShow: false,
      ChangeisShow: false,
      addrIndex: null,
      addr: [],
      alladdr: []
    }
  },
  methods: {
    getAddr() {
      this.$http.post('/api/getAddress').then((res) => {
        let data = res.data.data
        this.alladdr = data
        data.forEach(item => {
          if (item.defaultAddr) {
            this.addr = item
          }
        })
        console.log(this.addr)
      }, (err) => {
        console.log(err)
      })
    },
    addAddr() {
      this.isShow = !this.isShow
    },
    saveAddr(addr) {
      this.addr = addr
      this.isShow = false
    },
    chooseAddr(index) {
      this.addrIndex = index
    },
    huanAddr() {
      this.ChangeisShow = true
    },
    okAddr() {
      this.addr = this.alladdr[this.addrIndex]
      this.ChangeisShow = false
    },
    closeDialog() {
      this.isShow = false
    },
    closeChangeDialog() {
      this.ChangeisShow = false
    }
  },
  mounted() {
    this.getAddr()
  }
}
</script>

<style lang="stylus" scoped>
.g-bd
  width: 1100px
  min-height: 750px
  margin: 0 auto
  background: #fff
  .ma
    width: 100%
    margin: 0
.m-address
  border: 1px solid rgba(0, 0, 0, 0.1)
  font-size: 14px
  .head
    height: 26px
    line-height: 26px
    margin: 30px 0 25px 20px
    i
      display: inline-block
      position: relative
      top: 4px
      margin-right: 6px
      width: 16px
      height: 20px
      background: url('../common/image/dinwei.png')
  .msg
    height: 26px
    margin-left: 20px
    .phone
      margin-left: 60px
  .address
    height: 26px
    margin: 0 0 20px 20px
    p
      width: 850px
  .line
    bottom: 25px
    right: 214px
    width: 1px
    height: 60px
    background-color: rgba(0, 0, 0, 0.05)
  .modify
    top: 100px
    right: 57px
    a
      width: 100px
      height: 30px
      line-height: 30px
      text-align: center
      display: block;
    .btn-b
      border: 1px solid rgba(0, 0, 0, 0.2)
    .s-fcff
      color: #0c73c2
.f-thide, .f-thide2, .f-thide3, .f-thide4
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: normal;
.bggray
  width: 100%
  height: 40px
  line-height: 40px
  background: #f4f4f4
  span
    margin-left: 20px
    color: #999
.m-msg
  margin-bottom: 60px
  .head
    margin: 50px 0 18px 0
    font-size: 16px
  .body
    border: 1px solid rgba(0, 0, 0, 0.1)
    font-size: 14px
    color: #333
    li
      display: flow-root;
  .bggray span
    height: 40px
    line-height: 40px
  .intro
    width: 566px
    margin-left: 20px
  .money
    width: 195px
    margin-left: 40px
  .number
    width: 50px
    margin: 0 80px 0 0
  .all
    width: 80px
    margin-left: 40px
  .pic
    width: 100px
    height: 117px
    img
      width: 80px
      height: 80px
      margin: 18px 0 0 20px
      background-color: #f9f9f9
  .msg
    width: 466px
    height: 100%
    margin-left: 20px
    p
      width: 379px
    .name
      margin-top: 37px
    .attr
      margin-top: 5px
      color: #999
  .price
    width: 195px
    line-height: 117px
    margin-left: 40px
  .num
    width: 50px
    line-height: 117px
    margin: 0 80px 0 10px
  .total
    width: 80px
    line-height: 117px
    margin-left: 34px
  .line-bt
    margin-left: 20px
    width: 1058px
    border-bottom: 1px solid rgba(0, 0, 0, 0.06)
  .f-mgr60
    margin-right: 60px
  .f-mgt30
    margin-top: 30px;
.u-price .line
  display flow-root
.u-price .line span
  height: 26px
  line-height: 26px
  font-size: 14px
  text-align: right
.u-price .line .pr
  min-width: 125px
.u-price .tot
  height: 30px
  line-height: 30px
  margin-top: 20px
.m-btmlay .paybtn
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
.m-btmlay .inner
  margin-bottom: 24px;
  line-height: 26px;
  text-align: right;
  font-size: 14px;
  color: #666;
.addrform
  background #fff
  border-radius 4px 4px 0 0
  h3
    border-bottom 1px solid rgba(0, 0, 0, 0.1)
    border-radius 4px 4px 0 0
    background-color #f6f6f6
    height 60px
    line-height 60px
    padding-left 20px
    border-radius 3px 3px 0 0
    font-weight 600
    font-size 16px
    color #666
.zcnt
  padding 20px 14px 20px 20px
  .addrbox
    height 300px
    margin 10px auto
    overflow-y auto
    li
      width 608px
      padding-top 15px
      overflow hidden
      cursor pointer
      border 1px solid #f4f4f4
      margin-bottom 10px
      position relative
      .itm
        height 30px
        font-size 14px
        color #333
        .des
          width 70px
          margin-right 10px
          text-align right
          color #999
      .default
        top 59px
        right 20px
        padding 1px 2px
        border 1px solid #d33a31
        color #d33a31
    li.z-sel
      border 2px solid #c00
.u-btn-new
  display inline-block
  height 40px
  line-height 40px
  text-align center
  background-color #d33a31
  color #fff
  font-size 16px
  text-decoration none
  width 140px
.u-btn-new3
  display inline-block
  text-align center
  width 138px
  height 38px
  background-color #fff
  color #333
  border 1px solid rgba(0, 0, 0, 0.15)
</style>
