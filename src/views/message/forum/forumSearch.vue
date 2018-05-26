<template lang="pug">
  kalix-search(:searchFields="searchFields" title="留言查询" bizKey="forum")
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'QiaoForumSearch',
    data() {
      return {
        searchFields: [
          {label: '发帖人别名', prop: 'idcard'}
        ]
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
