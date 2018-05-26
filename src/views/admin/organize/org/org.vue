<!--
描述：系统应用-机构管理
开发人：fengjing
开发日期：2018年01月18日
-->

<template lang="pug">
  keep-alive
    kalix-tree-grid(
    v-bind:columns='columns'
    v-bind:targetURL="targetURL"
    v-bind:customTableTool="customTableTool"
    title="机构列表"
    v-bind:bizSearch="'AdminOrgSearch'"
    v-bind:btnList="btnList"
    v-bind:bizDialog="bizDialog"
    v-bind:formModel="formModel"
    v-bind:dialogOptions="dialogOptions"
    v-on:selectedRow="selectedRow"
    v-bind:isSearchAfterHandle="true"
    v-on:handleAfterSearch="handleAfterSearch"
    v-bind:isLimitLayer="false")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {orgBtnList} from '../org/config'
  import {orgURL} from '../../config.toml'

  export default {
    name: 'kalix-admin-org',
    data() {
      return {
        btnList: orgBtnList,
        targetURL: orgURL,
        formModel: Object.assign({}, FormModel),
        columns: [{
          type: 'hidden',
          key: 'id',
          width: '0'
        }, {
          type: 'hidden',
          key: 'parentId',
          width: '0'
        }, {
          title: '名称',
          key: 'name',
          width: '150'
        }, {
          title: '机构代码',
          key: 'code',
          sortable: true,
          width: '150'
        }, {
          title: '创建人',
          key: 'createBy',
          width: '150'
        }, {
          title: '创建日期',
          key: 'creationDate',
          width: '150'
        }, {
          title: '操作',
          type: 'action',
          actions: [{
            type: 'edit',
            text: '编辑',
            icon: 'el-icon-edit'
          }, {
            type: 'delete',
            text: '删除',
            icon: 'el-icon-delete'
          }, {
            type: 'addUser',
            text: '用户',
            toolTipTitle: '添加用户',
            icon: 'el-icon-delete'
          }],
          width: '150'
        }],
        bizDialog: [
          {id: 'edit', dialog: 'AdminOrgEdit'},
          {id: 'add', dialog: 'AdminOrgAdd'},
          {id: 'addUser', dialog: 'AdminOrgAddUser'}
        ],
        dialogOptions: {}
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'addUser': // 增加用户
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'addUser'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加用户', false, row)
            }, 20)
            break
        }
      },
      selectedRow(row) {
        if (row) {
          this.dialogOptions = {
            parentId: row.id,
            // 选中以后orgName 为当前选中行的值
            orgName: row.name
          }
        }
      },
      handleAfterSearch(tableData) {
        if (tableData && tableData.length) {
          this.dialogOptions = {
            parentId: tableData[0].parentId,
            // 未被选中时orgName 为父节点名
            orgName: tableData[0].parentName
          }
        }
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
