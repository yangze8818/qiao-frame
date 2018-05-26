<template lang="pug">
  kalix-dialog.user-add(title='修改' bizKey="district" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="地区编码" prop="coding" v-bind:label-width="labelWidth" v-bind:rules="rules.coding")
        el-input(v-model="formModel.coding")
      el-form-item(label="地区描述" prop="bewrite" v-bind:label-width="labelWidth" v-bind:rules="rules.bewrite")
        el-input(v-model="formModel.bewrite")
      el-form-item(label="上级地区编码" prop="parentencoding" v-bind:label-width="labelWidth" v-bind:rules="rules.parentencoding")
        el-input(v-model="formModel.parentencoding")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoDistrictURL} from '../config.toml'

  export default {
    name: 'QiaoDistrictEdit',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          coding: [{required: true, message: '请输入地区编码', trigger: 'blur'}],
          bewrite: [{required: true, message: '请输入地区描述', trigger: 'blur'}],
          parentencoding: [{required: true, message: '请输入上级地区描述', trigger: 'blur'}]
        },
        targetURL: QiaoDistrictURL
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
