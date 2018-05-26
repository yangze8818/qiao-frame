<template lang="pug">
  kailx-search(title="用户查询" v-bind:search-form="formModel" v-bind:form-rules="rules")
    div.el-form(slot="searchFormSlot")
      el-form-item(label="bak-登录名" prop="loginName")
        el-input(v-model="formModel.loginName")
      el-form-item(label="bak-姓名" prop="loginName")
        el-input(v-model="formModel.name")
</template>
<script type="text/ecmascript-6">
  import {isEmptyObject} from 'common/util'

  export default {
    data() {
      return {
        formModel: {
          loginName: '',
          name: ''
        },
        searchFields: [
          {label: '登录名', prop: 'loginName'},
          {label: '姓名', prop: 'name'}
        ],
        rules: {
          loginName: [
            {message: '请输入登录名', trigger: 'blur'}
          ],
          name: [
            {message: '请输入姓名', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    methods: {
      resetFromModel() {
        this.formModel = JSON.parse(this.tempFormModel)
      },
      onSearch(_requestData) {
        this.$emit('onSearch', _requestData)
        if (isEmptyObject(_requestData)) {
          this.resetFromModel()
        }
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
