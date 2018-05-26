<template lang="pug">
  div.user-add
    kalix-dialog(ref="kalixBizDialog" v-bind:form-model.sync="formModel" v-bind:targetURL="targetURL" title='修改密码')
      div(slot="dialogFormSlot")
        el-form-item(label="原密码" prop="oldPassword" v-bind:rules="rules.oldPassword")
          el-input(v-model="formModel.oldPassword" type="password" )
        el-form-item(label="新密码" prop="password" v-bind:rules="rules.password")
          el-input(v-model="formModel.password" type="password")
        el-form-item(label="确认密码" prop="confirmPassword" v-bind:rules="rules.confirmPassword")
          el-input(v-model="formModel.confirmPassword" type="password")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {userURL} from 'kalix-vue-lib/src/config/global.toml'
  import Cache from 'kalix-vue-lib/src/common/cache'

  export default {
    name: 'AdminUserEditpwd',
    props: {},
    data() {
      let validateOldPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入原密码'))
        } else {
          this.axios.request({
            method: 'GET',
            url: userURL + '/' + Cache.get('id') + '/password/' + this.formModel.oldPassword,
            data: this.formModel,
            params: {}
          }).then(response => {
            if (response.data) {
              callback()
            } else {
              callback(new Error('原密码错误'))
            }
          }).catch(() => {
          })
        }
      }
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
          oldPassword: [{required: true, validator: validateOldPassword, trigger: 'blur'}],
          password: [{required: true, validator: validatePassword, trigger: 'blur'}],
          confirmPassword: [{required: true, validator: validateConfirmPassword, trigger: 'blur'}]
        },
        targetURL: userURL
      }
    },
    created() {
    // console.log('this.formRules.name:', this.formRules.name)
    },
    methods: {
      open() {
        this.formModel.id = Cache.get('id')
        this.$refs.kalixBizDialog.open('', true, this.formModel)
      }
    }
  }
</script>
