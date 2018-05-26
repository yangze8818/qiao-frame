<template lang="pug">
  kalix-dialog.user-add(title='查看' bizKey="district" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="地区编码" prop="coding" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.coding" readonly)
      el-form-item(label="地区描述" prop="bewrite" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.bewrite" readonly)
      el-form-item(label="上级地区编码" prop="parentencoding" v-bind:label-width="labelWidth")
        el-input(v-model="formModel.parentencoding" readonly)
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'

  export default {
    name: 'QiaoDistrictView',
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
