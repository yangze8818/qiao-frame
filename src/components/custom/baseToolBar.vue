<!--
描述：table上方工具栏组件的二次封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.kalix-base-tool-bar
    template(v-for="btn in defaultBtnList")
      el-button(v-if="btn.isShow" v-on:click="toggle(btn.id)" v-bind:type="btn.type||'primary'"
        v-bind:disabled="btn.isDisable")
        i.iconfont(v-bind:class="btn.icon")
        | {{btn.title}}
</template>

<script type="text/ecmascript-6">
  import {ON_TOOLBAR_CLICK} from './event.toml'
  import {GlobalToolBarButtonList} from 'config/global.toml'
  import {concatArrayObject, getNewObject} from 'common/util.js'

  export default {
    props: {
      toolbarBtnList: {
        type: Array
      },
      bizKey: {
        type: String
      }
    },
    data() {
      return {
        defaultBtnList: []
      }
    },
    created() {
      this.initToolBtnList()
    },
    watch: {
      toolbarBtnList(newVal, oldVal) {
        this.initToolBtnList()
      }
    },
    methods: {
      initToolBtnList() {
        let defaultToolBarBtnList = getNewObject(GlobalToolBarButtonList)
        this.defaultBtnList = concatArrayObject(this.toolbarBtnList, defaultToolBarBtnList)
        let items = this.defaultBtnList.filter(item => {
          return item.isShow
        })
        this.$emit('onCheckBtnList', items.length)
      },
      toggle(btnId) {
        this.$emit(ON_TOOLBAR_CLICK, btnId)
      }
    }
  }
</script>
