<!--
描述：checkbox 组件的二次封装
开发人：hqj
开发日期：2018年02月05日
-->
<template lang="pug">
  div(style="width:100%;")
    el-checkbox(v-model="checkAll" v-bind:indeterminate="isIndeterminate" v-bind:disabled="disabled" v-on:change="handleCheckAllChange") 全选
    div(style="margin: 15px 0;")
    el-checkbox-group(v-model="checkedOptions" v-on:change="handleCheckedOptionsChange")
      el-checkbox(v-for="item in options" v-bind:label="item" v-bind:key="item" v-bind:disabled="disabled") {{item}}
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      dataUrl: {
        type: String, default: ''
      },
      value: null,
      disabled: {
        type: Boolean, default: false
      }
    },
    data() {
      return {
        checkAll: false,
        isIndeterminate: false,
        options: [],
        checkedOptions: []
      }
    },
    mounted() {
      this.initOptions()
    },
    methods: {
      initOptions() {
        if (!this.dataUrl) {
          return
        }
        this.axios.request({
          method: 'GET',
          url: this.dataUrl,
          params: {}
        }).then(res => {
          if (res.data.success === undefined) {
            if (res.data) {
              this.options = res.data

              if (this.value) {
                this.checkedOptions = this.value.split(',')
              }
              let checkedCount = this.checkedOptions.length
              this.checkAll = checkedCount === this.options.length
              this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length
            }
          }
        })
      },
      handleCheckAllChange(val) {
        this.checkedOptions = val ? this.options : []
        this.isIndeterminate = false
        this.$emit('input', val ? this.options.join(',') : '')
      },
      handleCheckedOptionsChange(value) {
        let checkedCount = value.length
        this.checkAll = checkedCount === this.options.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.options.length
        this.$emit('input', value.join(','))
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
