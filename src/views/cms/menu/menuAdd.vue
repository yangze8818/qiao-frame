<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="menu" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="所属栏目" prop="navid" v-bind:label-width="labelWidth")
        //<kalix-select v-model="formModel.navid" placeholder="请选择">
        //  <el-option v-for="item in options" :key="item.navid" :label="item.name" :value="item.navid"> </el-option>
        //</el-select>
        kalix-select(v-model="formModel.navid" v-bind:requestUrl="columnURL"
          appName="menuColumn"  placeholder="请选择栏目"
          v-bind:paramObj="columnParam"
          v-bind:defaultSelect="true" v-on:vauleSetForm="setGroup")
      el-form-item(label="菜单名称" prop="name" v-bind:label-width="labelWidth" v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="排序号" prop="sequence" v-bind:label-width="labelWidth" v-bind:rules="rules.sequence")
        el-input(v-model="formModel.sequence" type="number" min="1")
      el-form-item(label="菜单路由" prop="url" v-bind:label-width="labelWidth" v-bind:rules="rules.url")
        el-input(v-model="formModel.url")
      el-form-item(label="是否展示" prop="show" v-bind:label-width="labelWidth")
        el-checkbox(v-model="formModel.show")
      el-form-item(label="是否留言" prop="message" v-bind:label-width="labelWidth")
        el-checkbox(v-model="formModel.message")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoMenuURL, QiaoColumnURL} from '../config.toml'

  export default {
    name: 'QiaoMenuAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          name: [{required: true, message: '请输菜单名称', trigger: 'blur'}],
          sequence: [{required: true, message: '请输入排序号', trigger: 'blur'}],
          url: [{required: true, message: '请输入菜单路由', trigger: 'blur'}]
        },
        targetURL: QiaoMenuURL,
        columnURL: QiaoColumnURL,
        columnParam: undefined,
        options: [],
        name: ''
      }
    },
    methods: {
      init(dialogOption) {
      },
      setGroup(val) {
        this.formModel.navid = val
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
