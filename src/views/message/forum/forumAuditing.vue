<template lang="pug">
  kalix-dialog.user-add(title='审核' bizKey="forum" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="审核标识" prop="category" v-bind:label-width="labelWidth" v-bind:rules="rules.category")
        el-input(v-model="formModel.category")
      el-form-item(label="类型标识" prop="categorytype" v-bind:label-width="labelWidth" v-bind:rules="rules.categorytype")
        el-input(v-model="formModel.categorytype")
    </template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoForumURL} from '../../message/config.toml'

  export default {
    name: 'QiaoForumAuditing',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          category: [{required: true, message: '请输入审核标识', trigger: 'blur'}],
          categorytype: [{required: true, message: '请输入类型标识', trigger: 'blur'}]
        },
        targetURL: QiaoForumURL
      }
    },
    methods: {
      init(dialogOption) {
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
