<!--
描述：popover button组件
开发人：yangz
开发日期：2018年02月02日
pug 编译v-popover:popover 失效，因此使用html
-->
<template>
  <div>
    <el-popover ref="popover"
                v-bind:placement="placement"
                v-bind:width="width"
                v-bind:trigger="trigger"
                v-model="visible">
      <el-table :data="tableData" style="width:100%" v-on:row-click="onTableRowClick">
        <template v-if="tableData && tableData.length > 0">
          <el-table-column label="行号" width="70" align="center" v-bind:fixed="isFixedColumn">
            <template slot-scope="scope">
              <div style="text-align: center">{{ scope.row.rowNumber }}</div>
            </template>
          </el-table-column>
          <slot name="tableColumnSlot">
            <el-table-column v-for="field in tableFields" align="center" v-bind:key="field.prop" v-bind:prop="field.prop" v-bind:label="field.label" v-bind:width="field.width">
              <template slot-scope="scope">
                <div v-bind:class="field.prop" v-bind:data-val="scope.row[field.prop]">
                  {{scope.row[field.prop]}}
                </div>
              </template>
            </el-table-column>
          </slot>
        </template>
      </el-table>
      <div class="no-list" v-if="!tableData || !tableData.length > 0">
        <div>暂无数据</div>
      </div>
    </el-popover>
    <el-button size="mini" v-on:click="getData()" v-popover:popover>{{buttonName}}</el-button>
  </div>
</template>

<script type="text/ecmascript-6">
  // import EventBus from 'common/eventbus'
  import {PageConfig} from 'config/global.toml'
  import {ON_POPOVER_CLICK} from './event.toml'
  export default {
    props: {
      buttonName: {
        type: String,
        required: true
      },
      placement: {
        type: String,
        default: 'top-start'
      },
      width: {
        type: [Number, String],
        default: '150px'
      },
      trigger: {
        type: String,
        default: 'click'
      },
      tableFields: {   //  数据列表的列名
        type: Array
      },
      targetUrl: {  //  列表操作请求的 URL 地址
        type: String
      },
      isFixedColumn: {
        type: Boolean,
        default: false
      },
      bizKey: {  // 主鍵
        type: String,
        required: true
      },
      jsonStr: {  //  数据列表请求的查询条件
        type: String,
        default: ''
      }
    },
    data() {
      return {
        tableData: [],
        totalCount: 0,
        visible: false,
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: 100, // PageConfig.limit,
          start: 0
        }
      }
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
      }
    },
    methods: {
      getData() {
        if (!this.targetUrl) {
          return
        }
        let that = this
        setTimeout(_ => {
          let _data = {
            jsonStr: this.jsonStr,
            page: this.pager.currentPage,
            start: this.pager.start,
            limit: this.pager.limit
          }
          this.$http.get(this.targetUrl, {
            params: _data
          }).then(response => {
            this.tableData = response.data.data.map((item, index) => {
              item.rowNumber = index + that.rowNo
              return item
            })
            this.pager.totalCount = response.data.totalCount
            this.loading = false
            document.querySelector('.el-table__body-wrapper').scrollTop = 0
            if (!this.isFixedColumn) {
              document.querySelector('.el-table__body-wrapper').style.overflowX = 'hidden'
            }
            // this._getTableHeight()
          }).catch(() => {
            this.loading = false
            console.log('this.loading = false', this.tableData.length)
          }, 20)
        })
      },
      pagerSizeChange(val) { //  改变每页记录数
        this.pager.limit = val
        this.getData()
      },
      pagerCurrentChange(val) { //  翻页
        this.pager.currentPage = val
        this.getData()
      },
      onTableRowClick(row, event, column) {
        // EventBus.$emit(ON_POPOVER_CLICK, row)
        this.$emit(ON_POPOVER_CLICK, row)
        this.visible = false
      },
      closePopover() {
        this.visible = false
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
