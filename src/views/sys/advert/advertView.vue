<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="advert" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="广告图片" prop="imgurl" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.imgurl" readonly)
      el-form-item(label="广告名称" prop="name" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.name" readonly)
      el-form-item(label="广告链接" prop="link" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.link" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'QiaoAdvertView',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px'
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
