<!--
描述：系统应用-用户管理-查看组件
开发人：hqj
开发日期：2017年12月11日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="user" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="所属应用" prop="app" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.app" readonly="readonly")
      el-form-item(label="角色名称" prop="name" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.name" readonly="readonly")
      el-form-item(label="备注" prop="remark" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-bind:rows="2" v-model="formModel.remark" readonly="readonly")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'AdminRoleView',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '140px'
      }
    },
    methods: {}
  }
</script>
