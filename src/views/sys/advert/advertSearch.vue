<template lang="pug">
  kalix-search(:searchFields="searchFields" title="栏目查询" bizKey="advert")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoAdvertSearch',
    data() {
      return {
        searchFields: [
          {label: '广告名称', prop: 'name'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
