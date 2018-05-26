<!--
描述：系统模板组件
开发人：yangz
开发日期：2018年02月07日
-->
<template lang="pug">
  div(v-html="content")
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      content: {
        type: String,
        default: ''
      }
    },
    mounted() {
      console.log('content==============', this.content)
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
