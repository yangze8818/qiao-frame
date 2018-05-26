<!--
描述：menu菜单中的操作按钮列表
开发人：yangz
开发日期：2018年3月7日
-->
<template lang="pug">
  div
    template(v-for="btn in btnList")
      template(v-if="btn.isShow")
        el-tooltip(v-bind:content="btn.title" placement="top" style="float:right")
          span.operation-btn(v-on:click.stop="handleOption(item, btn.id)") {{btn.title}}&nbsp;
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      item: {
        type: Object
      },
      btnList: {  // 工具按钮的列表
        type: Array,
        required: true,
        default: () => {
          return [
            {id: 'view', title: '查看', isShow: true},
            {id: 'edit', title: '编辑', isShow: true},
            {id: 'delete', title: '删除', isShow: true}]
        }
      }
    },
    methods: {
      handleOption(item, btnId) {
        this.$emit('handleItemOption', item, btnId)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
</style>
