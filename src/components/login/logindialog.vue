<template>
<article class="login">
  <h3 class="text_c">欢迎登陆</h3>
  <div class="formbox">
    <!--form action="" name="formbox"></form-->
      <div class="item">
        <div class="input"><input class="int" type="text" placeholder="请输入账号"  v-model="name"></div>
      </div>
      <div class="item">
        <div class="input"><input class="int" type="password" placeholder="请输入密码"  v-model="password"></div>
      </div>
      <div class="item f-red">{{errorText}}</div>
      <div class="item forget">
        <div class="input text_r">
          <span class="f-fr"><a href="">忘记密码?</a></span>
          <label class="f-fl" for="remember_psd">
            <input type="checkbox" id="remember_psd" class="f-fl">记住密码
          </label>
        </div>
      </div>
      <div class="item">
        <button type="submit" class="loginbtn" :class="{'loginbtn-disabled':disabled}" :disabled="disabled" @click="loginBtn">登陆</button>
      </div>
    <div class="go-reg" @click="goReg">去注册</div>
  </div>
</article>
</template>
<script>
export default {
  data() {
    return {
      name: '',
      password: '',
      disabled: true,
      naemFlag: false,
      psdFlag: false,
      errorText: ''
    }
  },
  methods: {
    dis: function() {
      if (this.naemFlag && this.psdFlag) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    loginBtn() {
      this.$http.post('/api/getLogin', {
        name: this.name,
        password: this.password
      }).then((res) => {
        // console.log(res.data.data.name)
        let data = res.data.data
        // let data = res.data.getLogin
        if (this.name === data.name && this.password === data.password) {
          this.$emit('has-log', data)
        } else {
          this.errorText = '用户名或密码错误'
        }
      }, (err) => {
        console.log(err)
      })
    },
    goReg() {
      this.$emit('go-reg')
    }
  },
  watch: {
    name: function(val, oldVal) {
      if (val.length > 0) {
        this.naemFlag = true
      } else {
        this.naemFlag = false
      }
      this.dis()
    },
    password: function(val, oldVal) {
      if (val.length > 0) {
        this.psdFlag = true
      } else {
        this.psdFlag = false
      }
      this.dis()
    }
  }
}
</script>
