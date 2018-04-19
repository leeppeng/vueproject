<template>
<div>
    <header class="header">
        <div class="head">
            <div class="head-nav f-fl">
                <div class="logo">
                    <router-link :to="{path:'/'}" tag="a">LeePeng<!--img src="../common/image/logo.png" alt=""--></router-link>
                </div>
            </div>
            <m-search></m-search>
            <div class="shopcar f-fl">
                <router-link :to="{path:'/cart'}" tag="a">
                    <span class="num cartnum">2</span>
                </router-link>
            </div>
            <div class="user f-fl" id="user">
                <div class="select f-pr">
                    <div class="login-btn" v-if="username === ''" @click="loginClick" >登录</div>
                    <img class="avatar" v-if="username !== ''" src="../../common/image/user.jpg">
                    <ul v-if="username !== ''" >
                        <li data-action="order">
                            <router-link :to="{path:'/my/order'}" tag="a">
                              <em class="order"></em>我的订单<span class="f-pa"></span>
                            </router-link>
                        </li>
                        <!--li data-action="mycoupon">
                            <router-link :to="{path:'/my/coupon'}" tag="a">
                              <em class="coupon-icon"></em>我的优惠券<span class="f-pa"></span>
                            </router-link>
                        </li-->
                        <li data-action="address">
                            <router-link :to="{path:'/my/address'}" tag="a">
                              <em class="address"></em>我的收货地址<span class="f-pa"></span>
                            </router-link>
                        </li>
                        <li @click="logout" class="bort">
                            <a><em class="logout"></em>退出<span class="f-pa"></span></a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>
    <my-dialog :is-show="isLoginShow" @on-close="closeDialog('isLoginShow')">
      <login-dialog @has-log="Login" @go-reg="GoReg"></login-dialog>
    </my-dialog>
    <my-dialog :is-show="isRegShow" @on-close="closeDialog('isRegShow')">
      <reg-dialog @has-log="Reg" @go-login="GoLogin"></reg-dialog>
    </my-dialog>
</div>
</template>
<script>
import MSearch from 'components/search/search'
import MyDialog from 'base/dialog/dialog'
import LoginDialog from 'components/login/logindialog'
import RegDialog from 'components/login/regdialog'
export default {
  components: {
    MyDialog,
    LoginDialog,
    RegDialog,
    MSearch
  },
  data() {
    return {
      isLoginShow: false,
      isRegShow: false,
      username: ''
    }
  },
  methods: {
    loginClick() {
      this.isLoginShow = true
    },
    closeDialog(attr) {
      this[attr] = false
    },
    Login(res) {
      this.closeDialog('isLoginShow')
      let data = res.data
      this.username = data.name
    },
    GoReg() {
      this.closeDialog('isLoginShow')
      this.isRegShow = true
    },
    Reg(res) {
      this.closeDialog('isRegShow')
      let data = res.data
      this.username = data.name
    },
    GoLogin() {
      this.closeDialog('isRegShow')
      this.isLoginShow = true
    },
    logout() {
      this.username = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/mixin.styl'
.header,header
    height 73px
    background #fff
    border-bottom: 2px solid #eee
    .head
        width 1100px
        margin 0 auto
        display flow-root
        .head-nav
            width 290px
            font-size $font-size-large-x
            line-height 70px
        .shopcar
            width 36px
            height 36px
            margin 17px 0 0 41px
            position relative
            background-image url('../../common/image/shopcart.svg')
            background-size: 36px
            background-repeat: no-repeat
            a
                display: inline-block;
                width: 36px;
                height: 36px;
                background-position: -110px -158px;
                cursor: pointer;
                text-decoration: none;
                .num
                    top: -8px
                    left: 26px
                    padding 0 6px
                    height: 18px
                    line-height: 18px
                    text-align: center
                    position absolute
                    background #c00
                    font-size 14px
                    border-radius 20px
                    color: #fff
                    background-position: -156px -158px
.user
    width: 62px
    height: 36px
    margin: 15px 0 0 37px
    position: relative
    background: url('../../common/image/arrow-d.png') no-repeat 110% center
    &:hover
        .select ul
            display block
    .select
        z-index: 2;
        width: 62px;
        height: 36px;
        .avatar
          width: 36px;
          height: 36px;
          border-radius: 50%;
        .login-btn
          width: 36px
          height: 36px
          line-height: 36px
          text-align: center
          font-size: 14px
          cursor pointer
        ul
            position: absolute
            z-index: 3
            display none
            top: 36px
            left: -61px
            width: 160px
            height: auto
            padding-top 10px
            box-shadow: 0 4px 7px #555
            text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9)
            li
                padding-left: 24px;
                font-size: 12px;
                color: #333;
                background-color: #fff;
                cursor: pointer;
                &:hover
                    background-color: #f2f2f2;
                a
                    display: block;
                    width: 134px;
                    padding-left: 1px;
                    height: 40px;
                    line-height: 40px;
                    text-decoration: none;
                    em
                        display: inline-block
                        position: relative
                        top: 4px
                        width: 18px
                        height: 18px
                        margin-right: 9px
                        background-image url('../../common/image/logins.png')
                    em.order
                        background-position -28px -26px
                    em.coupon-icon
                        background-position 0px -28px
                    em.address
                        background-position 0px -0px
                    em.mainside
                        background-position -28px -0px
                    em.logout
                        background-position -56px -0px
            li.bort
                border-top: 1px solid rgba(0, 0, 0, 0.1)
.login
  width: 364px
  background: #fff
  border-radius: 4px
  h3
    padding: 30px 30px 24px
    font-size: 24px
    background: #fdfdfd
    border-top-left-radius: 20px
    border-top-right-radius: 20px
    border-bottom: 1px dashed #ddd
  .formbox
    padding: 30px 32px
    .item
      font-size: 14px
      margin-bottom: 20px
      display: table
      width: 100%
      .input
        display: table-cell
        .int
          min-width: 300px
          max-width: 400px
          height: 42px
          padding-left: 20px
          padding-right: 20px
          color: #666666
          font-size: 14px
          border: 1px solid #dddddd
          background: #f4f4f4
          box-sizing: border-box
          border-radius: 4px
    .item.forget .input
      width: 100%
      padding: 0 10px
    .item.forget label
      color: #666;
      cursor: pointer;
.loginbtn
  width: 100%
  display: block
  border: none
  background: #ffd100
  height: 42px
  line-height: 42px
  border-radius: 4px
  color: #444
  font-size: 16px
  letter-spacing: 24px
  text-indent: 24px
  text-align: center
  outline: none
  cursor: pointer
.loginbtn-disabled
  color: #bbbbbb
  background: #eeeeee
  border: 1px solid #eeeeee
  border-radius: 4px
  text-align: center
  cursor: default
.go-reg
  font-size 12px
  color #4a85e0
  cursor pointer
</style>
