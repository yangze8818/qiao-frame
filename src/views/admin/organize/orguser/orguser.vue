<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.orguser-row(:gutter="0")
        el-col.orguser-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-org-tree(treeTitle="机构列表" v-on:orgTreeClick="onOrgTreeClick")
        el-col.orguser-col(:span="16")
          kalix-user.orguser-wrapper(bizKey='orguser' v-bind:targetURL="targetURL"
          v-bind:bizSearch="bizSearch" ref="kalixUser")
</template>

<script type="text/ecmascript-6">
  import KalixUser from '../../auth/user/user.vue'
  import {usersURL} from '../../config.toml'

  export default {
    name: 'kalix-admin-orguser',
    data() {
      return {
        targetURL: usersURL,
        bizSearch: null
      }
    },
    methods: {
      onOrgTreeClick(data) {
        this.targetURL = `/camel/rest/orgs/${data.id}/users/list`
      }
    },
    components: {
      KalixUser
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "../../../../assets/stylus/baseTable.styl"
  @import "../../../../assets/stylus/color.styl"
  .kalix-search
    position relative
    margin 5px
    border 1px solid border-color_1
    box-sizing border-box
    .kalix-search-hd
      background-color #5fa2dd
      color txt-color_1
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-search-bd
      position absolute
      border-top 1px solid border-color_1
      font-size 0
      padding 5px 15px
      text-align left
      top 44px
      left 0
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      .search-container
        display flex
      .kalix-tree-wrapper
        position: absolute;
        top 60px
        right 10px
        bottom 10px
        left 10px
        padding-right 16px
        box-sizing border-box
        overflow auto

  .kalix-article
    position relative
    height 100%
    overflow hidden
    box-sizing border-box
    .kalix-search,
    .kalix-wrapper
      height 100%
      margin 0
      box-sizing border-box
    .kalix-search
      margin-top 0 !important
    .kalix-wrapper
      margin-bottom 0 !important
      position relative
      top 0
      .kalix-wrapper-hd
        height 44px
      .kalix-wrapper-bd
        position absolute
        top 44px
        bottom 0
        left 0
        width 100%
        box-sizing border-box
        padding 12px
        .kalix-table-container
          position relative
          top 0
          height 100%
          margin 0

  .orguser-row
    height 100%
    .orguser-col
      height 100%
      box-sizing border-box

  .orguser-wrapper
    margin 8px 0
    .kalix-wrapper
      bottom 0 !important
</style>
