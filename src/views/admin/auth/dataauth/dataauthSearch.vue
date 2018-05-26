<template lang="pug">
  kalix-search(title="数据权限查询" v-bind:searchFields="searchFields")
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'AdminDataAuthSearch',
    data() {
      return {
        searchFields: [
          {label: '数据权限', prop: 'type', type: 'dict', appName: 'admin', dictType: '数据权限'}
        ]
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
