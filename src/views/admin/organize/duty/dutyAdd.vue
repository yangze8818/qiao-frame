<!--
描述：办公自动化-应聘人员管理-新增组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="duty" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="所属机构" prop="orgid" label-width="120px" )
        el-input(v-text="orgName")
        input(v-model="formModel.orgid" type="hidden")
      el-form-item(label="职务名称" prop="name" label-width="120px"  v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="职务描述" prop="comment" label-width="120px")
        el-input(v-model="formModel.comment")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'AdminDutyAdd',
    data() {
      return {
        orgName: '',
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入职务名称', trigger: 'blur'}]
        },
        targetURL: '',
        labelWidth: '110px'
      }
    },
    created() {
    },
    methods: {
      init(dialogOption) {
        this.orgName = dialogOption.orgName
        this.formModel.orgid = dialogOption.orgId
        this.targetURL = dialogOption.targetURL
      }
    }
  }
</script>
