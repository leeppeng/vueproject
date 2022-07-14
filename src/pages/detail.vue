<template>
<div class="g-bd">
  <m-bread>网易云音乐官方定制帆布袋 米白版</m-bread>
<div class="detail">
  <div class="detail-header">
    <div class="pic-show f-fl">
      <div class="pic f-pr">
          <img class="img1" :src="pic">
      </div>
      <ul class="pic-list">
        <li
        v-for="(pic,index) in proDetail.picUrls"
        :key="index"
        :class="{'z-sel':picIndex===index}"
        @click="choosepic(index)">
          <img class="img1" :src="'/static/'+pic">
        </li>
      </ul>
    </div>
    <div class="info f-fr">
      <div class="basic">
        <h2 class="f-ff2">{{proDetail.name}}</h2>
        <p class="price "><span class="rmb">¥</span><em class="j-flag">{{proDetail.price}}</em></p>
        <div class="select">
          <div class="title f-pr">
            图案 :
          </div>
          <m-choose :chooses="chooselist" @on-change="Choose"></m-choose>
        </div>
        <div class="j-count select">
          <div class="title f-pr"> 数量 :</div>
          <div class="count">
            <m-counter :max="30" :min="2" @on-change="Counter"></m-counter>
          </div>
        </div>
      </div>
      <div class="m-services select">
        <div class="title f-pr"> 服务 :</div>
        <div class="cnt">
          <a class="service">7天无理由退货</a>
          <a class="service">15天无忧换货</a>
          <a class="service">满119包邮</a>
          <a class="service">顺丰发货</a>
          <a class="service">云音乐自营</a>
        </div>
        </div>
        <p class="buyorjoin f-cb">
          <a data-action="buy" class="f-fl u-btn buybtn" @click="goComfirm">立即购买</a>
          <a class="f-fl u-btn" data-action="join" data-type="cart">
            加入购物车
          </a>
        </p>
      </div>
  </div>
</div>
</div>
</template>
<script>
import MBread from 'components/bread/bread'
import MCounter from 'base/controls/count'
import MChoose from 'base/controls/choose'
export default {
  components: {
    MBread,
    MCounter,
    MChoose
  },
  data() {
    return {
      proDetail: [],
      pic: '',
      picIndex: 0,
      chooselist: [
        {
          name: '朋友款',
          id: 100001
        },
        {
          name: '爱心款',
          id: 100002
        },
        {
          name: '999+款',
          id: 100003
        }
      ]
    }
  },
  methods: {
    getProductDetail() {
      let pordetailid = this.$route.query.id
      console.log(pordetailid)
      this.$http.get('/api/getProduct', {params: pordetailid}).then((res) => {
        let productData = []
        productData = res.data.data.hotProduct
        productData.forEach(value => {
          // console.log(value.id, pordetailid)
          if (value.id === parseInt(pordetailid)) {
            this.proDetail = value
          }
        })
        this.pic = '/static/' + this.proDetail.coverUrl
      }, (err) => {
        console.log(err)
      })
    },
    Counter(count) {
      console.log(count)
    },
    Choose(cind) {
      console.log(cind)
    },
    goComfirm() {
      this.$router.push({
        path: '/comfirm'
      })
    },
    choosepic(index) {
      this.picIndex = index
      this.pic = '/static/' + this.proDetail.picUrls[index]
    }
  },
  mounted() {
    this.getProductDetail()
  }
}
</script>
<style lang="stylus" scoped>
.g-bd
  width 1100px
  margin 0 auto
  .detail
    width 100%
    .detail-header
      display flow-root
.pic-show
  width 440px
  height 530px
  .pic
    width 440px
    height 440px
    > img
      width 440px
      height 440px
  ul
    position relative
    z-index 1
    zoom 1
    width 440px
    height 80px
    margin-top 10px
    overflow hidden
    li
      box-sizing border-box
      float left
      width 80px
      height 80px
      margin-right 10px
      background #f9f9f9
      border 2px solid #fff
      img
        width 100%
        height 100%
        cursor pointer
    li.z-sel, li:hover
      border: 2px solid #d33a31
.info
  width 580px
  .basic
    position relative
    h2
      line-height 34px
      color #333
      font-size 24px
    .price
      margin 20px 0
      font-size 14px
      .rmb
        font-size 30px
        margin-right 3px
        color #d33a31
      em
        margin-right 4px
        font-size 30px
        color #d33a31
  .select
    margin 16px -16px 0 -8px
    border 1px solid #fff
    padding 0 7px
    display flow-root
    .title
      height 32px
      overflow hidden
      float left
      height 30px
      line-height 30px
      margin-right 30px
      color #999
.m-services
  position: relative;
  .cnt
    cursor: pointer
    margin-left: 69px
    line-height: 30px
    a
      display: inline-block
      position: relative
      line-height: 20px
      margin-right: 28px
      color: #666
      &:after
        content: ""
        position: absolute
        top: 8px
        left: -8px
        width: 3px
        height: 3px
        border-radius: 100%
        background-color: #d33a31
.info .u-btn
  width 170px
  height 50px
  line-height 50px
  margin-top 30px
  font-size 18px
  text-align center
  background #c00
  color #fff
  margin-right 10px
  box-sizing border-box
.info .u-btn.buybtn
  background none
  border:2px solid #c00;
  color #c00
</style>