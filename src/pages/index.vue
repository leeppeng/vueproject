<template>
<div>
<show-sider></show-sider>
<g-tab></g-tab>
<div class="g-bd g-bd-home">
    <div id="g-main" class="ma">
        <div id="module-root" class="n-index">
            <div class="subjs f-cb">
                <div class="subj pad-right">
                    <a href="" target="_blank">
                        <img src="../common/image/gg1.jpg" alt="">
                    </a>
                </div>
                <div class="subj ">
                    <a href="" target="_blank">
                        <img src="../common/image/gg2.jpg" alt="">
                    </a>
                </div>
            </div>
            <div class="m-block" id="m-block-hot">
                <span class="mid-txt mid-bold">编辑推荐</span>
                <div id="recmd-list">
                    <div class="m-product">
                        <ul class="list f-cb">
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
                    <!-- 分页start -->
                    <m-page
                    :page-index="currentPage"
                    :total="count"
                    :page-size="pageSize"
                    @on-change="getPageData"></m-page>
                    <!-- 分页end -->
                </div>
            </div>
            <div id="digalb" class="digalb f-mgt10"  style="background-color:#FFFFF">
                <img src="../common/image/gg.png" alt="">
            </div>
        </div>
    </div>
</div>
</div>
</template>
<script>
import ShowSider from 'base/slider/slider'
import GTab from 'components/g-tab/g-tab'
import MPage from 'base/page/page'
export default {
  components: {
    ShowSider,
    GTab,
    MPage
  },
  data() {
    return {
      productList: [],
      result: [],
      pageSize: 4, // 每页显示20条数据
      currentPage: 1, // 当前页码
      count: 0 // 总记录数
    }
  },
  methods: {
    getProduct() {
      this.$http.get('api/getProduct').then((res) => {
        let productData = []
        productData = res.data.data.hotProduct
        this.count = res.data.data.count
        // 模拟分页-最好前端将页码异步传后台，后台进行分页
        for (var i = 0; i < productData.length; i += this.pageSize) {
          this.result.push(productData.slice(i, i + this.pageSize))
        }
        this.productList = this.result[0]
        console.log(this.result[1])
      }, (err) => {
        console.log(err)
      })
    },
    goDetail(id) {
      this.$router.push({
        path: '/detail?id=' + id
      })
    },
    getPageData(ind) {
      this.productList = this.result[(ind - 1)]
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>

<style lang="stylus" scoped>
.g-bd {
  width: 1100px;
  min-height: 750px;
  margin: 0 auto;
  background: #fff;
  padding-bottom: 160px;
}
.g-bd .ma {
  width: 100%;
  margin: 0;
}
.subjs {
  width: 100%;
  margin-top: 40px;
  display flow-root
}
.subj {
  float: left;
  width: 542px;
  height: 300px;
}
.pad-right {
  padding-right: 16px;
}
.subj img {
  width: 100%;
  height: 100%;
}
.m-block {
  width: 100%;
  height: auto;
  margin-top: 50px;
  display: flow-root;
}
.m-block .mid-txt {
  font-size: 24px;
  color: #333;
}
.m-block .mid-bold {
  font-weight: bold;
}
.m-product .list {
  margin-top: 20px;
  width: 100%;
  height: auto;
  display: flow-root;
  overflow: hidden;
}
.m-product .list li {
  float: left;
  position: relative;
  width: 263px;
  height: 382px;
  padding-right: 16px;
}
.m-product .list li:nth-child(4n){
  padding-right 0px
}
.m-product .cover {
  width: 263px;
  height: 263px;
  background-color: #f9f9f9;
  cursor: pointer;
  position: relative;
  zoom: 1;
  display: block;
}
.m-product .cover img {
  width: 263px;
  height: 263px;
}
.m-product .cnt {
  margin-top: 10px;
}
.f-tc {
  text-align: center;
}
.m-product .cnt h3 {
  font-size: 14px;
  line-height: 18px;
  font-weight: normal;
  color: #333;
}
.f-thide2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.m-product .tag
  overflow: hidden;
  box-sizing: border-box;
  line-height: 19px;
  padding: 0 3px;
  border-radius: 1px;
  border: 1px solid #d74d45;
  font-size: 12px;
  em
    font-style normal
.m-product .cnt .txt
  font-size: 16px
  color: #d33a31
  padding-top: 4px
  word-wrap: normal
  em
    font-style normal
.digalb {
  position: relative;
  width: 100%;
  height: 180px;
  background-color: #f9f9f9;
  cursor: pointer;
}

</style>
