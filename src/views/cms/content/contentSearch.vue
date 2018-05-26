<template lang="pug">
  kalix-search(:searchFields="searchFields" title="内容查询" bizKey="content")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoContentSearch',
    data() {
      return {
        searchFields: [
          {label: '内容标题', prop: 'title'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
