<template lang="pug">
  kalix-search(title="角色查询" v-bind:searchFields="searchFields")
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'AdminRoleSearch',
    data() {
      return {
        searchFields: [
        // {label: '登录名', prop: 'loginName'},
          {label: '角色名称', prop: 'name'}
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
