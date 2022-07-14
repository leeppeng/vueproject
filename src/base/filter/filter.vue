<template>
<div id="filter">
  <div class="n-filter" style="">
    <div class="g-wrap">
      <div class="g-inner">
        <div class="tags f-cb">
          <div class="f-cb">
            <span class="title">品牌:</span>
            <ul class="brand f-cb">
              <li
              v-for="(item,index) in filteBrand"
              :key="index"
              :data-id="item.id"
              @click="bChoose(index)"><a class="tag f-bd2" :class="{'z-slt':index==brandIndex}">{{ item.brandName }}</a></li>
            </ul>
            <span class="more" v-if="brandmore" @click="bMore">更多<i></i></span>
            <span class="more shouqi" v-else @click="shouqi">收起<i></i></span>
          </div>
        </div>
        <div class="tags f-cb">
          <div class="f-cb">
            <span class="title">分类:</span>
            <ul class="f-cb">
              <li v-for="(item,index) in kind" :key="index" :data-id="item.id" @click="kChoose(index)"><a class="tag f-bd2" :class="{'z-slt':index==kindIbdex}">{{ item.kindname }}</a></li>
            </ul>
          </div>
        </div>
        <div class="tags f-cb end">
          <span class="title">价格:</span>
          <ul class="f-cb">
            <li v-for="(item,index) in price" :key="index" :data-id="item.id" @click="pChoose(index)"><a class="tag f-bd2" :class="{'z-slt':index==priceIndex}">{{ item.begin }}~{{ item.end }}</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      filters: [],
      brand: [],
      kind: [],
      price: [],
      brandIndex: null,
      kindIbdex: null,
      priceIndex: null,
      brandmore: false,
      limitNum: 15
    }
  },
  computed: {
    filteBrand() {
      return this.brand.slice(0, this.limitNum)
    }
  },
  methods: {
    bChoose(ind) {
      this.brandIndex = ind
    },
    kChoose(ind) {
      this.kindIbdex = ind
    },
    pChoose(ind) {
      this.priceIndex = ind
    },
    bMore() {
      this.limitNum = this.brand.length
      this.brandmore = false
    },
    shouqi() {
      this.limitNum = 15
      this.brandmore = true
    }
  },
  mounted() {
    this.$http.post('api/getFilter').then((res) => {
      this.filters = res.data.data
      this.filters.forEach((item, index) => {
        console.log(item)
        if (item.title === '品牌') {
          this.brand = item.value
          if (this.brand.length >= 15) this.brandmore = true
        }
        if (item.title === '分类') {
          this.kind = item.value
        }
        if (item.title === '价格') {
          this.price = item.value
        }
      })
    }, (err) => {
      console.log(err)
    })
  }
}
</script>

<style lang="stylus" scoped>
.n-filter
  width: 100%
  margin: 20px auto 0 auto
  .g-wrap
    width: 1098px;
    margin: 0 auto;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 14px;
    text-align: center
    .tags
      border-bottom: 1px solid rgba(0, 0, 0, 0.1)
      display: flow-root;
    .title
      float: left;
      width: 80px;
      line-height: 44px;
      color: #999;
      font-weight: 600;
    ul
      width: 938px;
      float: left;
      li
        float: left;
        line-height: 44px;
        padding: 0 4px;
        color: #333;
        .tag
          height: 24px;
          padding: 3px 10px;
          cursor: pointer;
          border-radius: 3px;
        .z-slt
          color: #fff;
          background-color: #000;
          text-decoration: none;
    .more
      float: left;
      width: 60px;
      padding-right: 20px;
      height: 24px;
      margin-top: 10px;
      cursor: pointer;
      i
        float: right;
        width: 14px;
        height: 7px;
        margin-top: 6px;
        background: url('../../common/image/ar2.png') no-repeat 0 9999px;
        background-position: -24px -0px;
    .shouqi i
      transform rotate(180deg)
    .less i
      background-position: 0px -0px;
    input
      width: 66px;
      height: 20px;
      font-size: 14px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      -webkit-appearance: none;
    .diy .to
      padding: 0 4px;
      vertical-align: top;
      color: rgba(0, 0, 0, 0.15);
    .diy .txt
      padding: 0 10px 0 20px;
    .diy .z-dis
      background-color: #ccc;
      color: #fff;
      height: 20px;
      padding: 3px 13px;
      cursor: text;
      line-height: 20px;
      width: 30px;
      font-size: 14px;
      letter-spacing: normal;
      text-indent: 0;
      margin-top: 8px;
</style>
