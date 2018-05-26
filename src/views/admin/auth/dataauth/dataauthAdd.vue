<template lang="pug">
  kalix-dialog.dataauth-add(bizKey="dataauth" ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      template(v-if="isEdit")
        el-form-item(label="应用名称" prop="appId" v-bind:label-width="labelWidth")
          kalix-select(v-model="formModel.appId" v-bind:requestUrl="appURL" label="text" appName="applications" placeholder="请选择应用" disabled)
        el-form-item(label="菜单名称" prop="menuId" v-bind:label-width="labelWidth")
          kalix-menu-select(v-model="formModel.menuId" v-bind:requestUrl="menuURL" label="text" v-bind:appName="menuAppName" placeholder="请选择菜单" disabled)
      template(v-else)
        el-form-item(label="应用名称" prop="appId" v-bind:rules="rules.appId" v-bind:label-width="labelWidth")
          kalix-select(v-model="formModel.appId" v-bind:requestUrl="appURL" label="text" appName="applications" placeholder="请选择应用" v-on:selectChange="selectChange")
        el-form-item(label="菜单名称" prop="menuId" v-bind:rules="rules.menuId" v-bind:label-width="labelWidth")
          kalix-menu-select(v-model="formModel.menuId" v-bind:requestUrl="menuURL" label="text" v-bind:appName="menuAppName" placeholder="请选择菜单")
      el-form-item(label="数据权限" prop="type" v-bind:rules="rules.type" v-bind:label-width="labelWidth")
        kalix-dict-select(v-model="formModel.type" appName="admin" dictType="数据权限")
      el-form-item(label="备注" prop="remark" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.remark" type="textarea")
</template>

<script>
  import FormModel from './model'
  import {dataauthURL, appsURL} from '../../config.toml'
  import MenuSelect from '../../../../components/biz/select/MenuSelect.vue'

  export default {
    name: 'AdminDataAuthAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        isEdit: false,
        rules: {
          appId: [{type: 'string', required: true, message: '请选择应用名称', trigger: 'change'}],
          menuId: [{type: 'string', required: true, message: '请选择菜单名称', trigger: 'change'}],
          type: [{type: 'number', required: true, message: '请选择数据权限', trigger: 'change'}]
        },
        targetURL: dataauthURL,
        labelWidth: '140px',
        appURL: appsURL,
        menuURL: '',
        menuAppName: ''
      }
    },
    mounted() {
      setTimeout(() => {
        this.isEdit = this.$refs.kalixBizDialog.$data.isEdit
        if (this.formModel.appId) {
          this.menuURL = appsURL + '/' + this.formModel.appId
          this.menuAppName = this.formModel.appId + '-menus'
        }
      }, 20)
    },
    methods: {
      selectChange(item) {
        this.formModel.menuId = ''
        if (item.id) {
          this.menuURL = appsURL + '/' + item.id
          this.menuAppName = item.id + '-menus'
        }
      }
    },
    components: {
      KalixMenuSelect: MenuSelect
    }
  }
</script>
