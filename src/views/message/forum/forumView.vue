<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="forum" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="发帖人别名" prop="idcard" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.idcard" readonly)
      el-form-item(label="帖子标题" prop="title" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.title" readonly)
      el-form-item(label="帖子内容" prop="content" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.content" readonly)
      el-form-item(label="留言分类" prop="type" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.type" type="number" min="1" readonly)
      el-form-item(label="审核标识" prop="categoryName" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.categoryName" readonly)
      el-form-item(label="类型标识" prop="categorytype" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.categorytype" readonly)

</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'QiaoForumView',
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
