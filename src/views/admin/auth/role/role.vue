<template lang="pug">
  keep-alive
    kalix-table(bizKey="role" title='角色列表' v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:tableFields="tableFields" bizSearch="AdminRoleSearch" v-bind:btnList="btnList"
    v-bind:customTableTool="customTableTool" v-bind:buttonPermissionPrefix="buttonPermissionPrefix"
    v-bind:dictDefine="dictDefine" ref="userTable")
</template>
<script type="text/ecmascript-6">
  import {rolesURL, roleBtnPermissionPrefix} from '../../config.toml'
  import {roleBtnList} from './config'

  export default {
    name: 'kalix-admin-role',
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'ADMIN-DICT-KEY',
          type: '用户类型',
          targetField: 'userTypeName',
          sourceField: 'userType'
        }, {
          cacheKey: 'ADMIN-DICT-KEY',
          type: '岗位名称',
          targetField: 'positionName',
          sourceField: 'position'
        }],
        btnList: roleBtnList,
        buttonPermissionPrefix: roleBtnPermissionPrefix,
        targetURL: rolesURL,
        tableFields: [
          {prop: 'app', label: '所属应用'},
          {prop: 'name', label: '角色名称'},
          {prop: 'remark', label: '备注'},
          {prop: 'createBy', label: '创建人'},
          {prop: 'creationDate', label: '创建时间'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'AdminRoleView'},
          {id: 'edit', dialog: 'AdminRoleEdit'},
          {id: 'add', dialog: 'AdminRoleAdd'},
          {id: 'addUser', dialog: 'AdminRoleAddUser'},
          {id: 'auth', dialog: 'AdminRoleAuth'}
        ]
      }
    },
    created() {
    },
    methods: {
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'auth' : { // 权限查看
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'auth'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('', false, row)
            }, 20)
            break
          }
          case 'addUser':
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
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
