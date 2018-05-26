<template lang="pug">
  kalix-dialog.user-add(title='修改' bizKey="setting" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="公司地址" prop="site" v-bind:label-width="labelWidth" v-bind:rules="rules.site")
        el-input(v-model="formModel.site")
      el-form-item(label="电话" prop="phone" v-bind:label-width="labelWidth" v-bind:rules="rules.phone")
        el-input(v-model="formModel.phone")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoSettingURL} from '../config.toml'

  export default {
    name: 'QiaoSettingEdit',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          site: [{required: true, message: '请输入公司地址', trigger: 'blur'}],
          phone: [{required: true, message: '请输入电话', trigger: 'blur'}]
        },
        targetURL: QiaoSettingURL
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
