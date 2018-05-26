<template lang="pug">
  kalix-search(:searchFields="searchFields" title="回复查询" bizKey="reply")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoReplySearch',
    data() {
      return {
        searchFields: [
          {label: '回复人姓名', prop: 'username'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
