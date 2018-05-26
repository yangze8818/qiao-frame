<template lang="pug">
  kalix-search(:searchFields="searchFields" title="友情链接查询" bizKey="blogroll")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoBlogrollSearch',
    data() {
      return {
        searchFields: [
          {label: '友情链接文字', prop: 'linktext'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
