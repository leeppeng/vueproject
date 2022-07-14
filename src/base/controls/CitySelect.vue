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
        // this.cityList = res.data
        console.log(res.data)
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
