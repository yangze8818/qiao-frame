<!--
描述：table 组件的二次封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.kalix-article
    keep-alive
      component(:is="bizSearch" ref="bizSearchRef" v-if="bizSearch"
      v-bind:class="searchCls"
      v-on:onSearchBtnClick="onSearchClick")
    div.kalix-wrapper(v-bind:style="wrapperTop")
      div.kalix-wrapper-hd
        i(v-bind:class="iconCls")
        | {{title}}
      div.kalix-wrapper-bd
        kalix-tool-bar(v-if="isShowToolBarB"
        v-bind:toolbarBtnList="toolbarBtnList" v-bind:bizKey="bizKey"
        v-on:onToolBarClick="onToolBarClick"
        v-on:onCheckBtnList="onCheckBtnList")
        div.kalix-table-container(ref="kalixTableContainer" v-bind:style="tableContainerStyle")
          el-table(:data="tableData"  style="width:100%" ref="kalixTable"
          v-bind:row-class-name="tableRowClassName"
          v-loading.body="loading" fit
          v-bind:height="tableHeight"
          highlight-current-row
          v-on:selection-change="onTableSelectionChange"
          v-on:current-change="handleCurrentChange"
          v-on:row-click="onTableRowClick"
          header-cell-class-name="base-table-th"
          cell-class-name="base-table-cell")
            //table的字段
            template(v-if="tableData && tableData.length > 0")
              el-table-column(v-if="hasTableSelection" type="selection" width="55" align="center")
              el-table-column(label="行号" width="70" align="center"
              v-bind:fixed="isFixedColumn")
                template(slot-scope="scope")
                  div(style="text-align: center") {{ scope.row.rowNumber }}
              slot(name="tableColumnSlot")
                el-table-column(v-for="field in tableFields" align="center"
                v-bind:key="field.prop" v-bind:prop="field.prop" v-bind:label="field.label" v-bind:width="field.width")
                  template(slot-scope="scope")
                    div(v-bind:class="field.prop" v-bind:data-val="scope.row[field.prop]") {{scope.row[field.prop]}}
              //  table的工具按钮
              el-table-column(v-if="isShowOperate" label="操作" align="center"
              v-bind:fixed="isFiex"
              v-bind:width="columnWidth(true)"
              class-name="base-teble-operation")
                template(slot-scope="scope")
                  slot(name="tableToolSlot" slot-scope="scope")
                    kalix-table-tool(v-bind:displayStyle="2" v-bind:btnList="btnList" v-on:onTableToolBarClick="btnClick" v-bind:scope="scope")
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
            layout="total, sizes, prev, next, slot, jumper,->"
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
      dialogOptions: {
        type: Object,
        default: () => {
          return {}
        }
      },
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
      otherStr: { // 非search from下参数
        type: String,
        default: ''
      },
      appendCondition: { // search组件之外的查询条件
        type: Array
      },
      sort: {
        type: String,
        default: null
      },
      tableFields: {   //  数据列表的列名
        type: Array
      },
      btnList: {   //  table中按钮数组
        type: Array,
        required: false,
        default: () => {
          return []
        }
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
      },
      isShowToolBar: {  // 是否显示工具栏
        type: Boolean,
        default: null
      },
      noSearchParam: {
        type: Boolean,
        default: false
      },
      isAfterSearch: {
        type: Boolean,
        default: false
      },
      isAfterView: {
        type: Boolean,
        default: false
      },
      isBeforeView: {
        type: Boolean,
        default: false
      },
      // 附件管理 文件类型
      fileAccept: {
        type: String,
        default: '*'
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
        searchParam: {}, //  列表查询条件
        isShowToolBarB: true,
        currentRow: null,
        wrapperTop: {}
      }
    },
    created() {
      console.log('toolbarBtnList', this.toolbarBtnList)
      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
      this.getData()
    },
    activated() {
      console.log(this.bizKey + '  is activated')
      EventBus.$on(ON_SEARCH_BUTTON_CLICK, this.onSearchClick)
      EventBus.$on(ON_REFRESH_DATA, this.refresh)
      // d
      EventBus.$on(this.bizKey + '-' + 'KalixDialogClose', (closeParam) => {
        console.log(' ------- KalixDialogClose ------- ')
//        console.log(`%c[kalix] reset ${this.bizKey} whichBizDialog`, 'background: #222;color: #bada55')
        this.whichBizDialog = ''
        this.$emit('afterDialogClose', this.bizKey, closeParam)
      })
    },
    deactivated() {
      console.log(this.bizKey + '  is deactivated')
      EventBus.$off(ON_SEARCH_BUTTON_CLICK)
      EventBus.$off(ON_REFRESH_DATA)
      // 11
      EventBus.$off(this.bizKey + '-' + 'KalixDialogClose')
    },
    mounted() {
      // 注册事件接受
      const that = this
      window.addEventListener('resize', () => {
        that._getTableHeight()
      })
//       EventBus.$on(this.bizKey + '-' + 'KalixDialogClose', () => {
//         console.log(' ------- KalixDialogClose ------- ')
// //        console.log(`%c[kalix] reset ${this.bizKey} whichBizDialog`, 'background: #222;color: #bada55')
//         this.whichBizDialog = ''
//         this.$emit('afterDialogClose', this.bizKey)
//       })
      //  绑定表格 icon 图标
      const currentTreeListItem = JSON.parse(Cache.get('currentTreeListItem'))
      if (currentTreeListItem) {
        this.iconCls = currentTreeListItem.iconCls
      }
      this.setWrapperStyle()
    },
    methods: {
      setWrapperStyle() {
        if (!this.bizSearch) {
          this.wrapperTop = {'top': 0}
        } else {
          this.$nextTick(() => {
            let kalixSearch = document.querySelector('.kalix-search-' + this.bizKey)
            console.log('===== kalixSearch =====', kalixSearch.clientHeight + 40 + 'px')
            this.wrapperTop = {'top': kalixSearch.clientHeight + 40 + 'px'}
          })
        }
      },
      onCheckBtnList(flag) {
        this.isShowToolBarB = this.isShowToolBar !== null ? this.isShowToolBar : flag
      },
      onToolBarClick(btnId) {
        // baseToolBar 回调事件
        switch (btnId) {
          case 'add':
            this.onAddClick()
            break
          case 'refresh':
            this.onRefreshClick()
            break
          case 'deleteChecked': // 选中行的删除
            this.onDeleteChecked()
            break
          default:
            this.customToolBar(btnId, this)
            break
        }
      },
      onTableSelectionChange(val) {
        this.deleteList = val
      },
      setCurrent(row) {
        this.$refs.kalixTable.highlightCurrentRow = true
        this.$refs.kalixTable.setCurrentRow(row)
      },
      handleCurrentChange(val) {
        this.currentRow = val
      },
      onTableRowClick(row, event, column) {
        this.$emit('onTableRowClick', row, event, column)
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
        // 设置searchparam
        this.noSearchParam = false
        // 兼容多个baseTable同时使用情况，用bizKey区分具体查询
        if (_searchParam.bizKey) {
          this.searchParam = _searchParam.searchObj
          if (_searchParam.bizKey === this.bizKey) {
            this.refresh()
          }
        } else {
          this.searchParam = _searchParam
          this.refresh()
        }
        // 添加点击查询按钮之后的外部事件处理
        // this.$emit('afterSearch', this.bizKey)
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
//            that.$refs.kalixDialog.init(this.dialogOptions) // 需要传参数，就在dialog里面定义init方法
            // 添加初始化模型赋值参数 需要传参数，就在dialog里面定义init方法
            this.$refs.kalixDialog.init(this.dialogOptions, null)
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
          return false
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
              if (this.isBeforeView) {
                this.$emit('handleBeforeView', row)
                if (typeof (this.$refs.kalixDialog.initPropertis) === 'object') {
                  this.$refs.kalixDialog.initPropertis = row
                }
              }
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('查看', false, row)
              if (typeof (this.$refs.kalixDialog.init) === 'function') {
                // 添加初始化模型赋值参数
                // this.dialogOptions.row = row
                this.$refs.kalixDialog.init(this.dialogOptions, row)
              }
              if (this.isAfterView === true) {
                this.$emit('handleAfterView', row)
              }
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
                // 添加初始化模型赋值参数
                // this.dialogOptions.editFormModel = row
                // this.dialogOptions.row = row
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
              // 添加删除后自定义处理事件
              // this.$emit('afterDelete')
            }).catch(() => {
            })
            break
          }
          // 附件管理
          case 'attachment': {
            console.log(' attachment is clicked ', 'background:#c7320a;')
            let that = this
            this.whichBizDialog = 'AttachmentDialog'
            setTimeout(() => {
              that.$refs.kalixDialog.openDialog(row, this.bizKey, this.fileAccept)
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
        if (!this.targetURL) {
          return
        }
        let that = this
        console.log('baseTable-----------', this.targetURL)
        this.loading = true
        setTimeout(_ => {
          let _data = {
            jsonStr: this.jsonStr,
            page: this.pager.currentPage,
            start: this.pager.start,
            limit: this.pager.limit,
            sort: this.sort,
            otherStr: this.otherStr
          }
          console.log('this.jsonStr=======1', _data.jsonStr)
          if (this.noSearchParam === false) {
            _data = Object.assign(_data, this.searchParam)
            // 添加search组件之外的查询条件，解决jsonStr key覆盖问题
            if (this.appendCondition && _data.jsonStr.length > 0) {
              _data.jsonStr = _data.jsonStr.substring(0, _data.jsonStr.length - 1) + ',' + this.appendCondition + '}'
            }
          }
          console.log('this.jsonStr=======2', _data.jsonStr)
          this.$http.get(this.targetURL, {
            params: _data
          }).then(response => {
            this.tableData = response.data.data.map((item, index) => {
              item.rowNumber = index + that.rowNo
              return item
            })
            // 添加表格查询后的处理事件
            if (this.isAfterSearch === true) {
              this.$emit('handleAfterSearch', this.bizKey, this.tableData)
            }

            if (this.dictDefine) { // 设置数据字典
              this.setDictDefine(this.tableData)
            }

            if (this.customRender) { // 对table的数据进行自定义的修饰
              this.customRender(this.tableData)
            }

            this.pager.totalCount = response.data.totalCount
            this.loading = false
            document.querySelector('.el-table__body-wrapper').scrollTop = 0
            if (!this.isFixedColumn) {
              document.querySelector('.el-table__body-wrapper').style.overflowX = 'hidden'
            }
            this._getTableHeight()
          }).catch(() => {
            this.loading = false
            console.log('this.loading = false', this.tableData.length)
          })
        }, 500)
        this._validateButton()
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
      _getTableHeight() {
        if (this.$refs.kalixTableContainer && this.$refs.kalixTableContainer.clientHeight) {
          this.tableHeight = this.$refs.kalixTableContainer.clientHeight
        }
      },
      clearData() {
        this.tableData = []
      },
      setTableData(_tableData) {
        this.tableData = _tableData
      },
      columnWidth(flag) {
        let width = 90
        if (!flag) {
          let len = this.btnList.length
          let btnWidth = 34
          if (len > 1) {
            width += btnWidth * (len - 1)
          }
        }
        return width
      }
    },
    components: {
      KalixTableTool: TableTool,
      KalixToolBar: ToolBar,
      KalixDialog: Dialog
    },
    computed: {
      searchCls() {
        console.log('BBBBBBBBBBBBBBBBBBBBBBBB', this.bizKey)
        return 'kalix-search-' + this.bizKey
      },
      isShowOperate() {
        if (!this.btnList || !this.btnList.length) {
          return false
        }
        let items = this.btnList.filter(e => {
          return e.isShow
        })
        return items.length
      },
      isFiex() {
        return this.isFixedColumn ? 'right' : this.isFixedColumn
      },
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      },
      tableContainerStyle() {
        return {'top': (this.isShowToolBarB ? '102px' : '56px')}
      },
      pageCount() {
        return Math.floor((this.pager.totalCount + this.pager.limit - 1) / this.pager.limit)
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/baseTable"
</style>
