<template>
<div class="counter-component">
  <div class="counter-btn" @click="minus"> - </div>
  <div class="counter-show">
    <input type="text" v-model="number" @keyup="fixNumber">
  </div>
  <div class="counter-btn" @click="add"> + </div>
</div>
</template>
<script>
export default {
  props: {
    num: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 66
    },
    min: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      number: this.num
    }
  },
  methods: {
    fixNumber() {
      let fix
      if (typeof this.number === 'string') {
        fix = Number(this.number.replace(/\D/g, ''))
      } else {
        fix = this.number
      }
      if (this.number > this.max) {
        fix = this.max
      }
      if (this.number < this.min) {
        fix = this.min
      }
      this.number = fix
    },
    minus() {
      if (this.number <= this.min) {
        this.number = this.min
      } else {
        this.number--
      }
    },
    add() {
      if (this.number >= this.max) {
        this.number = this.max
      } else {
        this.number++
      }
    }
  },
  watch: {
    number() {
      this.$emit('on-change', this.number)
    }
  }
}
</script>
<style lang="scss" scoped>
.counter-component{
  position: relative;
  display: inline-block;
  overflow: hidden;
  user-select: none;
  .counter-show{
    float: left;
    input{
      border: none;
      border-top: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      height: 30px;
      line-height: 30px;
      width: 60px;
      text-align: center;
      outline: none;
      text-indent:4px;
      box-sizing: border-box;
    }
  }
  .counter-btn{
    font-size: 22px;
    border: 1px solid #e3e3e3;
    float: left;
    height: 30px;
    line-height: 30px;
    width: 30px;
    text-align: center;
    cursor: pointer;
    box-sizing: border-box;
  }
}
</style>
