<template>
<div>
  <div class="dialogbox">
    <div class="dialog-bg" v-if="isShow" @click="dialogClose"></div>
    <div class="dialog-content" v-if="isShow">
      <span class="dialog-close f-fr" @click="dialogClose">×</span>
      <slot>123</slot>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

    }
  },
  methods: {
    dialogClose() {
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialogbox{
  .dialog-bg{
    background: rgba(0,0,0,0.6);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
  }
  .dialog-content{
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .dialog-close{
      position: absolute;
      top: 0px;
      right: 0px;
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      background: rgba(0, 0, 0, 0.16);
      border-bottom-left-radius: 30px;
      color: #fff;
      font-size: 50px;
      cursor: pointer;
      &:hover{
        background: rgba(0, 0, 0, 0.7);
      }
    }
  }
}
</style>
