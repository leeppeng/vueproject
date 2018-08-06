<template>
<div>
<div class="g-bd g-bd-home">
  <m-bread>产品中心</m-bread>
  <div id="g-main" class="ma">
    <m-filter @on-filter="onFilter"></m-filter>
    <div id="module-root" class="n-index">
      <div class="m-block" id="m-block-hot">
        <span class="mid-txt mid-bold">编辑推荐</span>
        <div id="recmd-list">
          <m-list
          :product-list="productList"
          @go-detail="goDetail"
          ></m-list>
        </div>
      </div>
      <!-- 分页start -->
      <m-page
      :page-index="currentPage"
      :total="count"
      :page-size="pageSize"
      @on-change="getPageData"></m-page>
      <!-- 分页end -->
      <m-advertising></m-advertising>
    </div>
  </div>
</div>
</div>
</template>
<script>
import MBread from 'components/bread/bread'
import MAdvertising from 'components/advertising/index'
import MFilter from './filter'
import MList from './list'
import MPage from 'base/page/page'
export default {
  components: {
    MBread,
    MAdvertising,
    MFilter,
    MList,
    MPage
  },
  data() {
    return {
      productData: [],
      productList: [],
      result: [],
      pageSize: 8, // 每页显示多少条数据
      currentPage: 1, // 当前页码
      count: 0 // 总记录数
    }
  },
  methods: {
    getProduct() {
      // 'api/getProduct'
      let url = `api/getProduct?pageSize=${this.pageSize}&currentPage=${this.currentPage}`
      this.$http.get(url).then((res) => {
        this.productData = res.data.data.hotProduct
        this.count = res.data.data.count
        // 模拟分页-最好前端将页码异步传后台，后台进行分页
        this.pages(this.productData)
      }, (err) => {
        console.log(err)
      })
    },
    pages(product) {
      for (var i = 0; i < product.length; i += this.pageSize) {
        this.result.push(product.slice(i, i + this.pageSize))
      }
      this.count = product.length
      this.productList = this.result[0]
    },
    onFilter(arr) {
      console.log('当前', this.currentPage)
      let ProductFilters = {
        brandSortFilter: function(products, brandSort) {
          /* 品牌检索 */
          let tmpProducts = []
          if (brandSort.length === 0) {
            return products
          } else {
            brandSort.forEach(SortItem => {
              tmpProducts = tmpProducts.concat(products.filter(function (item) {
                return item.brandSort.toString() === SortItem
              }))
            })
            // console.log('tmpProducts :', tmpProducts)
            return tmpProducts
          }
        },
        /* 分类检索 */
        sortFilter: function(products, sort) {
          let tmpProducts = []
          if (sort.length === 0) {
            return products
          } else {
            sort.forEach(SortItem => {
              tmpProducts = tmpProducts.concat(products.filter(function (item) {
                return item.sort.toString() === SortItem
              }))
            })
            console.log('tmpProducts :', tmpProducts)
            return tmpProducts
          }
        },
        priceFilter: function(products, price) {
          if (price === '') {
            return products
          } else {
            /* 循环多个区间条件，
            * 每种区间类型应该只有一个，
            * 比如价格区间不会有1000-2000和4000-6000同时需要的情况
            */
            products = products.filter(function (item) {
              return item.price >= price.begin && item.price <= price.end
            })
            return products
          }
        }
      }
      function doFilter(products, arr) {
        for (let key in arr) {
          // 判断是否有需要的过滤方法
          if (ProductFilters.hasOwnProperty(key + 'Filter') && typeof ProductFilters[key + 'Filter'] === 'function') {
            products = ProductFilters[key + 'Filter'](products, arr[key])
          }
        }
        // console.log(products)
        return products
      }
      this.result = []
      let productList = doFilter(this.productData, arr)
      // let count = productList.length
      console.log(arr)
      this.pages(productList)
    },
    goDetail(id) {
      this.$router.push({
        path: '../detail?id=' + id
      })
    },
    getPageData(ind) {
      this.productList = this.result[(ind - 1)]
      window.scrollTo(0, 390)
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
