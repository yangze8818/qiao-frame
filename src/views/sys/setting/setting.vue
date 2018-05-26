<template lang="pug">
  keep-alive
    kalix-table(bizKey="setting" title='公司基本信息列表' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="settingURL"
    v-bind:bizDialog="settingDialog"
    v-bind:btnList="settingBtnList"
    bizSearch="QiaoSettingSearch")
</template>

<script type="text/ecmascript-6">
  import {QiaoSettingURL} from '../config.toml'
  import {settingConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-setting',
    data() {
      return {
        settingURL: QiaoSettingURL,
        tableFields: [
          {prop: 'site', label: '公司网址'},
          {prop: 'phone', label: '公司电话'}
        ],
        settingDialog: [
          {id: 'view', dialog: 'QiaoSettingView'},
          {id: 'edit', dialog: 'QiaoSettingEdit'}
        ],
        settingBtnList: settingConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
