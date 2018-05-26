<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="menu" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="菜单名称" prop="name" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.name" readonly)
      el-form-item(label="排序号" prop="sequence" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.sequence" type="number" min="1" readonly)
      el-form-item(label="菜单路由" prop="url" v-bind:label-width="labelWidth" )
        el-input(v-model="formModel.url" readonly)
      el-form-item(label="是否展示" prop="show" v-bind:label-width="labelWidth")
        el-checkbox(v-model="formModel.show" disabled)
      el-form-item(label="是否留言" prop="message" v-bind:label-width="labelWidth")
        el-checkbox(v-model="formModel.message" disabled)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'QiaoMenuView',
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
