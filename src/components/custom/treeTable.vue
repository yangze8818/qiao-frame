<!--
描述：table 组件的二次封装
开发人：fengjing
开发日期：2017年12月04日
-->

<template lang="pug">
  div.kalix-article
    keep-alive
      component(:is="bizSearch" ref="bizSearchRef" v-if="bizSearch"
      v-on:onSearchBtnClick="onSearchClick")
    div.kalix-wrapper(v-bind:style="setWrapperStyle()")
      div.kalix-wrapper-hd
        i(v-bind:class="iconCls")
        | {{title}}
      div.kalix-wrapper-bd
        kalix-tool-bar(v-if="isShowToolBar"
        v-bind:toolbarBtnList="toolbarBtnList"
        v-on:onToolBarClick="onToolBarClick")
        div.kalix-table-container(ref="kalixTableContainer" v-bind:style="tableContainerStyle")
          el-table(:data="tableData5"  style="width:100%"
          v-bind:row-class-name="tableRowClassName"
          v-loading.body="loading" fit
          v-bind:height="tableHeight"
          class="demo-table-expand"
          v-on:selection-change="onTableSelectionChange"
          header-cell-class-name="base-table-th"
          cell-class-name="base-table-cell")
            //table的字段
            el-table-column(type="extend" width="55" align="center" )
            el-table-column(label="行号" width="70" align="center")
              template(slot-scope="scope")
                el-form(label-position="left" inline class="demo-table-expand")
                  el-form-item(label="商品名称")
              //  table的工具按钮
            slot(name="tableToolSlot")
              kalix-table-tool(:btnList="btnList" v-on:onTableToolBarClick="btnClick"
              v-bind:isFixedColumn="isFixedColumn")
          div.no-list(v-if="!tableData || !tableData.length > 0")
            div 暂无数据
        div.kalix-table-pagination.s-flex
          div.s-flex_item
          div.base-table-pager
            el-pagination(v-if="pager.totalCount"
            v-on:size-change="pagerSizeChange"
            v-on:current-change="pagerCurrentChange"
            v-bind:current-page="pager.currentPage"
            v-bind:page-sizes="pager.pageSizes"
            v-bind:page-size="1"
            layout="sizes, prev, next, slot, jumper,->"
            v-bind:total="pager.totalCount"
            prev-text="上一页"
            next-text="下一页")
              slot
                span.pager-slot
                  span.pager-count 共{{pageCount}}页
                  span.pager-current {{pager.currentPage}}/{{pageCount}}
          div.btn-wrapper(v-if="tableData.length")
            el-button(type="primary" size="small" v-on:click="onRefreshClick")
              i.iconfont.icon-refresh
              | 刷新
        component(:is="whichBizDialog" ref="kalixDialog"
        v-bind:formModel="formModel"
        v-bind:formRules="formRules")
</template>

