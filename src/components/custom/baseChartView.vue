<!--
描述：chart 组件的封装
开发人：yangz
开发日期：2018年1月15日
-->

<template lang="pug">
  div.kalix-chart
    figure
      div(v-if="autoload" v-bind:id="id" v-bind:style="{width:width, height:height}" v-bind:targetUrl="targetUrl"
        v-bind:option="option" v-bind:jsonStr="jsonStr")
      div(v-else v-bind:id="id" v-bind:style="{width:width, height:height}" v-bind:option="option")
</template>

<script type="text/ecmascript-6">
  import ECharts from 'echarts'
  export default {
    name: 'baseChart',
    component: {
      ECharts
    },
    props: {
      autoload: { // 是否自动加载图表
        type: Boolean,
        default: true
      },
      id: { // 图表ID
        type: String,
        default: '',
        requred: true
      },
      targetUrl: { // 图表加载的URL
        type: String,
        default: ''
      },
      option: { // 图表数据对象
        type: Object
      },
      width: { // 图表宽度
        type: String,
        default: '400px'
      },
      height: { // 图表高度
        type: String,
        default: '300px'
      },
      jsonStr: {
        type: Object
      }
    },
    data() {
      return {
        chartObj: null
      }
    },
    mounted() {
      this.initChart()
      this.targetUrl && this.autoload === true ? this.loadChartByUrl() : this.loadChartByOption(this.option)
    },
    methods: {
      loadChartByUrl() {
        this.$http.get(this.targetUrl, {
          params: ''
        }).then(response => {
          var opt = response.data.data[0].option
          opt = JSON.parse(opt)
          this.chartObj.setOption(opt)
          window.onresize = this.chartObj.resize
        }).catch(() => {
        })
      },
      loadChartByOption(option) {
        if (option) {
          this.chartObj.setOption(option, true)
          window.onresize = this.chartObj.resize
        }
      },
      initChart() {
        let _id = this.id
        this.chartObj = ECharts.init(document.getElementById(_id))
      }
    },
    watch: {
      option(curVal, oldVal) {
        this.loadChartByOption(curVal)
      }
    }
  }
</script>

<style scoped lang='stylus' type='text/stylus'>
  .kalix-chart
    position relative
</style>
