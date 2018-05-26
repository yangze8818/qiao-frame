<template lang="pug">
  keep-alive
    kalix-table(bizKey="menu" title='菜单列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="menuURL"
    v-bind:bizDialog="menuDialog"
    v-bind:btnList="menuBtnList"
    bizSearch="QiaoMenuSearch")
</template>

<script type="text/ecmascript-6">
  import {QiaoMenuURL} from '../config.toml'
  import {menuConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-menu',
    data() {
      return {
        menuURL: QiaoMenuURL,
        tableFields: [
          {prop: 'name', label: '菜单名称'},
          {prop: 'sequence', label: '排序号'},
          {prop: 'url', label: '菜单路由'},
          {prop: 'show', label: '是否展示'},
          {prop: 'message', label: '是否留言'}
        ],
        menuDialog: [
          {id: 'add', dialog: 'QiaoMenuAdd'},
          {id: 'view', dialog: 'QiaoMenuView'},
          {id: 'edit', dialog: 'QiaoMenuEdit'}
        ],
        menuBtnList: menuConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
