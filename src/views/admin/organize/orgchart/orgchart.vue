<template lang="pug">
  div(id="chart-container")
</template>

<script type="text/ecmascript-6">
  import OrgChart from './orgchart.js'
  import './orgchart.css'

  export default {
    name: 'kalix-admin-orgchart',
    data() {
      return {
        datascource: {}
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let url = '/camel/rest/orgs?node=root'
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          this.datascource = res.data.children[0]
          /* eslint-disable no-new */
          new OrgChart({
            'chartContainer': '#chart-container',
            'data': this.datascource,
            'nodeContent': 'text',
            'direction': 'l2r',
            'depth': 2,
            'pan': true,
            'zoom': true
          })
        })
      }
    }
  }
</script>

<style scoped lang="stylus">
</style>
