<!--
描述：table 组件的二次封装,带table和page
开发人：sunlf
开发日期：2017年9月18日
-->
<template lang="pug">
  div.kalix-paged-table
    el-table(v-bind:data="tableData" style="width:100%"
    v-bind:height="tableHeight" fit
    v-on:row-click="rowClick"
    v-on:row-dblclick="rowDblClick"
    v-bind:stripe="stripe"  v-loading.body="loading"
    header-cell-class-name="base-table-th"
    cell-class-name="base-table-cell"
    v-bind:highlight-current-row="highlightCurrentRow")
      el-table-column(label="行号" width="70")
        template(slot-scope="scope")
          div(style="text-align: center") {{ scope.row.rowNumber }}
      slot(name="tableColumnSlot")
      el-table-column(label="操作" width="100")
        template(slot-scope="scope")
          slot(name="tableToolSlot" slot-scope="scope")
            kalix-table-tool(v-bind:displayStyle="2" v-bind:btnList="btnList" v-on:onTableToolBarClick="btnClick" v-bind:scope="scope")
    div.page-wrapper.s-flex(v-if="pager.totalCount")
      div.s-flex_item
      div.base-table-pager
        el-pagination.kalix-table-pagination(v-if="pager.totalCount"
        v-on:size-change="pagerSizeChange"
        v-on:current-change="pagerCurrentChange"
        v-bind:current-page="pager.currentPage"
        v-bind:page-sizes="pager.pageSizes"
        v-bind:page-size="1"
        layout="total, sizes, prev, next, slot, jumper,->"
        v-bind:total="pager.totalCount"
        prev-text="上一页"
        next-text="下一页")
      div.btn-wrapper(v-if="tableData.length")
        el-button(type="primary" size="small" v-on:click="onRefreshClick")
          i.iconfont.icon-refresh
          | 刷新
</template>
<script type="text/ecmascript-6">
  import Message from 'common/message'
  import KalixTableTool from './baseTableTool'
  import {PageConfig} from 'config/global.toml'

  const MAX_TABLE_HEIGHT = 350
  export default {
    props: {
      targetURL: '',
      jsonStr: '',
      sort: {
        type: String,
        default: null
      },
      tableHeight: {
        default: MAX_TABLE_HEIGHT
      },
      stripe: {
        default: true
      },
      highlightCurrentRow: {
        default: false
      },
      customTableTool: { // 对table的操作按钮进行自定义的操作
        type: Function
      },
      btnList: {   //  table中按钮数组
        type: Array,
        required: false,
        default: () => {
          return []
        }
      }
    },
    created() {
      console.log('[pagedTable] created', new Date())
      this.getData()
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      }
    },
    watch: {
      targetURL() {
//        this.tableData = {}
        console.log('%c[pagedTable] targetURL', 'color:#c7320a', this.targetURL)
        this.getData()
      },
      jsonStr() {
        console.log('%c[pagedTable] jsonStr', 'color:#ff0000', this.jsonStr)
//        this.tableData = {}
        this.getData()
      }
    },
    methods: {
      rowClick(row, event, column) {
        this.$emit('rowClick', row, event, column)
      },
      rowDblClick(row, event) {
        this.$emit('rowDblClick', row, event)
      },
      getData() { // 获得data
        if (this.targetURL !== '') {
          this.loading = true
          this.axios.request({
            method: 'GET',
            url: this.targetURL,
            params: {
              jsonStr: this.jsonStr,
              page: this.pager.currentPage,
              limit: this.pager.limit,
              start: this.pager.start,
              sort: this.sort
            }
          }).then((res) => {
            setTimeout(() => {
              this.loading = false
              console.log('%c[pagedTable] res', 'color:#ff5500', res)
              console.log('%c[pagedTable] res', 'color:#ff0055', this.targetURL)
              this.tableData = res.data.data.map((item, index) => {
                item.rowNumber = index + this.rowNo
                return item
              })
              this.pager.totalCount = res.data.totalCount
            }, 500)
//          Message.processResult(res)
          })
        }
      },
      pagerSizeChange(val) { //  改变每页记录数
        this.pager.limit = val
        this._getFilesList()
      },
      pagerCurrentChange(val) { //  翻页
        this.pager.currentPage = val
        this._getFilesList()
      },
      clearData() {
        this.tableData = []
        this.loading = false
        this.pager.totalCount = 0
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
              if (typeof (this.$refs.kalixDialog.init) === 'function') {
                // 添加初始化模型赋值参数
                // this.dialogOptions.row = row
                // this.$refs.kalixDialog.init(this.dialogOptions, row)
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
//                if (this.dialogOptions.row) {
//                  this.dialogOptions.row = row
//                }
//                this.$refs.kalixDialog.init(this.dialogOptions)
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

          case 'attachment': {
            console.log(' attachment is clicked ', 'background:#c7320a;')
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
      onRefreshClick() { // 刷新按钮点击事件
        this.getData()
      },
      _getFilesList() {
        this.getData()
      }
    },
    data() {
      return {
        loading: false,
        tableData: [],
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        }
      }
    },
    components: {
      KalixTableTool
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  .page-wrapper
    margin-top 10px
    .btn-wrapper
      margin-left 20px
    .el-button
      .iconfont
        font-size 14px

  .el-pager
    li
      &.active
        color #ffffff
</style>
