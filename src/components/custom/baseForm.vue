<template lang="pug">
  div.user-add
    el-form(ref="dialogForm" v-bind:model="formModel" label-width="80px")
      slot(name="dialogFormSlot")
    div
      <!--el-button(v-on:click="onCancelClick") 重置-->
      el-button(type="primary" v-on:click="onSubmitClick") 提 交
</template>
<script type="text/ecmascript-6">
  import Message from 'common/message'
  import Vue from 'vue'
  import EventBus from 'common/eventbus'
  import {ON_REFRESH_DATA} from './event.toml'
  export default {
    props: {
      size: {
        type: String,
        default: 'small'
      },
      bizKey: String,
      formModel: { // dialog中的form的数据模型，由父组件传递
        type: Object,
        required: true
      },
      rules: {  // form的校验规则
        type: Object
//        required: true
      },
      targetURL: {  // 业务数据提交的url,包括add，delete，update
        type: String
//        required: true
      },
      isView: false,
      title: ''
    },
    data() {
      return {
        privateTitle: '',
        visible: false
      }
    },
    methods: {
      onCancelClick() {
      },
      onSubmitClick() {
        this.$refs.dialogForm.validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            Vue.axios.request({
              method: this.isEdit ? 'PUT' : 'POST',
              url: this.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
                Message.success(response.data.msg)
                this.visible = false
                this.$refs.dialogForm.resetFields()
                // 关闭对话框
//                this.close()
                // 清空form
//                this.$parent.resetDialogForm()
//                this.$emit('resetDialogForm')
              } else {
                Message.error(response.data.msg)
              }
              // 刷新列表
              EventBus.$emit(ON_REFRESH_DATA)
              this._afterDialogClose()
              console.log('[kalix] dialog submit button clicked !')
              this.visible = false
            })
          } else {
            Message.error('请检查输入项！')
            return false
          }
        })
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
