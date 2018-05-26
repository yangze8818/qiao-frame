<template lang="pug">
  kalix-search(title="用户查询" v-bind:searchFields="searchFields")
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'AdminUserSearch',
    data() {
      return {
        searchFields: [
          {label: '用户类型', prop: 'userType', type: 'dict', appName: 'admin', dictType: '用户类型'},
          {label: '登录名', prop: 'loginName'},
          {label: '姓名/企业名称', prop: 'name'}
        ]
      }
    },
    created() {
    },
    methods: {}
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
