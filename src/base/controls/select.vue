<template>
<div class="u-slt f-ib">
  <span class="curr f-thide" @click="toggleSheng">{{defaultVal}}</span>
  <a class="btn" href="javascript:;" ><i class="u-icn u-icn-slt"></i></a>
  <ul v-if="Fhide">
    <li class="f-thide" v-for="(item,index) in selections" :key="index" @click="chooseSelection(index,item)"><a href="javascript:;">{{item}}</a></li>
  </ul>
</div>
</template>
<script>
import { eventBus } from '../../eventBus'
export default {
  props: {
    selections: {
      type: Array,
      default: () => []
    },
    initialVal: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      nowIndex: 0,
      Fhide: false,
      defaultVal: this.initialVal
    }
  },
  mounted() {
    eventBus.$on('reset-component', () => {
      this.Fhide = false
    })
  },
  methods: {
    toggleSheng(event) {
      event.stopPropagation()
      // console.log(this.Fhide)
      eventBus.$emit('reset-component')
      // console.log(this.Fhide)
      this.Fhide = !this.Fhide
    },
    chooseSelection(ind, item) {
      this.nowIndex = ind
      this.defaultVal = this.selections[ind]
      // this.Fhide = false
      // console.log(this.Fhide)
      this.$emit('on-change', item)
    }
  },
  watch: {
    initialVal(val) {
      this.defaultVal = val
    }
  }
}
</script>
<style lang="scss" scoped>
.u-slt{
  width: 198px;
  vertical-align: middle;
  margin-right: 10px;
  height: 35px;
  border: 1px solid #e5e5e5;
  position: relative;
  cursor: pointer;
  display: inline-block;
  .curr{
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
  }
  .u-icn{
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    background: url('../../common/image/icon.png') no-repeat 0 9999px;
  }
  .u-icn-slt{
    width: 12px;
    height: 8px;
    background-position: -96px -76px;
  }
  .u-icn-slt{
    position: absolute;
    top: 11px;
    right: 9px;
  }
  .u-icn-slt{
    position: absolute;
    top: 11px;
    right: 9px
  }
  ul{
    z-index: 99;
    width: 198px;
    max-height: 136px;
    top: 29px;
    left: -1px;
    position: absolute;
    overflow: auto;
    background: #fff;
    border: 1px solid #cdcdcd;
    border-top: none;
    li{
      line-height: 26px;
      word-wrap: normal;
      a{
        display: block;
        height: 26px;
        padding-left: 9px;
        color: #666
      }
    }
  }
}
</style>
