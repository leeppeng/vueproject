<template>
<div class="g-bd">
  <m-bread>{{ proName }}</m-bread>
  <div class="detail">
    <div class="detail-header">
      <div class="pic-show f-fl">
        <div class="pic f-pr">
          <div class="imgBox" id="imgBox">
            <img class="img1" :src="pic">
          </div>
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
              <m-counter :max="30" :min="1" @on-change="Counter"></m-counter>
            </div>
          </div>
          <div class="select">
            <div class="title f-pr"> 服务 :</div>
            <div class="cnt">
              <span>7天无理由退货</span>
              <span>15天无忧换货</span>
              <span>满119包邮</span>
              <span>顺丰发货</span>
              <span>云音乐自营</span>
            </div>
          </div>
        </div>
          <p class="buyorjoin f-cb">
            <a  class="f-fl u-btn buybtn" @click="goComfirm">立即购买</a>
            <a class="f-fl u-btn" @click="goCart">
              加入购物车
            </a>
          </p>
        </div>
    </div>
  </div>
  <div class="detail-content">
    <div class="detail-left">
      <h2>商品详情</h2>
      <div class="describe">
        <p>正品低价 品质保证：云音乐商城所有产品均由品牌方直供，杜绝假货。</p>
        <p></p>
        <p>
          <img src="/static/pic/detail_01.jpg" alt="">
          <img src="/static/pic/detail_02.jpg" alt="">
          <img src="/static/pic/detail_03.jpg" alt="">
          <img src="/static/pic/detail_04.jpg" alt="">
          <img src="/static/pic/detail_05.jpg" alt="">
        </p>
        <p></p>
        <p>商品交易成功后会在2个工作日内发货，法定节假日顺延，请在确认商品完好后再签收。</p>
        <p>若存在质量问题，请务必在7天之内联系客服：</p>
        <p>·客服账号：私信 @云音乐客服</p>
        <p>·温馨提示：完整的包装、配件和保修卡是电子产品进行售后的基础，请务必查看齐全后签收并妥善保管。</p>
      </div>
    </div>
    <div class="detail-right">
      <h3>特价商品</h3>
      <ul class="list">
        <li v-for="item in tjproduct" :key="item.id">
          <div class="imgbox">
            <img :src="'/static/'+item.coverUrl" alt="">
          </div>
          <div class="text">
            <div class="name">{{item.name}}</div>
            <div class="price">￥{{item.price}}</div>
          </div>
        </li>
      </ul>
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
      tjproduct: [],
      num: 1,
      pic: '',
      proName: '',
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
      this.$http.get('api/getProduct', {params: pordetailid}).then((res) => {
        let productData = []
        productData = res.data.data.hotProduct
        productData.forEach(value => {
          // console.log(value.id, pordetailid)/api/getProduct
          if (value.id === parseInt(pordetailid)) {
            this.proDetail = value
          }
          // console.log(value.tags)
          if (value.tags[0] === '特价') {
            this.tjproduct.push(value)
          }
        })
        console.log('tjproduct', this.tjproduct)
        this.proName = this.proDetail.name
        this.pic = '/static/' + this.proDetail.coverUrl
      }, (err) => {
        console.log(err)
      })
    },
    Counter(count) {
      this.num = count
      console.log(count)
    },
    Choose(cind) {
      console.log(cind)
    },
    goComfirm() {
      let info = [{'id': this.proDetail.id, 'num': this.num}]
      sessionStorage.removeItem('producrArr')
      sessionStorage.setItem('producrArr', JSON.stringify(info))
      this.$router.push({
        path: '/comfirm'
      })
    },
    goCart() {
      let session = JSON.parse(sessionStorage.getItem('cartInfoArr'))
      let id = this.proDetail.id
      let num = this.num
      if (session == null) {
        let cartInfo = [{'id': id, 'num': num}]
        sessionStorage.setItem('cartInfoArr', JSON.stringify(cartInfo))
        this.$store.commit('updateCartNum', num)
      } else {
        // console.log(session.map(item => item.id).indexOf(id))
        let flag = session.map(item => item.id).indexOf(id)
        if (flag === -1) {
          let arr = {'id': id, 'num': num}
          session.push(arr)
          sessionStorage.setItem('cartInfoArr', JSON.stringify(session))
        } else {
          for (let value in session) {
            if (session[value].id === id) {
              session[value].num = num
            }
          }
          sessionStorage.setItem('cartInfoArr', JSON.stringify(session))
        }
        let cnum = session.map(item => item.num)
        let sum = 0
        for (let i = 0; i < cnum.length; i++) {
          sum += cnum[i]
        }
        console.log(sum)
        this.$store.commit('updateCartNum', sum)
      }
      alert('已加入购物车')
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
<style lang="scss">
// scoped
@import "~common/css/mixin.scss";

.detail{
  width: 100%;
  .detail-header{display: flow-root;}
}
.pic-show{
  width: 440px;
  height: 530px;
  .pic{
    width: 440px;
    height: 440px;
    .imgBox {
      position: relative;
      overflow: hidden;
      width: 100%;
      height: 100%;
      background: #f9f9f9;
      > img{
        width: 440px;
        height: 440px;
      }
    }
  }
  ul{
    position: relative;
    z-index: 1;
    zoom: 1;
    width: 440px;
    height: 80px;
    margin-top: 10px;
    overflow: hidden;
    li{
      box-sizing: border-box;
      float: left;
      width: 80px;
      height: 80px;
      margin-right: 10px;
      background: #f9f9f9;
      border: 2px solid #fff;
      img{
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
    li.z-sel, li:hover{border: 2px solid #d33a31;}
  }
}
.info{
  width: 580px;
  .basic{
    h2{
      line-height: 34px;
      color: #333;
      font-size: 24px;
    }
    .price{
      margin: 20px 0;
      font-size: 14px;
      .rmb{
        font-size: 30px;
        margin-right: 3px;
        color: #d33a31;
      }
      em{
        margin-right: 4px;
        font-size: 30px;
        color: #d33a31;
      }
    }
    .select{
      margin-top: 16px;
      padding-left: 70px;
      position: relative;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      .title{
        position: absolute;
        left: 0;
      }
      .cnt{
        cursor: pointer;
        span{
          display: inline-block;
          position: relative;
          margin-right: 28px;
          &:after{
            content: "";
            display: block;
            position: absolute;
            top: 13px;
            left: -8px;
            width: 4px;
            height: 4px;
            border-radius:2px;
            background-color: #d33a31;
          }
        }
      }
    }
  }
}

.info .u-btn{
  width: 170px;
  height: 50px;
  line-height: 50px;
  margin-top: 30px;
  font-size: 18px;
  text-align: center;
  background: #c00;
  color: #fff;
  margin-right: 10px;
  box-sizing: border-box;
}
.info .u-btn.buybtn{
  background: none;
  border:2px solid #c00;
  color: #c00;
}
.detail-content{
  margin-top:66px;
  @include list(row);
  padding-bottom:40px;
  justify-content: space-between;
  h2,h3{
    height: 30px;
    line-height: 30px;
    padding-bottom: 17px;
    font-size: 22px;
    margin-bottom: 20px;
    border-bottom: 1px solid #000;
  }
  h2{font-weight: bold;}
  .describe{
    P{
      font-size: 14px;
      line-height: 18px;
      padding: 5px 0;
      color: #666;
    }
    img{
      vertical-align: top;
      max-width: 100%;
    }
  }
  .detail-left{
    width:700px;
  }
  .detail-right{
    width: 340px;
    .list{
      li{
        margin-bottom: 40px;
        @include flex(row);
        >div{flex: 1;}
        .imgbox{
          width: 100px;
          height: 100px;
          flex: none;
          background: #f9f9f9;
          img{
            width: 100%;
          }
        }
        .text{
          padding-left: 10px;
          overflow: hidden;
          .name{
            line-height: 24px;
            margin-top: 10px;
            font-size: 14px;
            text-align: left;
            @include moreellipsis();
          }
          .price{
            height: 24px;
            line-height: 24px;
            margin-top: 16px;
            font-size: 16px;
            color: #d33a31;
          }
        }
      }
    }
  }
}
</style>
