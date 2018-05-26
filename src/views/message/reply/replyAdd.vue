<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="reply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="回复人姓名" prop="username" v-bind:label-width="labelWidth" v-bind:rules="rules.username")
        el-input(v-model="formModel.username")
      el-form-item(label="回复内容" prop="content" v-bind:label-width="labelWidth" v-bind:rules="rules.content")
        el-input(v-model="formModel.content")
      el-form-item(label="审核标识" prop="category" v-bind:label-width="labelWidth" v-bind:rules="rules.category")
        el-input(v-model="formModel.category")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoReplyURL} from '../../message/config.toml'

  export default {
    name: 'QiaoReplyAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          username: [{required: true, message: '请输入回复人姓名', trigger: 'blur'}],
          content: [{required: true, message: '请输入回复内容', trigger: 'blur'}],
          category: [{required: true, message: '请输入审核标识', trigger: 'blur'}]
        },
        targetURL: QiaoReplyURL
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
