<template>
<article class="login">
  <h3 class="text_c">欢迎注册</h3>
  <div class="formbox">
    <!--form action="" name="formbox"></form-->
      <div class="item">
        <div class="input"><input class="int" type="text" placeholder="请输入账号"  v-model="name"></div>
      </div>
      <div class="item">
        <div class="input"><input class="int" type="password" placeholder="请输入密码"  v-model="password"></div>
      </div>
      <div class="item">
        <button type="submit" class="loginbtn" :class="{'loginbtn-disabled':disabled}" :disabled="disabled" @click="RegBtn">注册</button>
      </div>
    <div class="go-reg" @click="goReg">去登陆</div>
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
      psdFlag: false
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
    RegBtn() {
      this.$http.get('/api/getLogin').then((res) => {
        this.$emit('has-log', res.data)
      }, (err) => {
        console.log(err)
      })
    },
    goReg() {
      this.$emit('go-login')
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
<style lang="stylus" scoped>

</style>
