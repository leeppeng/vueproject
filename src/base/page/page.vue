<template>
<div class="page">
  <a href="javascript:;" class="zbtn zprv" @click="goPa(-1)">&lt;</a>
  <a href="javascript:;" class="zpgi"
  v-for="(page,index) in pagers"
  :key="index"
  :class="{'js-selected':nowIndex===page}"
  @click=goPage(page)>{{page}}</a>
  <a href="javascript:;" class="zbtn znxt" @click="goPa(1)">&gt;</a>
</div>
</template>
<script>
export default {
  props: {
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      nowIndex: this.pageIndex, // 当前页码
      limit: this.pageSize, // 每页显示的条数
      size: this.total || 1, // 总条数
      perPages: 5 // 按钮个数
    }
  },
  methods: {
    goPage(page) {
      // 这里不能用索引了（index索引是从0开始）
      if (this.nowIndex !== page) {
        this.nowIndex = page
        this.$emit('on-change', this.nowIndex)
      }
    },
    goPa(lp) {
      if (lp === -1 && this.nowIndex > 1) {
        this.goPage(this.nowIndex - 1)
      }
      if (lp === 1 && this.nowIndex < this.pages) {
        this.goPage(this.nowIndex + 1)
        console.log(this.nowIndex)
      }
    },
    leepeng() {
      // console.log(this.nowIndex, this.limit, this.size)
    }
  },
  computed: {
    pages() {
      return Math.ceil(this.size / this.limit)
    },
    // 计算页码
    pagers() {
      let arr = []
      const perpages = this.perPages
      const pageCount = this.pages
      let current = this.nowIndex
      const step = (perpages - 1) / 2
      const _step = {
        start: current - step,
        end: current + step
      }
      if (_step.start < 1) {
        _step.end = _step.end + (1 - _step.start)
        _step.start = 1
      }
      if (_step.end > pageCount) {
        _step.start = _step.start - (_step.end - pageCount)
        _step.end = pageCount
      }
      if (_step.start < 1) _step.start = 1
      console.log(this.size, step, pageCount, _step.end)
      for (let i = _step.start; i <= _step.end; i++) {
        arr.push(i)
      }
      return arr
    }
  },
  watch: {
    pageIndex(val) {
      this.nowIndex = val || 1
    },
    pageSize(val) {
      this.limit = val || 10
    },
    total(val) {
      this.size = val || 1
    }
  },
  mounted() {
    this.leepeng()
    // console.log()
    // this.pagers()
  }
}
</script>
<style lang="stylus" scoped>
.page
  margin 20px 0
  padding-bottom 30px
  text-align center
  font-size 14px
  color #666
  a
    margin 0 1px 0 2px
    display inline-block
    border 1px solid #ededed
    border-radius 3px
    vertical-align middle
    height 30px
    padding 0 12px
    background-color #fff
    line-height 32px
    &:hover
      border-color #d33a31
      color #fff
      background-color #d33a31
  a.zbtn
    font-family cursive
  a.js-selected, a.js-selected:hover
    background-color #d33a31
    color #fff
    cursor default
  a.zprv.js-disabled, a.zprv.js-disabled:hover
    background-color #ccc
    color #666
    cursor default
    border-color #ccc
</style>
