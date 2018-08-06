<template>
<div>
    <header :class="$style.header">
        <div :class="$style.head">
            <div :class="$style.headNav">
                <div :class="$style.logo">
                    <router-link :to="{path:'/'}" tag="a">LeePeng<!--img src="../common/image/logo.png" alt=""--></router-link>
                </div>
            </div>
            <m-search></m-search>
            <div :class="$style.shopcar">
                <router-link :to="{path:'/cart'}" tag="a">
                    <span :class="$style.num">{{cartNum}}</span>
                </router-link>
            </div>
            <div :class="$style.user" id="user">
                <div :class="$style.select">
                    <div :class="$style.loginBtn" v-if="!isLogin" @click="loginClick" >登录</div>
                    <img :class="$style.avatar" v-if="isLogin" src="../../common/image/user.jpg">
                    <ul v-show="isLogin">
                        <li>
                            <router-link :to="{path:'/order'}" tag="a">
                              <em :class="$style.order"></em>我的订单<span class="f-pa"></span>
                            </router-link>
                        </li>
                        <!--li data-action="mycoupon">
                            <router-link :to="{path:'/coupon'}" tag="a">
                              <em :class="style.couponIcon"></em>我的优惠券<span class="f-pa"></span>
                            </router-link>
                        </li-->
                        <li data-action="address">
                            <router-link :to="{path:'/address'}" tag="a">
                              <em :class="$style.address"></em>我的收货地址<span class="f-pa"></span>
                            </router-link>
                        </li>
                        <li @click="logout" class="bort">
                            <a><em :class="$style.logout"></em>退出<span class="f-pa"></span></a>
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
  computed: {
    cartNum () {
      console.log(this.$store.state.cartNum)
      return this.$store.state.cartNum
    },
    isLogin () {
      return this.$store.getters.isLogin
    }
  },
  data() {
    return {
      isLoginShow: false,
      isRegShow: false
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
      console.log(res)
      // let data = res.data
      let data = res
      console.log(data)
      this.$store.commit('loginUser', data.name)
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
      this.$store.commit('singOut')
    },
    getCartNum() {
      let session = JSON.parse(sessionStorage.getItem('cartInfoArr'))
      if (session == null) {
        this.$store.commit('updateCartNum', 0)
      } else {
        let sum = 0
        let cnum = session.map(item => item.num)
        for (let i = 0; i < cnum.length; i++) {
          sum += cnum[i]
        }
        console.log(sum)
        this.$store.commit('updateCartNum', sum)
      }
    }
  },
  mounted() {
    this.getCartNum()
    // this.isLogin()
  }
}
</script>

<style lang="scss" module>
  .header,header{
    min-width: 1100px;
    height: 73px;
    background: #fff;
    border-bottom: 2px solid #eee;
    .head{
      width: 1100px;
      margin: 0 auto;
      display: flow-root;
      .headNav{
        width: 290px;
        font-size:22px;
        line-height: 70px;
        float: left;
      }
      .shopcar{
        width: 36px;
        height: 36px;
        margin: 17px 0 0 41px;
        position: relative;
        background-image: url('../../common/image/shopcart.svg');
        background-size: 36px;
        background-repeat: no-repeat;
        float: left;
        a{
          display: inline-block;
          width: 36px;
          height: 36px;
          background-position: -110px -158px;
          cursor: pointer;
          text-decoration: none;
          .num{
            top: -8px;
            left: 26px;
            padding: 0 6px;
            height: 18px;
            line-height: 18px;
            text-align: center;
            position: absolute;
            background: #c00;
            font-size: 14px;
            border-radius: 20px;
            color: #fff;
          }
        }
      }
      .user{
        width: 62px;
        height: 36px;
        margin: 15px 0 0 37px;
        position: relative;
        float: left;
        background: url('../../common/image/arrow-d.png') no-repeat 110% center;
        &:hover{
          .select ul{display: block;}
        }
        .select{
          position: relative;
          zoom: 1;
          z-index: 2;
          width: 62px;
          height: 36px;
          .loginBtn{
            width: 36px;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            text-align: center;
            cursor: pointer;
          }
          .avatar{
            width: 36px;
            height: 36px;
            border-radius: 50%;
          }
          ul{
            position: absolute;
            z-index: 3;
            display: none;
            top: 36px;
            left: -61px;
            width: 160px;
            height: auto;
            padding-top: 10px;
            box-shadow: 0 4px 7px #555;
            text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9);
            li{
              padding-left: 24px;
              font-size: 12px;
              color: #333;
              background-color: #fff;
              cursor: pointer;
              &:hover{background-color: #f2f2f2;}
              &:last-child{border-top: 1px solid rgba(0, 0, 0, 0.1);}
              a{
                display: block;
                width: 134px;
                padding-left: 1px;
                height: 40px;
                line-height: 40px;
                text-decoration: none;
                em{
                  display: inline-block;
                  position: relative;
                  top: 4px;
                  width: 18px;
                  height: 18px;
                  margin-right: 9px;
                  background-image: url('../../common/image/logins.png');
                }
                em.order{background-position: -28px -26px;}
                em.couponIcon{background-position: 0px -28px;}
                em.address{background-position: 0px -0px;}
                em.mainside{background-position: -28px -0px;}
                em.logout{background-position: -56px -0px;}
              }
            }
          }
        }
      }
    }
  }
</style>
<style lang="scss">
@import "common/css/mixin.scss";
.login{
  width: 364px;
  background: #fff;
  border-radius: 4px;
  h3{
    padding: 30px 30px 24px;
    font-size: 24px;
    background: #fdfdfd;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom: 1px dashed #ddd;
  }
  .formbox{
    padding: 30px 32px;
    .item{
      font-size: 14px;
      margin-bottom: 20px;
      display: table;
      width: 100%;
      .input{
        display: table-cell;
        .int{
          min-width: 300px;
          max-width: 400px;
          height: 42px;
          padding-left: 20px;
          padding-right: 20px;
          color: #666;
          font-size: 14px;
          border: 1px solid #ddd;
          background: #f4f4f4;
          box-sizing: border-box;
          border-radius: 4px;
        }
      }
    }
    .item.forget .input{
      width: 100%;
      padding: 0 10px;
    }
    .item.forget label{
      color: #666;
      cursor: pointer;
    }
  }
}
.loginbtn{
  @include btn($size:16px,$color:#444,$bgcolor:#ffd100,$padding:5px,$radius:4px)
  width: 100%;
  display: block;
  border: none;
  height: 42px;
  letter-spacing: 24px;
  text-indent: 24px;
}
.loginbtn-disabled{
  color: #bbb;
  background: #eee;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: default;
}
.go-reg{
  font-size: 12px;
  color: #4a85e0;
  cursor: pointer;
}
.g-bd{
  width: 1100px;
  min-height: 750px;
  margin: 0 auto;
  background: #fff;
  .ma{
    width: 100%;
    margin: 0;
  }
}
</style>
