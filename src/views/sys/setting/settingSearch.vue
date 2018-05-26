<template lang="pug">
  kalix-search(:searchFields="searchFields" title="公司信息查询" bizKey="setting")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoSettingSearch',
    data() {
      return {
        searchFields: [
          {label: '公司地址', prop: 'site'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
