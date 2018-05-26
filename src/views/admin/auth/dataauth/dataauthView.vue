<template lang="pug">
  kalix-dialog.dataauth-view(bizKey="dataauth" ref="kalixBizDialog" v-bind:form-model.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="应用名称" prop="appName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.appName" readonly)
      el-form-item(label="菜单名称" prop="menuName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.menuName" readonly)
      el-form-item(label="数据权限" prop="type" v-bind:label-width="labelWidth")
        kalix-dict-select(v-model="formModel.type" appName="admin" dictType="数据权限" disabled)
      el-form-item(label="备注" prop="remark" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.remark" type="textarea" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'AdminDataAuthView',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px'
      }
    },
    methods: {}
  }
</script>
