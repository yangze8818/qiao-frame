<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="reply" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="回复人姓名" prop="username" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.username" readonly)
      el-form-item(label="回复内容" prop="content" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.content" readonly)
      el-form-item(label="审核标识" prop="category" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.category" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'QiaoReplyView',
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
