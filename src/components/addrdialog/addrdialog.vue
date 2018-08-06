<template>
<div>
<form class="m-addressform">
  <div class="ztr name">
    <span class="th f-ib">收 货 人</span>
      <input name="name" type="text" class="u-txt" placeholder="为了提高发货速度，请填写您的真实姓名" v-model="addrName">
    <span class="err j-flag"></span>
  </div>
  <div class="ztr phone">
    <span class="th f-ib">手机号码</span>
    <input name="cellphone" type="text" class="u-txt" v-model="addrPhone">
    <p class="err j-flag" :class="{'z-show':yzphone}"><i class="f-ib"></i>手机号应该是11位数字</p>
  </div>
  <div class="ztr indexh address j-flag">
    <span class="th f-ib">收货地区</span>
    <city-select @on-change="getSsx"></city-select>
  </div>
  <div class="ztr detail">
    <span class="th f-ib">详细地址</span>
    <textarea name="detailAddress" class="u-txt area" cols="30" rows="10" placeholder="无需重复填写省市区，小于120字"  v-model="address"></textarea>
    <span class="err addrserr j-flag"></span>
    <div class="setdefault" id="setdftbox">
      <label>
        <input type="checkbox" name="" v-model="checked" class="f-fl"><span>设为默认地址</span>
      </label>
    </div>
  </div>
  <div class="pdh">
    <a href="javascript:;" class="u-btn-save" @click="saveAddr">保存新地址</a>
  </div>
</form>
</div>
</template>
<script>
import CitySelect from 'base/controls/CitySelect'
export default {
  components: {
    CitySelect
  },
  data() {
    return {
      addressList: [],
      addrid: 10001,
      addrName: '',
      addrPhone: '',
      ssx: '',
      address: '',
      checked: false,
      yzphone: false
    }
  },
  methods: {
    getAddress(ssx) {
      // this.$http.post('/api/getAddress').then((res) => {
      //   this.addressList = res.data.data
      // }, (err) => {
      //   console.log(err)
      // })
    },
    getSsx(ssx) {
      this.ssx = ssx
    },
    saveAddr() {
      if (this.addrPhone.length < 11) {
        this.yzphone = true
        return
      }
      let arr = {'id': this.addrid, 'name': this.addrName, 'cellphone': this.addrPhone, 'provinceCity': this.ssx + this.address, 'defaultAddr': this.checked}
      this.$emit('on-save', arr)
    }
  },
  mounted() {
    this.getAddress()
  }
}
</script>
<style lang="scss" scoped>
.m-addressform{
  background: #fff;
  padding: 10px 30px 30px;
  .ztr{
    margin-top: 20px;
    span.th{
      width: 61px;
      line-height: 32px;
      font-size: 14px;
      margin-right: 12px;
      vertical-align: top;
      text-align: right;
      display: inline-block;
    }
    .u-txt{
      width: 296px;
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      background: none;
      border: 1px solid #e5e5e5;
      border-radius: 0px;
      height: 19px;
      margin: 0;
      padding: 5px 6px 6px;
    }
    p.err{
      display: none;
      z-index: 1;
      bottom: 8px;
      height: 16px;
      line-height: 16px;
      margin-left: 78px;
      margin-top: 10px;
      color: #e33232;
    }
    p.z-show{
      display: block;
    }
  }
  .detail{
    display: block;
    width: 704px;
    left: 0;
    top: 124px;
    .area{
      width: 610px;
      height: 99px;
    }
  }
  .setdefault{
    margin-left: 52px;
    margin-top: 10px;
    label{
      margin-left: 24px;
      display: block;
    }
    span{
      position: relative;
      color: #666;
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .pdh{
    padding: 20px 0 30px 77px;
  }
  .u-btn-save{
    display: inline-block;
    padding: 0;
    width: 160px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
    background: #cb3b3b;
    color: #fff;
  }
}
</style>
