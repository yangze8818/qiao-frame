<!--
描述：显示系统应用组件
     显示系统应用名
开发人：zangyanming
开发日期：2017年9月1日
-->
<template>
  <el-select
    v-model='currentValue'
    v-on:change="onChange">
    <el-option
      v-for='app in appList'
      :key='app.id'
      :label='app.text'
      :value='app.text'>
    </el-option>
  </el-select>
</template>

<script>
  import {appsURL} from '../../config.toml'

  export default {
    props: {
      value: {
        required: true
      }
      // 用于绑定v-model
    },
    data() {
      return {
        appList: [],
        targetURL: appsURL,
        loading: true,
        currentValue: this.value,
        selectApp: {}
      }
    },
    mounted() {
      this.remoteMethod()
    },
    methods: {
      onChange(value) {
        let apps = this.appList.filter((item) => {
          return item.id === value
        })
        this.selectApp = apps[0] || {}
        console.log(`[kalix]-[appselect.vue] current app is `, this.selectApp)
        // this.$emit('appSelected', this.selectApp)  // 发送事件
        this.$emit('input', value)
      },
      remoteMethod(query) {
        if (query !== '') {
          this.$emit('input', this.currentValue)
          // 设置model的数值
          this.loading = true
          setTimeout(() => {
            this.loading = true
            let _data = {
              page: 1,
              start: 0,
              limit: 200
            }
            this.axios.get(appsURL, {
              params: _data
            }).then(response => {
              this.appList = response.data
              console.log(response.data)
            })
          }, 100)
        } else {
          this.appList = []
        }
      }
    }
  }
</script>


