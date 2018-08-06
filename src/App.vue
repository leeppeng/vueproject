<template>
<div id="app">
  <div @click="resetComponent">
    <m-header></m-header>
    <router-view/>
    <m-footer></m-footer>
    <!-- <router-view/> -->
  </div>
</div>
</template>

<script>
import { eventBus } from './eventBus'
import MHeader from 'components/header/header'
import MFooter from 'components/footer/footer'
export default {
  components: {
    MHeader,
    MFooter
  },
  methods: {
    resetComponent() {
      eventBus.$emit('reset-component')
    }
  }
}
</script>
<style lang="scss">
@import "common/css/reset.scss";
</style>
