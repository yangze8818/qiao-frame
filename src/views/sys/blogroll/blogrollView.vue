<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="blogroll" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="友情链接文字" prop="linktext" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.linktext" readonly)
      el-form-item(label="跳转地址" prop="texturl" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.texturl" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'QiaoBlogrollView',
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
