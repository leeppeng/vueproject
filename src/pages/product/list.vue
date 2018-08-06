<template>
<div class="m-product">
    <ul class="list">
        <li v-for="(product, index) in productList" :key="index">
            <a class="cover f-pr f-blk j-statistics" target="_blank"  @click="goDetail(product.id)">
                <img v-lazy="'/static/'+product.coverUrl" class="f-img">
            </a>
            <div class="cnt f-tc">
                <h3 class="f-thide2">
                  <span class="tag f-red"><em>{{ product.tags[0] }}</em></span>
                  <a target="_blank" href="">{{ product.name }}</a>
                </h3>
                <p class="txt f-thide">
                    ¥<em>{{ product.price }}</em>
                </p>
            </div>
        </li>
    </ul>
</div>
</template>
<script>
export default {
  props: {
    productList: {
      type: Array,
      default: () => {}
    }
  },
  data () {
    return {

    }
  },
  methods: {
    goDetail(id) {
      // console.log(id)
      this.$emit('go-detail', id)
    }
  }
}
</script>
<style lang="scss">
@import "~common/css/mixin.scss";
.m-product .list {
  @include list(row);
  margin-top: 20px;
  li {
    position: relative;
    width: 263px;
    height: 382px;
    padding-right: 16px;
    &:nth-child(4n){
      padding-right: 0px;
    }
    .cover {
      width: 263px;
      height: 263px;
      background-color: #f9f9f9;
      cursor: pointer;
      position: relative;
      zoom: 1;
      display: block;
      img {
        width: 263px;
        height: 263px;
      }
    }
    .cnt {
      margin-top: 10px;
      text-align: center;
      h3{
        font-size: 14px;
        line-height: 18px;
        font-weight: normal;
        color: #333;
        .tag{
          overflow: hidden;
          box-sizing: border-box;
          line-height: 19px;
          padding: 0 3px;
          border-radius: 1px;
          border: 1px solid #d74d45;
          font-size: 12px;
        }
      }
      .txt{
        font-size: 16px;
        color: #d33a31;
        padding-top: 4px;
        word-wrap: normal;
      }
    }
  }
}
</style>
