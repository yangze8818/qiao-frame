<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="column" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="标题" prop="title" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.title")
      el-form-item(label="次标题" prop="subtitle" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.subtitle")
      el-form-item(label="排序" prop="sequence" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.sequence")
      el-form-item(label="内容" prop="content" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.content")
      <!--el-form-item(label="菜单id" prop="listid" v-bind:label-width="labelWidth")-->
      <!--el-input(v-model="formModel.listid")-->
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'QiaoContentView',
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
