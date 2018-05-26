<template lang="pug">
  kalix-search(title="用户组查询" v-bind:searchFields="searchFields" v-bind:form-rules="rules")
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'AdminWorkGroupSearch',
    data() {
      return {
        searchFields: [
          {label: '工作组名称', prop: 'name'}
        ],
        rules: {
          groupName: [
            {required: true, message: '请输入工作组名称', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
    },
    methods: {
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
