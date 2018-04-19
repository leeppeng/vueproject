<template>
<span>
  <m-select :selections="Sheng" :initialVal="shengVal" @on-change="getSheng"></m-select>
  <m-select :selections="Shi" :initialVal="shiVal" @on-change="getShi"></m-select>
  <m-select :selections="Xian" :initialVal="xianVal" @on-change="getXian"></m-select>
</span>
</template>
<script>
import MSelect from './select'
export default {
  components: {
    MSelect
  },
  data() {
    return {
      cityList: [],
      Sheng: [],
      Shi: [],
      Xian: [],
      shiValArr: [],
      shengVal: '',
      shiVal: '',
      xianVal: ''
    }
  },
  methods: {
    getCity() {
      this.$http.post('/api/getCity').then((res) => {
        this.cityList = res.data.data
        // console.log(this.cityList)
        for (let value in this.cityList) {
          this.Sheng.push(value)
        }
        for (let value in this.cityList['北京']) {
          this.Shi.push(value)
        }
        for (let value of this.cityList['北京']['北京']) {
          this.Xian.push(value)
        }
        this.shengVal = this.Sheng[0]
        this.shiVal = this.Shi[0]
        this.xianVal = this.Xian[0]
        this.getSSX()
      }, (err) => {
        console.log(err)
      })
    },
    getSheng(val) {
      this.shengVal = val
      this.Shi = []
      this.shiValArr = []
      for (let value in this.cityList[val]) {
        this.Shi.push(value)
      }
      for (let value in this.cityList[val]) {
        this.shiValArr.push(value)
      }
      // console.log(this.shiValArr)
      let sss = this.Shi[0]
      this.Xian = this.cityList[val][sss]
      this.shiVal = this.shiValArr[0]
      this.xianVal = this.Xian[0]
      this.getSSX()
    },
    getShi(val) {
      this.shiVal = val
      // console.log(this.shiVal, '市')
      this.Xian = []
      for (let value of this.cityList[this.shengVal][this.shiVal]) {
        this.Xian.push(value)
      }
      this.xianVal = this.Xian[0]
      this.getSSX()
    },
    getXian(val) {
      this.xianVal = val
      this.getSSX()
    },
    getSSX() {
      let ssx = this.shengVal + this.shiVal + this.xianVal
      this.$emit('on-change', ssx)
      console.log(ssx)
    }
  },
  mounted() {
    this.getCity()
  }
}
</script>

<style lang="stylus" scoped>
.u-slt
  width: 198px;
  vertical-align: middle;
  margin-right: 10px;
  height: 35px;
  border: 1px solid #e5e5e5;
  position: relative;
  cursor: pointer;
  display: inline-block;
  .curr
    width: 148px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    display: block;
    padding-left: 7px;
    word-wrap: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  .u-icn
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    background: url('../../common/image/icon.png') no-repeat 0 9999px;
  .u-icn-slt
    width: 12px;
    height: 8px;
    background-position: -96px -76px;
  .u-icn-slt
    position: absolute;
    top: 11px;
    right: 9px;
  .u-icn-slt
    position: absolute;
    top: 11px;
    right: 9px
  ul
    z-index: 99
    width: 198px
    max-height: 136px
    top: 29px;
    left: -1px;
    position: absolute;
    overflow: auto;
    background: #fff;
    border: 1px solid #cdcdcd;
    border-top: none;
    li
      line-height: 26px;
      word-wrap: normal;
      a
        display: block;
        height: 26px;
        padding-left: 9px;
        color: #666
</style>
