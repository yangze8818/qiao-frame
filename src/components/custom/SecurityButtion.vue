<!--
描述：可以进行安全认证的button组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template>
  <div>
    <el-button v-if="isShow" type="text" size="large">{{title}}</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  import {SecurityBtnUrl} from 'config/global.toml'

  const NO_PERMISSION = 'no_permission'  // 无需授权

  export default {
    data() {
      return {
        isShow: false
      }
    },
    props: {
      permission: { // 权限标识
        type: String,
        required: true,
        default: NO_PERMISSION
      },
      title: { // 按钮显示标题
        type: String,
        required: true
      }
    },
    mounted() {
      if (this.permission !== NO_PERMISSION) {
        this.getData()
      } else {
        this.isShow = true
      }
    },
    methods: {
      getData() {
        this.axios.get({
          url: SecurityBtnUrl + this.permission
        }).then(response => {
          response.data.buttons.map((item) => {
            if (item.permission === this.permission) {
              this.isShow = item.status
              console.log(`[kalix] ${item.permission}  can be set to ${item.status}`)
            }
          })
        })
      }
    }
  }
</script>

<style  scoped lang="stylus" type="text/stylus">
</style>
