<template lang="pug">
  keep-alive
    kalix-table(bizKey="workgroup" title='工作组列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:buttonPermissionPrefix="buttonPermissionPrefix"
    v-bind:customTableTool="customTableTool"
    v-bind:formModel.sync="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    bizSearch="AdminWorkGroupSearch"  v-bind:btnList="btnList")
</template>

<script type="text/ecmascript-6">
  import {workgroupURL, workGroupBtnPermissionPrefix} from '../../config.toml'
  import {workgroupBtnList} from './config'

  export default {
    name: 'kalix-admin-workgroup',
    data() {
      return {
        buttonPermissionPrefix: workGroupBtnPermissionPrefix,
        targetURL: workgroupURL,
        tableFields: [
          {prop: 'app', label: '所属应用'},
          {prop: 'name', label: '工作组名称'},
          {prop: 'remark', label: '备注'},
          {prop: 'createBy', label: '创建人'},
          {prop: 'creationDate', label: '创建日期'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'AdminWorkGroupView'},
          {id: 'add', dialog: 'AdminWorkGroupAdd'},
          {id: 'edit', dialog: 'AdminWorkGroupAdd'},
          {id: 'addUser', dialog: 'AdminWorkGroupAddUser'},
          {id: 'addRole', dialog: 'AdminWorkGroupAddRole'}
        ],
        formModel: {
          name: '',
          app: '',
          available: 1,
          remark: ''
        },
        formRules: {
          app: [
            {required: true, message: '请输入所属应用', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '请输入工作组名称', trigger: 'blur'}
          ]
        },
        btnList: workgroupBtnList
      }
    },
    methods: {
      changeFormModel(model) {
        console.log('changeFormModel', model)
        this.formModel = model
      },
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'addRole' : { // 增加角色
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'addRole'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加角色', false, row)
            }, 20)
            break
          }
          case 'addUser':
            // 添加用户
            that.whichBizDialog = ''
            let dig = that.bizDialog.filter((item) => {
              return item.id === 'addUser'
            })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加用户', false, row)
            }, 20)
            break
        }
      }
    },
    mounted() {
      this.$KalixEventBus.$on('updateAppModel', this.changeFormModel)
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
