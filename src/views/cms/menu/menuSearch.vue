<template lang="pug">
  kalix-search(:searchFields="searchFields" title="菜单查询" bizKey="menu")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoMenuSearch',
    data() {
      return {
        searchFields: [
          {label: '菜单名称', prop: 'name'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
