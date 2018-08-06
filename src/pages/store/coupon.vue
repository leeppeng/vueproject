<template>
<div id="g-main" class="mn mn-order">
  <div id="module-root">
    <div class="m-coupon-header f-pr">
      <p class="tit f-fs16">
        <span>我的优惠券(0)</span>
        <a href="/store/couponintroduction" class="s-fcLink f-pr f-fs12">优惠券说明 &gt;</a>
      </p>
      <div class="m-input f-pa">
        <form>
          <input type="text" class="input" placeholder="请输入兑换码">
          <a href="" class="btn">兑换</a>
        </form>
      </div>
    </div>
    <div class="no-coupon f-tc">
      <i></i>
      <em>暂无优惠券</em>
    </div>
  </div>
</div>
</template>
<style lang="scss" scoped>
.g-bd .mn-order {
    width: 870px;
    margin-left: 229px;
}
.m-coupon-header {
    margin-top: 30px;
    position: relative;
    zoom: 1;
}
.m-coupon-header .tit {
    font-weight: bold;
    font-size: 16px;
}
.m-coupon-header .tit a {
    top: -2px;
    right: -330px;
    color: #328ad4;
}
.m-coupon-header .m-input {
    right: 0;
    top: -4px;
}
.f-pa {
    position: absolute;
}
.m-coupon-header .m-input .input {
    width: 240px;
    height: 27px;
    border: 1px solid #d9d9d9;
    padding-left: 10px;
}
.m-coupon-header .btn {
    display: inline-block;
    width: 95px;
    height: 29px;
    line-height: 28px;
    text-align: center;
    color: #fff;
    background-color: #d33a31;
}
.m-coupon-header .m-input .btn {
    position: relative;
    top: -1px;
    margin-left: -5px;
}
.no-coupon {
    margin: 100px auto 110px auto;
}
.no-coupon i {
    display: block;
    width: 141px;
    height: 96px;
    margin: 0 auto;
    background: url('../../common/image/volcard-none.png') no-repeat;
}
.no-coupon em {
    font-size: 20px;
    color: #999;
    text-align: center;
}
</style>
