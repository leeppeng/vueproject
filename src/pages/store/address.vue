<template>
<div id="g-main" class="mn mn-order">
  <div class="n-address" id="module-root">
    <div class="n-address" id="my-address" v-if="addressList.length>=1">
      <div class="address-title">
        <em>我的收货地址</em>
        <span>(共1条，最多保存10条)</span>
        <div @click="addNewaddr" class="n-address-btn">
          <a href="javascript:;">
            <i>+</i>新建收货地址
          </a>
        </div>
      </div>
      <dl class="th">
        <dt class="dt1">收货人</dt>
        <dt class="dt2">收货地址</dt>
        <dt class="dt3">联系电话</dt>
        <dt class="dt4">操作</dt>
      </dl>
      <div class="list j-flag" id="addList">
        <dl class="tr" v-for="(item,index) in addressList" :key="index">
          <dd class="dt1 f-brk"><span>{{item.name}}</span></dd>
          <dd class="dt2"><span class="f-pre">{{item.provinceCity}}{{item.detailAddress}}</span></dd>
          <dd class="dt3">{{item.cellphone}}</dd>
          <dd class="dt4">
            <!--a href="javascript:;" class="edit">修改</a-->
            <a href="javascript:;" class="delete j-delete" @click="delectAddr(index)">删除</a>
            <span class="dftbtn f-fr j-dftbtn" v-if="item.defaultAddr">默认地址</span>
            <span class="setdftbtn f-fr j-dftbtn" v-else @click="setDefault(index)">设为默认地址</span>
          </dd>
        </dl>
      </div>
    </div>
    <div class="zcnt" v-else>
      <addr-dialog @on-save="OnSave"></addr-dialog>
    </div>
  </div>
  <m-dialog :isShow="isShow" @on-close="dialogClose">
    <div class="addrform">
      <h3>填写收货地址</h3>
      <addr-dialog @on-save="OnSave"></addr-dialog>
    </div>
  </m-dialog>
</div>
</template>
<script>
import CitySelect from 'base/controls/CitySelect'
import MDialog from 'base/dialog/dialog'
import AddrDialog from 'components/addrdialog/addrdialog'
export default {
  components: {
    CitySelect,
    MDialog,
    AddrDialog
  },
  data() {
    return {
      isShow: false,
      addressList: [],
      checked: false
    }
  },
  methods: {
    getAddress(ssx) {
      // this.$http.post('/api/getAddress').then((res) => {
      //   this.addressList = res.data.data
      // }, (err) => {
      //   console.log(err)
      // })
    },
    getSsx(ssx) {
      this.ssx = ssx
    },
    setDefault(addrId) {
      // 设置默认地址（应为id判断，无后台，此处为index索引判断）
      this.addressList.forEach((addr, index) => {
        if (addrId === index) {
          addr.defaultAddr = true
        } else {
          addr.defaultAddr = false
        }
      })
    },
    addNewaddr() {
      this.isShow = true
    },
    dialogClose() {
      this.isShow = false
    },
    OnSave (arr) {
      // 添加新地址，如设为默认，改变前面地址状态
      if (arr.defaultAddr) {
        this.addressList.forEach((value, index) => {
          value.defaultAddr = false
        })
      }
      this.addressList.push(arr)
      this.isShow = false
    },
    delectAddr(ind) {
      this.addressList.splice(ind, 1)
    }
  },
  mounted() {
    this.getAddress()
  }
}
</script>

<style lang="scss" scoped>
@import "~common/css/mixin.scss";
.g-bd .mn-order {
  width: 870px;
  margin-left: 229px;
  .n-address {
    margin-bottom: 60px;
    .address-title{
      height: 35px;
      line-height: 35px;
      margin: 21px 0 21px 0;
      em{
        font-size: 16px;
        font-weight: 600;
        color: #333;
        font-style: normal;
      }
      span{
        margin-left: 10px;
        font-size: 12px;
        color: #999;
      }
      .n-address-btn {
        width: 129px;
        height: 26px;
        line-height: 26px;
        position: relative;
        top: 3px;
        float: right;
        color: #333;
        border: 1px solid #d9d9d9;
        background-color: white;
        a {
          display: block;
          padding-left: 35px;
          font-size: 12px;
        }
        i {
          position: absolute;
          left: 15px;
          color: #d33a31;
          font-size: 21px;
        }
      }
    }
  }
}

.n-address dl.th {
  @include list(row);
  height: 38px;
  line-height: 38px;
  border: solid 1px #d9d9d9;
  background-color: #f5f5f5;
  font-size: 14px;
  color: #999;
  border-bottom: solid 1px #e3e3e3;
}
.n-address .dt1 {
  width: 115px;
  padding-left: 30px;
  padding-right: 10px;
}
.n-address .dt2 {
  width: 327px;
  padding-right: 20px;
}
.n-address .dt3 {
  width: 88px;
  text-align: center;
}
.n-address .dt4 {
  position: relative;
  width: 278px;
}
.n-address dl.th .dt4 {
  text-indent: 55px;
}
.n-address .list {
  border-left: solid 1px #e5e5e5;
  border-right: solid 1px #e5e5e5;
  overflow: hidden;
  dl.tr{
    @include list(row);
    dd{
      height: 76px;
      line-height: 76px;
      border-bottom: solid 1px #efefef;
      .delete {
        margin-left: 55px;
        color: #0c73c2;
      }
      .dftbtn {
        height: 16px;
        line-height: 16px;
        margin-top: 29px;
        margin-right: 38px;
        padding: 0 3px;
        border: 1px solid #d33a31;
        color: #d33a31;
        cursor: pointer;
      }
      .setdftbtn {
        display: none;
        height: 16px;
        line-height: 16px;
        margin-top: 32px;
        margin-right: 30px;
        color: #0c73c2;
        cursor: pointer;
      }
    }
    &:hover .setdftbtn{
      display: block;
    }
  }
}
.addrform{
  background: #fff;
  border-radius: 4px 4px 0 0;
  h3{
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px 4px 0 0;
    background-color: #f6f6f6;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    border-radius: 3px 3px 0 0;
    font-weight: 600;
    font-size: 16px;
    color: #666;
  }
}
</style>
