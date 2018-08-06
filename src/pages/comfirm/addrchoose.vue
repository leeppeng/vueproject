<template>
  <div class="m-address f-pr">
    <h2 class="bggray">收货信息</h2>
    <div class="head">
      <i></i><em>默认地址</em>
    </div>
    <div class="msg">
      <span><em>收货人:</em>{{addr.name}}</span>
      <span class="phone"><em>联系方式&nbsp;:&nbsp;</em>{{addr.cellphone}}</span>
    </div>
    <div class="address">
      <p class="txt"><em>收货地址&nbsp;:&nbsp;</em>{{addr.provinceCity}}{{addr.detailAddress}}</p>
    </div>
    <div class="line f-pa"></div>
    <div class="modify f-pa">
      <a href="javascript:;" class="s-fcff f-blk" @click="huanAddr">更换收货地址</a>
      <a href="javascript:;" class="btn-b f-mgt5 f-blk" @click="addAddr">新建地址</a>
    </div>
    <m-dialog :isShow="isShow" @on-close="closeDialog">
      <div class="addrform">
        <h3>填写收货地址</h3>
        <addr-dialog @on-save="saveAddr"></addr-dialog>
      </div>
    </m-dialog>
    <m-dialog :isShow="ChangeisShow" @on-close="closeChangeDialog">
      <div class="addrform">
        <h3>更换收货地址</h3>
        <div class="zcnt">
          <ul class="addrbox">
            <li v-for="(item,index) in alladdr" :key="index" @click="chooseAddr(index)" :class="{'z-sel':addrIndex===index}">
              <div class="itm name">
                <span class="des f-fl">收 货 人&nbsp; :</span>
                <em class="f-fl f-thide">{{item.name}}</em>
              </div>
              <div class="itm phone">
                <span class="des f-fl">联系方式 :</span>
                <em class="f-fl f-thide">{{item.cellphone}}</em>
              </div>
              <div class="itm detailaddr">
                <span class="des f-fl">收货地址 :</span>
                <em class="f-fl f-thide">{{item.provinceCity}}{{item.detailAddress}}</em>
              </div>
              <div class="default f-pa" v-if="item.defaultAddr">默认地址</div>
            </li>
          </ul>
          <div class="g-addr-btns text_c">
            <a @click="okAddr" class="u-btn-new u-btn-new2">确 定</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <a @click="closeChangeDialog" class="u-btn-new u-btn-new3">取 消</a>
          </div>
        </div>
      </div>
    </m-dialog>
  </div>
</template>
<script>
import MDialog from 'base/dialog/dialog'
import AddrDialog from 'components/addrdialog/addrdialog'
export default {
  components: {
    MDialog,
    AddrDialog
  },
  data() {
    return {
      isShow: false,
      ChangeisShow: false,
      addrIndex: null,
      addr: [],
      alladdr: []
    }
  },
  methods: {
    getAddr() {
      this.$http.post('/api/getAddress').then((res) => {
        let data = res.data.data
        this.alladdr = data
        console.log(typeof data, data)
        data.forEach(item => {
          if (item.defaultAddr) {
            this.addr = item
          }
        })
        console.log(this.addr)
      }, (err) => {
        console.log(err)
      })
    },
    addAddr() {
      this.isShow = !this.isShow
    },
    saveAddr(addr) {
      this.addr = addr
      this.isShow = false
    },
    chooseAddr(index) {
      this.addrIndex = index
    },
    huanAddr() {
      this.ChangeisShow = true
    },
    okAddr() {
      this.addr = this.alladdr[this.addrIndex]
      this.ChangeisShow = false
    },
    closeDialog() {
      this.isShow = false
    },
    closeChangeDialog() {
      this.ChangeisShow = false
    }
  },
  mounted() {
    this.getAddr()
  }
}
</script>

<style lang="scss" scoped>
.m-address{
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  .bggray{
    height: 40px;
    line-height: 40px;
    background: #f4f4f4;
    padding-left:20px;
  }
  .head{
    height: 26px;
    line-height: 26px;
    margin: 30px 0 25px 20px;
    i{
      display: inline-block;
      position: relative;
      top: 4px;
      margin-right: 6px;
      width: 16px;
      height: 20px;
      background: url('../../common/image/dinwei.png');
    }
  }
  .msg{
    height: 26px;
    margin-left: 20px;
    .phone{margin-left: 60px;}
  }
  .address{
    height: 26px;
    margin: 0 0 20px 20px;
    p{width: 850px;}
  }
  .line{
    bottom: 25px;
    right: 214px;
    width: 1px;
    height: 60px;
    background-color: rgba(0, 0, 0, 0.05);
  }
  .modify{
    top: 100px;
    right: 57px;
    a{
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      display: block;
    }
  }
  .btn-b{border: 1px solid rgba(0, 0, 0, 0.2);}
  .s-fcff{color: #0c73c2;}
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
  .zcnt{
    padding: 20px 14px 20px 20px;
    .addrbox{
      height: 300px;
      margin: 10px auto;
      overflow-y: auto;
      li{
        width: 608px;
        padding-top: 15px;
        overflow: hidden;
        cursor: pointer;
        border: 1px solid #f4f4f4;
        margin-bottom: 10px;
        position: relative;
        .itm{
          height: 30px;
          font-size: 14px;
          color: #333;
          .des{
            width: 70px;
            margin-right: 10px;
            text-align: right;
            color: #999;
          }
        }
        .default{
          top: 59px;
          right: 20px;
          padding: 1px 2px;
          border: 1px solid #d33a31;
          color: #d33a31;
        }
      }
      li.z-sel{
        border: 2px solid #c00;
      }
    }
    .u-btn-new{
      display: inline-block;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background-color: #d33a31;
      color: #fff;
      font-size: 16px;
      text-decoration: none;
      width: 140px;
    }
    .u-btn-new3{
      display: inline-block;
      text-align: center;
      width: 138px;
      height: 38px;
      background-color: #fff;
      color: #333;
      border: 1px solid rgba(0, 0, 0, 0.15);
    }
  }
}
</style>
