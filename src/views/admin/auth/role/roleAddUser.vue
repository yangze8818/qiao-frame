<template lang="pug">
  kalix-dialog.user-add(
  bizKey="role"
  ref="kalixBizDialog"
  v-bind:form-model.sync="formModel"
  v-bind:visible="centerDialogVisible"
  v-bind:submitCustom="submitCustom")
    div.el-form(
    slot="dialogFormSlot"
    style="{width:100%}")
      kalix-transfer.userAdd(v-if="formModel.id>0"
      ref="kalixTransfer"
      v-bind:targetURL="targetURL"
      v-bind:sourceURL="sourceURL"
      v-bind:targetID="formModel.id"
      v-bind:sourceType="sourceType"
      )
</template>

<script>
  import FormModel from './model'
  import {usersURL} from '../../config.toml'

  export default {
    name: 'AdminRoleAddUser',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        userIds: [],
        ids: [],
        centerDialogVisible: false,
        sourceURL: usersURL,
        targetURL: 'camel/rest/roles',
        targetID: -1,
        sourceType: 'users'
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    // baseDialog 提交按钮调用的方法
      submitCustom(baseDialog) {
        this.userIds = this.$refs.kalixTransfer.userIds.join(',')
        this.ids[0] = this.formModel.id
        this.ids[1] = this.userIds
        this.axios.request({
          method: 'POST',
          url: `${this.targetURL}/${this.formModel.id.toString()}/users`,
          data: this.ids,
          params: {}
        }).then(response => {
          if (response.data.success) {
            this.$KalixMessage.success(response.data.msg)
            baseDialog.visible = false
            baseDialog.$refs.dialogForm.resetFields()
            baseDialog.submitComplete()
          } else {
            this.$KalixMessage.error(response.data.msg)
            baseDialog.submitComplete()
          }
        })
        console.log('this.ids', this.ids)
      },
      close() {
        this.onCancelClick()
      },
      onCancelClick() {
        console.log('dialog cancel button clicked !')
        this.centerDialogVisible = false
        this.$refs.dialogForm.resetFields()
        // this.$emit('update:formModel', JSON.parse(this.tempFormModel))
        this._afterDialogClose()
      },
      _afterDialogClose() {
        this.$KalixEventBus.$emit(this.bizKey + '-' + 'KalixDialogClose')
      }
    }
  }
</script>

<style lang="stylus">

</style>
