<template lang="pug">
  div#app
    keep-alive
      router-view
</template>

<script>
  export default {
    name: 'App'
  }
</script>
<style lang="stylus" type="text/stylus">
  @import './assets/iconfont/iconfont.css'
  @import './assets/css/icon-font.css'
  @import './assets/css/fa-font.css'
  @import "~@/assets/stylus/comm.styl"
  #app
    height 100%
</style>
