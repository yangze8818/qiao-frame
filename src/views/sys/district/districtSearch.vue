<template lang="pug">
  kalix-search(:searchFields="searchFields" title="编码查询" bizKey="district")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoDistrictSearch',
    data() {
      return {
        searchFields: [
          {label: '地区编码', prop: 'coding'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
