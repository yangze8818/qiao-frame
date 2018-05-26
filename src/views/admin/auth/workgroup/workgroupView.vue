<template lang="pug">
  kalix-dialog.workgroup-view(bizKey="workgroup"
  ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:isView="readonly" size="tiny")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="工作组名称" prop="name"  label-width="140px")
        el-input(v-model="formModel.name" v-bind:readonly="readonly")
      el-form-item(label="所属应用" prop="app"  label-width="140px")
        el-input(v-model="formModel.app" v-bind:readonly="readonly")
      el-form-item(label="备注" prop="remark" label-width="140px")
        el-input(v-model="formModel.remark" type="textarea" v-bind:readonly="readonly")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'AdminWorkGroupView',
    data() {
      return {
        readonly: true,
        formModel: Object.assign({}, FormModel)
      }
    },
    created() {
    },
    methods: {}
  }
</script>
