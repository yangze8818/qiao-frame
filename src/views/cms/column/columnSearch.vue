<template lang="pug">
  kalix-search(:searchFields="searchFields" title="栏目查询" bizKey="column")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoColumnSearch',
    data() {
      return {
        searchFields: [
          {label: '栏目名称', prop: 'name'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