<script type="text/ecmascript-6">
  import {PageConfig, SecurityBtnUrl} from 'config/global.toml'
  import TableTool from './baseTableTool'
  import ToolBar from './baseToolBar'
  import Dialog from './baseDialog'
  import Message from 'common/message'
  import EventBus from 'common/eventbus'
  import Cache from 'common/cache'
  import {DictKeyValueObject} from 'common/keyValueObject'
  import {
    ON_SEARCH_BUTTON_CLICK,
    ON_REFRESH_DATA
  } from './event.toml'

  export default {
    name: 'baseTable',
    props: {
      isFixedColumn: {
        type: Boolean,
        default: false
      },
      toolbarBtnList: {   //  toolBar 中按钮数组
        type: Array,
        default: () => {
          return []
        }
      },
      hasTableSelection: { // 表格是否有选择框
        type: Boolean,
        default: false
      },
      isShowToolBar: { // 是否显示工具栏
        type: Boolean,
        default: true
      },
      dialogOptions: {},
      bizKey: {  // 主鍵
        type: String,
        required: true
      },
      title: {  // 表格组件标题名
        type: String,
        required: true
      },
      buttonPermissionPrefix: { //  table中tool的按钮组件认证前缀
        type: String,
        default: ''   // 为空时候，不校验权限
      },
      bizSearch: {  //  使用的搜索组件名称
        type: String
      },
      bizDialog: {  //  使用的对话框组件名称
        type: Array
      },
      formModel: {  //  新建，查看，编辑使用的 form 对象模型
        type: Object
//        required: true
      },
      formRules: {  //  from 对象验证参数
        type: Object
//        required: true
      },
      targetURL: {  //  列表操作请求的 URL 地址
        type: String
//        required: true
      },
      jsonStr: {  //  数据列表请求的查询条件
        type: String,
        default: ''
      },
      tableFields: {   //  数据列表的列名
        type: Array
      },
      btnList: {   //  table中按钮数组
        type: Array,
        required: true
      },
      dictDefine: {  // 数据字典定义
        type: Array
      },
      customRender: { // 对table的数据进行自定义的修饰
        type: Function
      },
      customTableTool: { // 对table的操作按钮进行自定义的操作
        type: Function
      },
      customToolBar: { // 对 ToolBar 的操作按钮进行自定义的操作
        type: Function
      },
      tableRowClassName: { // 对table的一行数据进行样式定制
        type: Function
      },
      deleteAllUrl: {
        type: String,
        default: ''
      },
      customToolbarClickEvents: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    watch: {
      targetURL(newVal) {
        this.getData()
      }
    },
    data() {
      return {
        myFixed: true,
        iconCls: '',
        loading: true,
        tableData: [],
        totalCount: 0,
        whichBizDialog: '', //
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        },
        tableHeight: 0, //  列表组件高度
        searchParam: {},  //  列表查询条件
        tableData5: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
      }
    },
    created() {
      console.log('toolBarbtnList', this.toolBarbtnList)
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
      this.getData()
    },
    activated() {
      console.log(this.bizKey + '  is activated')
      EventBus.$on(ON_SEARCH_BUTTON_CLICK, this.onSearchClick)
      EventBus.$on(ON_REFRESH_DATA, this.refresh)
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
      EventBus.$off(ON_SEARCH_BUTTON_CLICK)
      EventBus.$off(ON_REFRESH_DATA)
    },
    mounted() {
      // 注册事件接受
      const that = this
      window.addEventListener('resize', () => {
        that._getTableHeight()
      })
      EventBus.$on(this.bizKey + '-' + 'KalixDialogClose', () => {
//        console.log(`%c[kalix] reset ${this.bizKey} whichBizDialog`, 'background: #222;color: #bada55')
        this.whichBizDialog = ''
      })
      //  绑定表格 icon 图标
      const currentTreeListItem = JSON.parse(Cache.get('currentTreeListItem'))
      if (currentTreeListItem) {
        this.iconCls = currentTreeListItem.iconCls
      }
    },
    methods: {
      onToolBarClick(btnId) {
        // baseToolBar 回调事件
        switch (btnId) {
          case 'add':
            this.onAddClick()
            break
          case 'refresh':
            this.onRefreshClick()
            break
          default:
            this.customToolBar(btnId, this)
            break
        }
      },
      onTableSelectionChange(val) {
        this.deleteList = val
      },
      setDictDefine(_data) { // 处理数据字典
        this.dictDefine.forEach((item) => {
          //  获取 对应的键值对 对象
          let _keyObj = DictKeyValueObject(item.cacheKey, item.type)
          console.log('[kalix]-[baseTable.vue] dict should get key is ', _keyObj)
          _data.forEach(function (e) {
            //  检测 _keyObj 是否存在
            if (_keyObj) {
              // 替换对应的列值
              e[item.targetField] = _keyObj[e[item.sourceField]]
            }
          })
        })
      },
      onSearchClick(_searchParam) { // 查询按钮点击事件
        console.log('[kalix] base table search clicked')
        this.searchParam = _searchParam
        this.refresh()
      },
      onAddClick() {
        // 添加按钮点击事件
//        this.whichBizDialog = ''
        let that = this
        let dig =
          this.bizDialog.filter((item) => {
            return item.id === 'add'
          })
//        console.log(dig[0].dialog)3
        this.whichBizDialog = dig[0].dialog
        console.log('[onAddClick]', dig[0].dialog)
//        this.$emit('update:formModel', {})
        setTimeout(() => {
//          EventBus.$emit(this.bizKey + '-' + ON_INIT_DIALOG_DATA, JSON.parse(this.tempFormModel))
          that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加')
          if (typeof (this.$refs.kalixDialog.init) === 'function') {
            that.$refs.kalixDialog.init(this.dialogOptions, null) // 需要传参数，就在dialog里面定义init方法
          }
        }, 20)
      },
      onRefreshClick() { // 刷新按钮点击事件
        this.getData()
      },
      onDeleteChecked() {
        // 删除选中
        if (!this.deleteAllUrl.length) {
          try {
            var exception = {message: '必须指定 deleteAllUrl'}
            throw exception
          } catch (e) {
            console.error(e.message)
          }
        }
        if (this.deleteList && this.deleteList.length > 0) {
          let ids = []
          this.deleteList.forEach(item => {
            ids.push(item.id)
          })
          this.$confirm('确定要删除吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            return this.axios.request({
              method: 'DELETE',
              url: this.deleteAllUrl,
              params: {
                ids: ids.join(':')
              }
            })
          }).then(response => {
            Message.success(response.data.msg)
            this.getData()
          }).catch(() => {
          })
        } else {
          Message.error('至少选择一条数据')
        }
      },
      refresh() { // 刷新表格数据
        console.log('[kalix] ' + this.title + ' refresh is trigger!')
        this.getData()
      },
      btnClick(row, btnId) { // table工具栏点击事件
        console.log(row, btnId)
        switch (btnId) {
          case 'view': {
            let that = this
            let dig =
              this.bizDialog.filter((item) => {
                return item.id === 'view'
              })
            this.whichBizDialog = dig[0].dialog
            setTimeout(() => {
//              this.$emit('update:formModel', row)
//              EventBus.$emit(this.bizKey + '-' + ON_INIT_DIALOG_DATA, row)
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('查看', false, row)
            }, 20)
            break
          }

          case 'edit': {
            this.whichBizDialog = ''
            let dig =
              this.bizDialog.filter((item) => {
                return item.id === 'edit'
              })
            console.log('[kalix] edit dialog is: ' + dig[0].dialog)
            this.whichBizDialog = dig[0].dialog
            setTimeout(() => {
//              this.$emit('update:formModel', row)
//              EventBus.$emit(this.bizKey + '-' + ON_INIT_DIALOG_DATA, row)
              this.$refs.kalixDialog.$refs.kalixBizDialog.open('编辑', true, row)
              if (typeof (this.$refs.kalixDialog.init) === 'function') {
                this.$refs.kalixDialog.init(this.dialogOptions, row)
              }
            }, 20)
            console.log('edit is clicked')
            break
          }

          case 'delete': {
            console.log('delete is clicked')
            this.$confirm('确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.axios.request({
                method: 'DELETE',
                url: this.targetURL + '/' + row.id,
                params: {},
                data: {
                  id: row.id
                }
              })
            }).then(response => {
              this.getData()
              Message.success(response.data.msg)
            }).catch(() => {
            })
            break
          }

          case 'attachment': {
            console.log('attachment is clicked')
            let that = this
            this.whichBizDialog = 'AttachmentDialog'
            setTimeout(() => {
              that.$refs.kalixDialog.openDialog(row, this.bizKey)
            }, 20)
            break
          }

          default: // 默认转到调用props的方法
            this.customTableTool(row, btnId, this)
            break
        }
      },
      pagerSizeChange(val) { //  改变每页记录数
        this.pager.limit = val
        this.getData()
      },
      pagerCurrentChange(val) { //  翻页
        this.pager.currentPage = val
        this.getData()
      },
      getData() {
      },
      /**
       * 发送按钮权限认证
       * @private
       */
      _validateButton() {
        if (this.buttonPermissionPrefix !== '') { // 默认为空不校验
          let _permissionData = []
          this.btnList.map(item => {  // 组成按钮验证字符串
            item.permission = this.buttonPermissionPrefix + item.id
            if (item.isPermission) {  // 判断是否参与校验
              _permissionData.push(this.buttonPermissionPrefix + item.id)
            }
          })
          // 发送按钮验证
          if (_permissionData.length > 0) {
            this.$http.get(`${SecurityBtnUrl}${_permissionData.join('_')}`).then(res => {
              res.data.buttons.forEach(item => {
                let tmp = this.btnList.find(e => {
                  if (e.permission === item.permission) {
                    return e
                  }
                })
                tmp.isShow = item.status  // 根据返回的权限确定按钮是否显示
              })
            })
          }
//          console.log(`[Kalix] table tool button list is `, this.btnList)
        }
      },
      setWrapperStyle() {
        if (!this.bizSearch) {
          return {'top': 0}
        }
        return {}
      },
      _getTableHeight() {
        if (this.$refs.kalixTableContainer && this.$refs.kalixTableContainer.clientHeight) {
          this.tableHeight = this.$refs.kalixTableContainer.clientHeight
        }
      }
    },
    components: {
      KalixTableTool: TableTool,
      KalixToolBar: ToolBar,
      KalixDialog: Dialog
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      },
      tableContainerStyle() {
        return {'top': (!this.isShowToolBar ? '56px' : '')}
      },
      pageCount() {
        return Math.floor((this.pager.totalCount + this.pager.limit - 1) / this.pager.limit)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/baseTable"

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
