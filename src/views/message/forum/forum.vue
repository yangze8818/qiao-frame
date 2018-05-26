<template lang="pug">
  keep-alive
    kalix-table(bizKey="forum" title='留言列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="forumURL"
    v-bind:bizDialog="forumDialog"
    v-bind:btnList="forumBtnList"
    bizSearch="QiaoForumSearch" v-bind:dictDefine="dictDefine")
</template>

<script type="text/ecmascript-6">
  import {QiaoForumURL} from '../../message/config.toml'
  import {forumConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-forum',
    data() {
      return {
        forumURL: QiaoForumURL,
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'QIAO-DICT-KEY',
          type: '审核标识',
          targetField: 'categoryName',
          sourceField: 'category'
        }],
        tableFields: [
          {prop: 'idcard', label: '发帖人别名'},
          {prop: 'title', label: '帖子标题'},
          {prop: 'content', label: '帖子内容'},
          {prop: 'type', label: '留言分类'},
          {prop: 'category', label: '审核标识'},
          {prop: 'categorytype', label: '类型标识'},
          {prop: 'categoryName', label: '类型标识'}
        ],
        forumDialog: [
          {id: 'add', dialog: 'QiaoForumAdd'},
          {id: 'auditing', dialog: 'QiaoForumAuditing'},
          {id: 'view', dialog: 'QiaoForumView'},
          {id: 'edit', dialog: 'QiaoForumEdit'}
        ],
        forumBtnList: forumConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
