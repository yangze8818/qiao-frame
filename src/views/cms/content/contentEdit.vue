<template lang="pug">
  kalix-dialog.user-add(title='修改' bizKey="content" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="标题" prop="title" v-bind:label-width="labelWidth" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="次标题" prop="subtitle" v-bind:label-width="labelWidth" v-bind:rules="rules.subtitle")
        el-input(v-model="formModel.subtitle")
      el-form-item(label="排序" prop="sequence" v-bind:label-width="labelWidth" v-bind:rules="rules.sequence")
        el-input(v-model="formModel.sequence" type="number" min="1")
      el-form-item(label="内容" prop="content" v-bind:label-width="labelWidth" v-bind:rules="rules.content")
        el-input(v-model="formModel.content")
      <!--el-form-item(label="菜单id" prop="listid" v-bind:label-width="labelWidth")-->
        <!--el-input(v-model="formModel.listid")-->
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoContentURL} from '../config.toml'

  export default {
    name: 'QiaoContentEdit',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          title: [{required: true, message: '请输标题', trigger: 'blur'}],
          subtitle: [{required: true, message: '请输次标题', trigger: 'blur'}],
          content: [{required: true, message: '请输内容', trigger: 'blur'}],
          sequence: [{required: true, message: '请输入排序号', trigger: 'blur'}]
        },
        targetURL: QiaoContentURL
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
