<template lang="pug">
  keep-alive
    kalix-table(bizKey="district" title='地区编码' ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="districtURL"
    v-bind:bizDialog="districtDialog"
    v-bind:btnList="districtBtnList"
    bizSearch="QiaoDistrictSearch")
</template>

<script type="text/ecmascript-6">
  import {QiaoDistrictURL} from '../config.toml'
  import {districtConfigBtnList} from './config'

  export default {
    name: 'kalix-qiao-district',
    data() {
      return {
        districtURL: QiaoDistrictURL,
        tableFields: [
          {prop: 'coding', label: '地区编码'},
          {prop: 'bewrite', label: '地区描述'},
          {prop: 'parentencoding', label: '上级编码'}
        ],
        districtDialog: [
          {id: 'add', dialog: 'QiaoDistrictAdd'},
          {id: 'view', dialog: 'QiaoDistrictView'},
          {id: 'edit', dialog: 'QiaoDistrictEdit'}
        ],
        districtBtnList: districtConfigBtnList
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
