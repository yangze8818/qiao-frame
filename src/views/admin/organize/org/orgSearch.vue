<template lang="pug">
  kalix-search(title="机构查询" v-bind:searchFields="searchFields")
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'AdminOrgSearch',
    data() {
      return {
        searchFields: [
          {label: '机构名称', prop: 'name'}
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
