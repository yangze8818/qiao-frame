<template lang="pug">
  keep-alive
    kalix-table(bizKey="dataauth" title='数据权限列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:bizDialog="bizDialog" v-bind:bizSearch="'AdminDataAuthSearch'" v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine" v-bind:customTableTool="customTableTool")
</template>

<script type="text/ecmascript-6">
  import {dataauthURL, DataAuthToolButtonList, AdminCacheKey} from '../../config.toml'

  export default {
    name: 'kalix-admin-dataauth',
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: AdminCacheKey,
          type: '数据权限',
          targetField: 'typeDict',
          sourceField: 'type'
        }],
        btnList: DataAuthToolButtonList,
        targetURL: dataauthURL,
        tableFields: [
          {prop: 'appName', label: '应用名称'},
          {prop: 'menuName', label: '菜单名称'},
          {prop: 'typeDict', label: '数据权限'},
          {prop: 'creationDate', label: '创建时间'},
          {prop: 'updateDate', label: '更新时间'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'AdminDataAuthView'},
          {id: 'add', dialog: 'AdminDataAuthAdd'},
          {id: 'edit', dialog: 'AdminDataAuthAdd'},
          {id: 'addUser', dialog: 'AdminDataAuthAddUser'}
        ]
      }
    },
    methods: {
      customTableTool(row, btnId, that) {
        // if (btnId === 'addUser') {
        //    this.$refs.myDialog.open()
        //    table.whichBizDialog = 'AdminDataAuthAddUser'
        //    setTimeout(() => {
        //      table.$refs.kalixDialog.$refs.kalixBizDialog.open('添加用户', false, row)
        //    }, 200)
        //    table.$refs.myDialog.openDialog('', {})
        //  }
        if (btnId === 'addUser') {
          that.whichBizDialog = 'AdminDataAuthAddUser'
          let dig = that.bizDialog.filter((item) => {
            return item.id === 'addUser'
          })
          that.whichBizDialog = dig[0].dialog
          setTimeout(() => {
            that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加用户', false, row)
          }, 20)
        }
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
