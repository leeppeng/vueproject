<template>
<ul class="choose f-cb">
  <li class="f-pr" v-for="(item, index) in chooses" :key="index" @click="Choose(index)" :class="{'active':nowIndex===index}">
    <p>{{item.name}}</p>
  </li>
</ul>
</template>
<script>
export default {
  props: {
    chooses: {
      type: Array
    }
  },
  data() {
    return {
      nowIndex: 0
    }
  },
  methods: {
    Choose(ind) {
      this.nowIndex = ind
      this.$emit('on-change', this.chooses[this.nowIndex].id)
    }
  }
}
</script>

<style lang="stylus" scoped>
ul.choose
  overflow hidden
  width 510px
  float left
  margin-bottom -8px
  li
    float: left
    margin-right: 10px
    padding: 0 20px
    border: 1px solid #e5e5e5
    background: #fff
    cursor: pointer
    box-sizing border-box
    height 30px
    margin-bottom 10px
    line-height 27px
    text-align center
    font-size 12px
  li.active
    border-color #c00
    color #c00
</style>
