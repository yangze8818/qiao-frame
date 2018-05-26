<template lang="pug">
  keep-alive
    kalix-table(bizKey="advert" title='广告列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="advertURL"
    v-bind:bizDialog="advertDialog"
    v-bind:btnList="advertBtnList"
    bizSearch="QiaoAdvertSearch")
</template>

<script type="text/ecmascript-6">
  import {QiaoAdvertURL} from '../config.toml'
  import {advertConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-advert',
    data() {
      return {
        advertURL: QiaoAdvertURL,
        tableFields: [
          {prop: 'imgurl', label: '广告图片'},
          {prop: 'name', label: '广告名称'},
          {prop: 'link', label: '广告链接'}
        ],
        advertDialog: [
          {id: 'add', dialog: 'QiaoAdvertAdd'},
          {id: 'view', dialog: 'QiaoAdvertView'},
          {id: 'edit', dialog: 'QiaoAdvertEdit'}
        ],
        advertBtnList: advertConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
