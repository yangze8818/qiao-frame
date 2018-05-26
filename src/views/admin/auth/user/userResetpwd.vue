<template lang="pug">
  kalix-dialog.user-add(title='重置密码' bizKey="user" ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL" )
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="新密码" prop="password" v-bind:rules="rules.password" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.password" type="password")
      el-form-item(label="确认密码" prop="confirmPassword" v-bind:rules="rules.confirmPassword" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.confirmPassword" type="password")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {userURL} from 'kalix-vue-lib/src/config/global.toml'

  export default {
    name: 'AdminUserResetpwd',
    data() {
      let validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formModel.confirmPassword && this.formModel.confirmPassword !== '') {
            this.$refs.kalixBizDialog.$refs.dialogForm.validateField('confirmPassword')
          }
          callback()
        }
      }
      let validateConfirmPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.formModel.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          password: [{required: true, validator: validatePassword, trigger: 'blur'}],
          confirmPassword: [{required: true, validator: validateConfirmPassword, trigger: 'blur'}]
        },
        targetURL: userURL,
        labelWidth: '140px'
      }
    },
    methods: {}
  }
</script>
