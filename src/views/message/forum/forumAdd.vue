<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="forum" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="发帖人别名" prop="idcard" v-bind:label-width="labelWidth" v-bind:rules="rules.idcard")
        el-input(v-model="formModel.idcard")
      el-form-item(label="帖子标题" prop="title" v-bind:label-width="labelWidth" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="帖子内容" prop="content" v-bind:label-width="labelWidth" v-bind:rules="rules.content")
        el-input(v-model="formModel.content")
      el-form-item(label="留言分类" prop="type" v-bind:label-width="labelWidth" v-bind:rules="rules.type")
        el-input(v-model="formModel.type" type="number" min="1")
      el-form-item(label="审核标识" prop="category" v-bind:label-width="labelWidth" v-bind:rules="rules.category")
        el-input(v-model="formModel.category")
      el-form-item(label="类型标识" prop="categorytype" v-bind:label-width="labelWidth" v-bind:rules="rules.categorytype")
        el-input(v-model="formModel.categorytype")
    </template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoForumURL} from '../../message/config.toml'

  export default {
    name: 'QiaoForumAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          idcard: [{required: true, message: '请输入发帖人别名', trigger: 'blur'}],
          title: [{required: true, message: '请输入帖子标题', trigger: 'blur'}],
          content: [{required: true, message: '请输入帖子内容', trigger: 'blur'}],
          type: [{required: true, message: '请输入留言分类', trigger: 'blur'}],
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
