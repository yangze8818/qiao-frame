<template lang="pug">
  kalix-dialog.user-add(title='修改' bizKey="column" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="栏目名称" prop="name" v-bind:label-width="labelWidth" v-bind:rules="rules.name")
        el-input(v-model="formModel.name" )
      el-form-item(label="排序号" prop="sequence" v-bind:label-width="labelWidth" v-bind:rules="rules.sequence")
        el-input(v-model="formModel.sequence" type="number" min="1")
      el-form-item(label="栏目路由" prop="url" v-bind:label-width="labelWidth" v-bind:rules="rules.url")
        el-input(v-model="formModel.url")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoColumnURL} from '../config.toml'

  export default {
    name: 'QiaoColumnEdit',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          name: [{required: true, message: '请输栏目名称', trigger: 'blur'}],
          sequence: [{required: true, message: '请输入排序号', trigger: 'blur'}],
          url: [{required: true, message: '请输入栏目路由', trigger: 'blur'}]
        },
        targetURL: QiaoColumnURL
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
