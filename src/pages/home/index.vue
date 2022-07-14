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
                        <img src="../../common/image/gg1.jpg" alt="">
                    </a>
                </div>
                <div class="subj ">
                    <a href="" target="_blank">
                        <img src="../../common/image/gg2.jpg" alt="">
                    </a>
                </div>
            </div>
            <div class="m-block" id="m-block-hot">
                <span class="mid-txt mid-bold">热销产品</span>
                <div id="recmd-list">
                    <index-product
                    :product-list="productList"
                    @go-detail="goDetail"
                    ></index-product>
                    <!-- 分页start -->
                    <m-page
                    :page-index="currentPage"
                    :total="count"
                    :page-size="pageSize"
                    @on-change="getPageData"></m-page>
                    <!-- 分页end -->
                </div>
            </div>
            <m-advertising></m-advertising>
        </div>
    </div>
</div>
</div>
</template>
<script>
import ShowSider from 'base/slider/slider'
import GTab from './g-tab'
import MAdvertising from 'components/advertising/index'
import IndexProduct from './indexProduct'
import MPage from 'base/page/page'
export default {
  components: {
    ShowSider,
    GTab,
    MAdvertising,
    IndexProduct,
    MPage
  },
  data() {
    return {
      productList: [],
      result: [],
      pageSize: 8, // 每页显示20条数据
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
      window.scrollTo(0, 976)
    }
  },
  mounted() {
    this.getProduct()
  }
}
</script>

<style lang="scss" scoped>
.g-bd {
  padding-bottom: 160px;
}
.subjs {
  width: 100%;
  margin-top: 40px;
  display: flow-root;
}
.subj {
  float: left;
  width: 542px;
  height: 300px;
  img {
    width: 100%;
    height: 100%;
  }
}
.pad-right {
  padding-right: 16px;
}
.m-block {
  width: 100%;
  height: auto;
  margin-top: 50px;
  display: flow-root;
  .mid-txt {
    font-size: 24px;
    color: #333;
  }
  .mid-bold {
    font-weight: bold;
  }
}
</style>
