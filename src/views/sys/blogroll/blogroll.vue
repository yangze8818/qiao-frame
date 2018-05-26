<template lang="pug">
  keep-alive
    kalix-table(bizKey="blogroll" title='友情链接列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="blogrollURL"
    v-bind:bizDialog="blogrollDialog"
    v-bind:btnList="blogrollBtnList"
    bizSearch="QiaoBlogrollSearch")
</template>

<script type="text/ecmascript-6">
  import {QiaoBlogrollURL} from '../config.toml'
  import {blogrollConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-blogroll',
    data() {
      return {
        blogrollURL: QiaoBlogrollURL,
        tableFields: [
          {prop: 'linktext', label: '友情链接文字'},
          {prop: 'texturl', label: '跳转位置'}
        ],
        blogrollDialog: [
          {id: 'add', dialog: 'QiaoBlogrollAdd'},
          {id: 'view', dialog: 'QiaoBlogrollView'},
          {id: 'edit', dialog: 'QiaoBlogrollEdit'}
        ],
        blogrollBtnList: blogrollConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
