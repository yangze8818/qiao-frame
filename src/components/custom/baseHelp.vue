<template lang="pug">
  el-popover(
  popper-class="kalix-popover"
  v-bind:ref="popover"
  v-bind:placement="placement"
  v-bind:title="title"
  v-bind:width="width"
  v-bind:trigger="trigger")
    i(style="margin-right: 10px;" v-bind:class="classname" slot="reference")
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      popover: {
        type: String, default: ''
      },
      placement: {
        type: String, default: 'top-start'
      },
      title: {
        type: String, default: ''
      },
      width: {},
      trigger: {
        type: String, default: 'hover'
      },
      classname: {
        type: String, default: 'el-icon-question'
      }
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
    },
    watch: {
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  .kalix-popover
    &.el-popover
      min-width auto
      .el-popover__title
        font-size 12px
        margin-bottom 0
</style>
