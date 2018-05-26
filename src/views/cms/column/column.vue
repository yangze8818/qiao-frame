<template lang="pug">
  keep-alive
    kalix-table(bizKey="column" title='栏目列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="columnURL"
    v-bind:bizDialog="columnDialog"
    v-bind:btnList="columnBtnList"
    bizSearch="QiaoColumnSearch")
</template>

<script type="text/ecmascript-6">
  import {QiaoColumnURL} from '../config.toml'
  import {columnConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-column',
    data() {
      return {
        columnURL: QiaoColumnURL,
        tableFields: [
          {prop: 'name', label: '栏目名称'},
          {prop: 'sequence', label: '排序号'},
          {prop: 'url', label: '栏目路由'}
        ],
        columnDialog: [
          {id: 'add', dialog: 'QiaoColumnAdd'},
          {id: 'view', dialog: 'QiaoColumnView'},
          {id: 'edit', dialog: 'QiaoColumnEdit'}
        ],
        columnBtnList: columnConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
