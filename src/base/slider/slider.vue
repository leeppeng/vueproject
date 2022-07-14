<template>
<div class="banner" @mousemove="clearInv" @mouseout="runInv">
  <div>
    <ul>
      <li class="active">
        <a href=""><img :src="sliders[nowIndex].src" alt="banners"></a>
      </li>
    </ul>
    <div class="dots">
      <a
      v-for="(item, index) in sliders"
      :key="index"
      :class="{'z-sel': index === nowIndex}"
      @click="goto(index)"></a>
    </div>
    <div class="point">
      <a @click="goto(goprev)" class="left"><i class="tk"></i></a>
      <a @click="goto(gonext)" class="right"><i class="tk"></i></a>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      nowIndex: 0,
      invTime: 2000,
      sliders: [
        {
          src: require('../../common/image/showslider/ban1.jpg'),
          title: 'xxx1'
        },
        {
          src: require('../../common/image/showslider/ban2.jpg'),
          title: 'xxx2'
        },
        {
          src: require('../../common/image/showslider/ban3.jpg'),
          title: 'xxx3'
        },
        {
          src: require('../../common/image/showslider/ban4.jpg'),
          title: 'xxx4'
        }
      ]
    }
  },
  computed: {
    goprev () {
      if (this.nowIndex === 0) {
        return this.sliders.length - 1
      } else {
        return this.nowIndex - 1
      }
    },
    gonext () {
      if (this.nowIndex === this.sliders.length - 1) {
        return 0
      } else {
        return this.nowIndex + 1
      }
    }
  },
  methods: {
    goto (index) {
      this.nowIndex = index
    },
    runInv () {
      clearInterval(this.invId)
      this.invId = setInterval(() => {
        this.goto(this.gonext)
      }, this.invTime)
    },
    clearInv () {
      clearInterval(this.invId)
    }
  },
  mounted () {
    this.runInv()
  }
}
</script>

<style scoped lang="scss" rel="stylesheet/sass">
.banner{
  width: 100%;
  min-width: 1100px;
  height: 480px;
  overflow: hidden;
  position: relative;
  ul{
    height: 480px;
    li{
      top: 0;
      left: 0;
      width: 100%;
      height: 480px;
      background-repeat: repeat-x;
      background-size: cover;
      a{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 1100px;
        height: 480px;
        margin-top: -240px;
        margin-left: -550px;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .dots{
    position: absolute;
    width: 100%;
    z-index: 2;
    bottom: 30px;
    text-align: center;
    a{
      display: inline-block;
      width: 8px;
      height: 8px;
      margin: 0 3px;
      background: #fff;
      border-radius: 8px;
      cursor: pointer;
    }
    a.z-sel{
      background: #c00;
    }
  }
  .point{
    position: relative;
    z-index: 2;
    top: -294px;
    a{
      position: absolute;
      z-index: 1;
      width: 37px;
      height: 63px;
      top: 0;
      cursor: pointer;
      background-color: #000;
      opacity: 0.1;
      &:hover{
        opacity: 0.8;
      }
      i.tk{
        position: absolute;
        z-index: 2;
        display: block;
        width: 100%;
        height: 100%;
        background: url('../../common/image/pointlist.png') no-repeat 0 9999px;
      }
    }
    a.left{
      left: 12px;
      i.tk{
        background-position: 0px -0px;
        opacity: 0.8;
      }
    }
    a.right{
      right: 12px;
      i.tk{
        background-position: -48px -0px;
        opacity: 0.8;
      }
    }
  }
}
</style>
