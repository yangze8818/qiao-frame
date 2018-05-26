<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="blogroll" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="友情链接文字" prop="linktext" v-bind:label-width="labelWidth" v-bind:rules="rules.linktext")
        el-input(v-model="formModel.linktext")
      el-form-item(label="跳转地址" prop="texturl" v-bind:label-width="labelWidth" v-bind:rules="rules.texturl")
        el-input(v-model="formModel.texturl")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoBlogrollURL} from '../config.toml'

  export default {
    name: 'QiaoBlogrollAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          linktext: [{required: true, message: '请输入友情链接文字', trigger: 'blur'}],
          texturl: [{required: true, message: '请输入跳转地址', trigger: 'blur'}]
        },
        targetURL: QiaoBlogrollURL
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
