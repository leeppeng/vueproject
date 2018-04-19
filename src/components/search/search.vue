<template>
<div class="search f-fl">
    <div class="inputwrap">
        <!--div class="form" @click="getFocus">{{searchinput}}</div-->
        <form action="" class="form">
            <input type="txt" class="searchbox" autocomplete="off" v-model="searchinput" placeholder="笔记本" @click="getFocus" >
        </form>
    </div>
    <div class="wrap" :class="{'block': serlist}">
        <div class="m-hot-search-words">
            <div class="shadow"></div>
            <h2>热门搜索</h2>
            <ul class="list">
                <li class="" v-for="(item, index) in serchlist" :key="index" @click="hotseearch(item.name)">{{ item.name }}</li>
            </ul>
        </div>
        <div class="m-search-history"></div>
    </div>
</div>
</template>
<script>
import { eventBus } from '../../eventBus'
export default {
  data() {
    return {
      serlist: false,
      searchinput: '',
      serchlist: [
        {
          name: '耳机'
        },
        {
          name: '帆布袋'
        },
        {
          name: '耳坠'
        },
        {
          name: '尤克里里'
        },
        {
          name: '数据线'
        }
      ]
    }
  },
  mounted() {
    eventBus.$on('reset-component', () => {
      this.serlist = false
    })
  },
  methods: {
    getFocus(event) {
      event.stopPropagation()
      eventBus.$emit('reset-component')
      this.serlist = !this.serlist
    },
    hotseearch(name) {
      this.searchinput = name
      this.serlist = false
      this.$router.push({
        path: '/product?q=' + this.searchinput
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.search
    width 300px
    height 70px
    margin-left 334px
    .inputwrap
        width 300px
        height 69px
        padding-top 1px
        .form
            width 100%
            height 36px
            margin-top 15px
            border 1px solid #ddd
            border-radius 40px
            background-position 0px -0px
            background-image url('../../common/image/search.svg')
            background-size: 20px
            background-repeat: no-repeat
            background-position: 10px
        input
            width: 80%
            margin: 10px 0 0 34px
            border: 0
            background: transparent
    .wrap
        position: absolute
        z-index: 999
        top: 56px
        width: 300px
        height: auto
        display none
        background-color: #fff
        box-shadow: 0 4px 7px #555
        text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9)
        h2
            width: 280px
            height: 33px
            padding-left: 20px
            line-height: 34px
            font-size: 12px
            border-bottom: 1px solid rgba(0, 0, 0, 0.1)
        ul li
            width: 280px
            height: 34px
            padding-left: 20px
            line-height: 34px
            font-size: 14px
            color: #888
            cursor: pointer
            &:hover
              background #eee
    .block
      display block
</style>