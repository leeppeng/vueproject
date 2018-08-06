<template>
<div class="m-bread">
  <div class="block">
    <span><router-link :to="{path:'/'}">首页</router-link></span>
    <span class="pointer"><i></i><slot></slot></span>
  </div>
</div>
</template>
<style lang="scss" scoped>
.m-bread{
  min-height: 30px;
  margin-bottom: 15px;
  border-bottom: 1px solid #333;
  .block{
    padding: 30px 0 19px 0;
    font-size: 18px;
    font-weight: 600;
  }
  .pointer{
    font-size: 16px;
    color: #999;
  }
  i{
    position: relative;
    top: 7px;
    display: inline-block;
    width: 16px;
    height: 26px;
    margin: 0 4px 0 8px;
    background: url(../../common/image/ar.png) no-repeat left center;
  }
}
</style>
