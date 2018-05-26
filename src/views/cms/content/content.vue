<template lang="pug">
  keep-alive
    kalix-table(bizKey="content" title='内容列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="contentURL"
    v-bind:bizDialog="contentDialog"
    v-bind:btnList="contentBtnList"
    bizSearch="QiaoContentSearch")
</template>

<script type="text/ecmascript-6">
  import {QiaoContentURL} from '../config.toml'
  import {contentConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-content',
    data() {
      return {
        contentURL: QiaoContentURL,
        tableFields: [
          {prop: 'title', label: '标题'},
          {prop: 'subtitle', label: '次标题'},
          {prop: 'content', label: '内容'},
          {prop: 'sequence', label: '排序号'}
        ],
        contentDialog: [
          {id: 'add', dialog: 'QiaoContentAdd'},
          {id: 'view', dialog: 'QiaoContentView'},
          {id: 'edit', dialog: 'QiaoContentEdit'}
        ],
        contentBtnList: contentConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
