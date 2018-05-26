<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="setting" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="公司地址" prop="site" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.site" readonly)
      el-form-item(label="电话" prop="phone" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.phone" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'QiaoSettingView',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px'
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
