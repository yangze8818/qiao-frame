<template lang="pug">
  kalix-dialog.user-add(title='修改' bizKey="advert" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="广告图片" prop="imgurl" v-bind:label-width="labelWidth" v-bind:rules="rules.imgurl")
        el-input(v-model="formModel.imgurl")
      el-form-item(label="广告名称" prop="name" v-bind:label-width="labelWidth" v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="广告链接" prop="link" v-bind:label-width="labelWidth" v-bind:rules="rules.link")
        el-input(v-model="formModel.link")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoAdvertURL} from '../config.toml'

  export default {
    name: 'QiaoAdvertEdit',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          imgurl: [{required: true, message: '请输入广告图片', trigger: 'blur'}],
          name: [{required: true, message: '请输入广告名称', trigger: 'blur'}],
          url: [{required: true, message: '请输入广告链接', trigger: 'blur'}]
        },
        targetURL: QiaoAdvertURL
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
