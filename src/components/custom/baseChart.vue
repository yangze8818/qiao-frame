<template lang="pug">
  div.kalix-article
    keep-alive
      component(:is="bizSearch" ref="bizSearchRef" v-if="bizSearch"
      v-on:onSearchBtnClick="onSearchClick" v-on:getProp="getProp" v-on:selectVal="selectVal")
    div.kalix-wrapper(v-bind:style="setWrapperStyle()")
      div.kalix-wrapper-hd
        i(v-bind:class="iconCls")
        | {{title}}
      div.kalix-wrapper-bd
        div.kalix-chart-container
          kalix-chart-view(v-bind:autoload="autoload" v-bind:id="bizKey" v-bind:targetUrl="chartTargetUrl"
            v-bind:width="width" v-bind:height="height" v-bind:option="chartOption")

</template>

<script type="text/ecmascript-6">
  import BaseChartView from './baseChartView'
  import EventBus from 'common/eventbus'
  import Cache from 'common/cache'
  import {
    ON_SEARCH_BUTTON_CLICK
  } from './event.toml'

  export default {
    name: 'baseChart',
    props: {
      autoload: { // 是否自动加载图表
        type: Boolean,
        default: true
      },
      chartTargetUrl: { // 图表加载的URL
        type: String,
        default: ''
      },
      // chartOption: { // 图表数据对象
      //   type: Object
      // },
      width: { // 图表宽度
        type: String,
        default: '400px'
      },
      height: { // 图表高度
        type: String,
        default: '300px'
      },
      bizSearch: {  //  使用的搜索组件名称
        type: String
      },
      bizKey: {  // 主鍵
        type: String,
        required: true
      },
      title: {  // 图表组件标题名
        type: String,
        required: true
      },
      jsonStr: {  //  数据列表请求的查询条件
        type: String,
        default: ''
      },
      appendCondition: {
        type: Array
      }
    },
    components: {
      KalixChartView: BaseChartView
    },
    data() {
      return {
        iconCls: '',
        searchParam: {},
        chartOption: undefined
      }
    },
    mounted() {
      const currentTreeListItem = JSON.parse(Cache.get('currentTreeListItem'))
      if (currentTreeListItem) {
        this.iconCls = currentTreeListItem.iconCls
      }
      // this.$nextTick(() => {
      //   console.log('AAA targetURL:', this.chartTargetUrl)
      // })
    },
    methods: {
      setWrapperStyle() {
        if (!this.bizSearch) {
          return {'top': 0}
        }
        return {}
      },
      onSearchClick(_searchParam) { // 查询按钮点击事件
        console.log('[kalix] base chart search clicked')
        this.searchParam = _searchParam
        this.refresh()
      },
      refresh() { // 刷新表格数据
        console.log('[kalix] ' + this.title + ' refresh is trigger!')
        this.getData()
      },
      getData() {
        // console.log('baseChart:=========', this.chartTargetUrl)
        if (!this.chartTargetUrl) {
          return
        }
        // let that = this
        setTimeout(_ => {
          let _data = {
            jsonStr: this.jsonStr
          }
          _data = Object.assign(_data, this.searchParam)
          if (this.appendCondition && _data.jsonStr.length > 0) {
            _data.jsonStr = _data.jsonStr.substring(0, _data.jsonStr.length - 1) + ',' + this.appendCondition + '}'
          }
          this.$http.get(this.chartTargetUrl, {
            params: _data
          }).then(response => {
            if (response.data.data) {
              let opt = response.data.data[0].option
              opt = JSON.parse(opt)
              this.chartOption = opt
            } else {
              this.chartOption = {}
            }
          })
        })
      },
      selectVal(val) {
        this.$emit('selectVal', val)
      },
      getProp(val) {
        this.$emit('getProp', val)
      }
    },
    watch: {
      // chartTargetUrl(newVal, oldVal) {
      //   this.getData()
      // }
    },
    activated() {
      console.log('event is activate')
      EventBus.$on(ON_SEARCH_BUTTON_CLICK, this.onSearchClick)
    },
    deactivated() {
      console.log('event is disactivate')
      EventBus.$off(ON_SEARCH_BUTTON_CLICK)
    }
  }
</script>

<style scoped lang='stylus' type='text/stylus'>
  @import "~@/assets/stylus/baseChart"
</style>
