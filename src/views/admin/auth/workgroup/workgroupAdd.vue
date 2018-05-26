<template lang="pug">
  kalix-dialog.workgroup-add(bizKey="workgroup"
  ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL" size="tiny")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="工作组名称" prop="name" v-bind:rules="rules.name" label-width="140px")
        el-input(v-model="formModel.name")
      el-form-item(label="所属应用" prop="app" v-bind:rules="rules.app" label-width="140px")
        app-component(v-model="formModel.app" v-on:appSelected="onAppSelected" style="width:100%")
      el-form-item(label="备注" prop="remark" label-width="140px")
        el-input(v-model="formModel.remark" type="textarea")
</template>

<script>
  import {workgroupURL} from '../../config.toml'
  import FormModel from './model'
  import AppComponent from './appcomponent.vue'

  export default {
    name: 'AdminWorkGroupAdd',
    props: {
      formRules: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          name: [{required: true, message: '请输入 name', trigger: 'blur'}],
          app: [{required: true, message: '请输入 app', trigger: 'blur'}]
        },
        targetURL: workgroupURL
      }
    },
    created() {
      console.log('this.formRules.name:', this.formRules.name)
    },
    components: {
      AppComponent: AppComponent
    },
    methods: {
      onAppSelected(app) {
        this.$KalixEventBus.$emit('updateAppModel', app)
      }
    }
  }
</script>

<style scoped>

</style>
