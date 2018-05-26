<template lang="pug">
  kalix-dialog.user-add(title='添加' bizKey="content" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")

      <!--el-form-item(label="所属栏目" prop="navid" v-bind:label-width="labelWidth")-->
      <!--kalix-select( v-bind:requestUrl="columnURL"-->
      <!--appName="menuColumn"  placeholder="请选择栏目"-->
      <!--v-bind:paramObj="columnParam"-->
      <!--v-bind:defaultSelect="true"-->
      <!--change="setMenu(value)")-->

      <!--el-form-item(label="所属菜单" v-bind:label-width="labelWidth")-->
      <!--kalix-select(v-model="formModel.listid" v-bind:requestUrl="menuURL"-->
      <!--appName="menuContent"  placeholder="请选择菜单"-->
      <!--v-bind:paramObj="menuParam"-->
      <!--v-bind:defaultSelect="true" v-on:vauleSetForm="setGroup")-->

      el-form-item(label="级联菜单" v-bind:label-width="labelWidth")
        //<el-cascader :options="options" v-model="formModel.listid">
        //</el-cascader>

      el-form-item(label="标题" prop="title" v-bind:label-width="labelWidth" v-bind:rules="rules.title")
        el-input(v-model="formModel.title")
      el-form-item(label="次标题" prop="subtitle" v-bind:label-width="labelWidth" v-bind:rules="rules.subtitle")
        el-input(v-model="formModel.subtitle")
      el-form-item(label="排序" prop="sequence" v-bind:label-width="labelWidth" v-bind:rules="rules.sequence")
        el-input(v-model="formModel.sequence" type="number" min="1")
      el-form-item(label="内容" prop="content" v-bind:label-width="labelWidth" v-bind:rules="rules.content")
        el-input(v-model="formModel.content")
      <!--el-form-item(label="菜单id" prop="listid" v-bind:label-width="labelWidth")-->
      <!--el-input(v-model="formModel.listid")-->
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {QiaoContentURL, QiaoMenuURL, QiaoColumnURL, QiaoCMURL} from '../config.toml'
  // import Cache from '../cache'

  export default {
    name: 'QiaoContentAdd',
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        labelWidth: '120px',
        rules: {
          title: [{required: true, message: '请输标题', trigger: 'blur'}],
          subtitle: [{required: true, message: '请输次标题', trigger: 'blur'}],
          content: [{required: true, message: '请输内容', trigger: 'blur'}],
          sequence: [{required: true, message: '请输入排序号', trigger: 'blur'}]
        },
        targetURL: QiaoContentURL,
        columnURL: QiaoColumnURL,
        menuURL: QiaoMenuURL,
        cmURL: QiaoCMURL,
        columnParam: undefined,
        MenuParam: undefined,
        options: [],
        name: ''
      }
    },
    watch: {},
    mounted() {
      this.initOptions()
    },
    methods: {
      init(dialogOption) {
      },
      setGroup(val) {
        this.formModel.listid = val
      },
      initOptions() {
        this.$http
          .get(QiaoCMURL, {})
          .then(res => {
            this.options = res.data
            if (res.data.data) {
              this.options = res.data.data
            }
            console.log('data_options:----->>>' + this.options)
          })
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
