<template lang="pug">
  kalix-dialog.user-add(bizKey="role" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="所属应用" prop="app" v-bind:rules="rules.app" v-bind:label-width="labelWidth")
        kalix-select(placeholder="请选择应用" style="width:100%" appName="applications"
        v-bind:requestUrl="requestUrl" label="text" v-model="formModel.app" v-on:selectChange="selectChange")
      el-form-item(label="角色名称" prop="name" v-bind:rules="rules.name" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.name")
      el-form-item(label="备注" prop="remark" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-bind:rows="2" v-model="formModel.remark")
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import {rolesURL, appsURL} from '../../config.toml'

  export default {
    name: 'AdminRoleAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          app: [{required: true, message: '请选择所属应用', trigger: 'blur'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        targetURL: rolesURL,
        requestUrl: appsURL,
        labelWidth: '140px'
      }
    },
    created() {
    },
    methods: {
      change(event) {
        alert(event)
      },
      selectChange(item) {
        this.formModel.app = item.text
      }
    }
  }
</script>
