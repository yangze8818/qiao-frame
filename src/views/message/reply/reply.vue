<template lang="pug">
  keep-alive
    kalix-table(bizKey="reply" title='回复列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="replyURL"
    v-bind:bizDialog="replyDialog"
    v-bind:btnList="replyBtnList"
    bizSearch="QiaoReplySearch")
</template>

<script type="text/ecmascript-6">
  import {QiaoReplyURL} from '../../message/config.toml'
  import {replyConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-reply',
    data() {
      return {
        replyURL: QiaoReplyURL,
        tableFields: [
          {prop: 'username', label: '回复人姓名'},
          {prop: 'content', label: '回复内容'},
          {prop: 'category', label: '审核标识'}
        ],
        replyDialog: [
          {id: 'add', dialog: 'QiaoReplyAdd'},
          {id: 'view', dialog: 'QiaoReplyView'},
          {id: 'edit', dialog: 'QiaoReplyEdit'}
        ],
        replyBtnList: replyConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
