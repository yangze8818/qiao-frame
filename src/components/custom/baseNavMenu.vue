<!--
左侧菜单组件，点击菜单时传递菜单节点对象
add by yangz
-->
<template lang="pug">
  div.kalix-article
    div.kalix-wrapper
      div.kalix-wrapper-hd
        //i.tit_icon.iconfont.icon-application-management
        i(v-bind:class="iconCurrentCls")
        | {{title}}
      div.kalix-wrapper-bd
        kalix-tool-bar(v-if="isShowToolBar"
          v-bind:toolbarBtnList="toolbarBtnList"
          v-on:onToolBarClick="onToolBarClick"
          v-on:onCheckBtnList="onCheckBtnList")
        div.kalix-navmenu-container
          el-menu(v-bind:default-active="activeIndex" v-bind:active="activeIndex" v-on:select="handleSelect")
            <!--el-menu-item(v-for="item in menuItems" key="item.id" v-bind:index="item.id+'##'+item.name+'##'+item.code")-->
            slot(name="menuItemSlot")
              el-menu-item(v-for="item in menuItems" v-bind:key="item.id" v-bind:index="JSON.stringify(item)")
                i(v-bind:class="item.iconCls")
                span(slot="title")
                  | {{item.text}}
        component(:is="whichBizDialog" ref="kalixDialog"
          v-bind:formModel="formModel"
          v-bind:formRules="formRules")
</template>

<script type="text/ecmascript-6">
  import BaseToolBar from './baseToolBar'
  import EventBus from 'common/eventbus'
  import Cache from 'common/cache'
  import {ON_REFRESH_DATA} from './event.toml'

  export default {
    name: 'baseNavMenu',
    props: {
      activeIndex: {
        type: String
      },
      title: {  // 菜单面板标题名
        type: String,
        required: true
      },
      toolbarBtnList: {   //  toolBar 中按钮数组
        type: Array,
        default: () => {
          return []
        }
      },
      menuItems: {
        type: Array,
        default: () => {
          return []
        }
      },
      menuUrl: {
        type: String,
        required: true
      },
      basePath: {
        type: String
      },
      paramStr: {
        type: String
      },
      bizDialog: {  //  使用的对话框组件名称
        type: Array
      },
      formModel: {  //  新建，查看，编辑使用的 form 对象模型
        type: Object
      },
      formRules: {  //  from 对象验证参数
        type: Object
      },
      isIconSelf: {
        type: Boolean,
        default: false
      },
      selfIconCls: {
        type: String,
        default: ''
      },
      dialogOptions: {},
      bizKey: {  // 主鍵
        type: String
      }
    },
    components: {
      KalixToolBar: BaseToolBar
    },
    created() {
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    data() {
      return {
        isShowToolBar: true,
        whichBizDialog: '',
        iconCurrentCls: ''
      }
    },
    computed: {
    },
    mounted() {
      EventBus.$on(this.bizKey + '-' + 'KalixDialogClose', () => {
        this.whichBizDialog = ''
      })
      //  绑定表格 icon 图标
      if (this.isIconSelf === false) {
        const currentTreeListItem = JSON.parse(Cache.get('currentTreeListItem'))
        if (currentTreeListItem) {
          this.iconCurrentCls = currentTreeListItem.iconCls
        }
      } else {
        this.iconCurrentCls = this.selfIconCls
      }
      this.getMenu()
    },
    activated() {
      EventBus.$on(ON_REFRESH_DATA, this.onRefresh)
    },
    deactivated() {
      EventBus.$off(ON_REFRESH_DATA)
    },
    methods: {
      onCheckBtnList(flag) {
        this.isShowToolBar = flag
      },
      onToolBarClick(btnId) {
        if (btnId === 'refresh') {
          this.onRefreshClick()
        } else if (btnId === 'add') {
          this.onAddClick()
        }
      },
      onRefresh(val) {
        if (val === this.bizKey) {
          let selectRow = 'last'
          this.getMenu(true, selectRow)
        }
      },
      onRefreshClick() { // 刷新按钮点击事件
        let selectRow = 'first'
        this.getMenu(true, selectRow)
      },
      onAddClick() {
        let that = this
        let dig = this.bizDialog.filter((item) => {
          return item.id === 'add'
        })
        this.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加')
          if (typeof (this.$refs.kalixDialog.init) === 'function') {
            that.$refs.kalixDialog.init(this.dialogOptions, null) // 需要传参数，就在dialog里面定义init方法
          }
        }, 20)
      },
      handleSelect(key, keyPath) {
        this.$emit('menuItem', JSON.parse(key), this.bizKey)
      },
      getMenu(setActive, selectRow) {
        let _data = {
          jsonStr: this.paramStr
        }
        this.axios.get(this.menuUrl, {
          params: _data
        }).then(response => {
          if (response.data) {
            response.data.active = setActive
            response.data.selectRow = selectRow
            this.$emit('menuItems', response.data, this.bizKey)
          }
        })
      },
      getKalixDialog(opt, callBack) {
        let dig = this.bizDialog.filter((item) => {
          return item.id === opt
        })
        this.whichBizDialog = dig[0].dialog
        setTimeout(() => {
          callBack(this.$refs.kalixDialog)
        }, 20)
      }
    },
    watch: {
      activeIndex(newVal, oldVal) {
        return newVal
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/baseNavMenu"
  .kalix-navmenu-container
    overflow auto
</style>
