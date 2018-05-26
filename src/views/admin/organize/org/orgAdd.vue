<!--
描述：办公自动化-应聘人员管理-新增组件
开发人：hqj
开发日期：2017年10月30日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="duty" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      input(v-model="formModel.parentId" type="hidden")
      el-form-item(label="上级机构" prop="orgName" label-width="120px")
        el-input(v-model="formModel.orgName" readonly)
      el-form-item(label="机构名称" prop="name" label-width="120px"  v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {orgURL} from '../../config.toml'

  export default {
    name: 'AdminOrgAdd',
    data() {
      return {
        orgName: '',
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入组织机构名称', trigger: 'blur'}]
        },
        targetURL: orgURL,
        labelWidth: '110px'
      }
    },
    created() {
    },
    methods: {
      init(dialogOption) {
        // this.formModel.orgName = dialogOption.row.name
        // this.formModel.parentId = dialogOption.row.id
        this.formModel.parentId = dialogOption.parentId
        this.formModel.orgName = dialogOption.orgName
        console.log('this.formModel================', this.formModel)
      }
    }
  }
</script>
