<!--
  描述：附件对话框
  开发人：桑杨
  开发日期：2017年8月17日
-->
<template lang="pug">
  el-dialog(v-bind:visible="visible" v-bind:before-close="close"
  v-bind:close-on-click-modal="false"
  v-bind:append-to-body="true")
    span(slot="title")
      i.iconfont.icon-attachment-column
      | 附件管理
    div.file-list
      paged-table(ref="pagedTable"
      v-bind:targetURL="targetURL"
      v-bind:jsonStr="jsonStr"
      v-bind:btnList='btnList'
      v-bind:customTableTool="customTableTool")
        template(slot="tableColumnSlot")
          el-table-column(prop="attachmentName" label="名称")
            template(slot-scope="scope")
              div.attachment-name {{scope.row.attachmentName}}
          el-table-column(label="大小" width="100")
            template(slot-scope="scope")
              span {{setFileSize(scope.row.attachmentSize)}}
          el-table-column(prop="attachmentType" label="类型" width="116")
          kalix-date-column(prop="creationDate" label="上传日期")
          el-table-column(width="1")
    div.dialog-footer(slot="footer")
      el-button.upload
        i.iconfont.icon-upload
        | 上 传
        input(ref="iptFile" type="file" v-on:change="selectedFile" v-bind:accept="fileAccept" )
      el-button(type="primary" v-on:click="onCancelClick") 关 闭
</template>
<script type="text/ecmascript-6">
  import Message from 'common/message'
  import EventBus from 'common/eventbus'
  import {AttachmentURL} from 'config/global.toml'
  import PagedTable from './pagedTable'
  import DateColumn from 'views/oa/comp/dateColumn'
  import prettyBytes from 'common/pretty-bytes'

  const MAX_TABLE_HEIGHT = 450
  export default {
    data() {
      return {
        btnList: [
          {
            id: 'delete',
            title: '删除',
            isShow: true,
            isPermission: true
          },
          {
            id: 'download',
            title: '下载',
            isShow: true,
            isPermission: false
          }
        ],
        targetURL: AttachmentURL,
        jsonStr: '',
        bizKey: '',
        title: '',
        visible: false,
        files: [],
        tableHeight: MAX_TABLE_HEIGHT,
        fileAccept: '*' // 上传文件类型
      }
    },
    methods: {
      setFileSize(size) {
        return prettyBytes(size)
      },
      onSubmitClick() {
        console.log('dialog cancel button clicked !')
        if (this.files.length > 0) {
          this._fileUpload(0)
        }
        this.close()
      },
      onCancelClick() {
        this.close()
      },
      close() {
        this.visible = false
        this._afterDialogClose()
      },
      openDialog(_row, _bizKey, _fileAccept) {
        console.log('scheduledictAttachment', 'openDialog')
        this.visible = true
        this.row = _row
        this.bizKey = _bizKey
        this.jsonStr = `{mainId:${_row.id}}`
        this.fileAccept = _fileAccept
      },
      refreshData() {
        this.$refs.pagedTable.getData()
      },
      selectedFile(e) {
        let that = this
        let file = event.target.files[0]
        let formData = new FormData()
        formData.append('file', file)
        this.$http.post('/camel/rest/upload', formData).then(res => {
          if (res.data.success) {
            this._fileUpload({
              mainId: that.row.id,
              attachmentId: res.data.attachmentId,
              attachmentName: res.data.attachmentName,
              attachmentPath: res.data.attachmentPath,
              attachmentRev: res.data.attachmentRev,
              attachmentSize: res.data.attachmentSize,
              attachmentType: res.data.attachmentType
            }, () => {
              this.refreshData()
            })
          }
          // this.$refs.iptFile.value = ''
        })
      },
      customTableTool(row, btnId, tb) {
        switch (btnId) {
          case 'download':
            console.log('row', row.attachmentPath)
            window.open(row.attachmentPath)
            break
        }
      },
      deleteSelectFile(_index, row) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.axios.request({
            method: 'DELETE',
            url: AttachmentURL + '/' + row.id,
            params: {},
            data: {
              id: row.id
            }
          })
        }).then(res => {
          if (res.data.success) {
            this.files = this.files.filter((e, i) => {
              return i !== _index
            })
            Message.success(res.data.msg)
            this.refreshData()
          } else {
            Message.error(res.data.msg)
          }
        }).catch(() => {
        })
      },
      _fileUpload(item, callBack) {
        this.$http.post(AttachmentURL, item).then(res => {
          if (res.data.success) {
            Message.success(res.data.msg)
            if (typeof callBack === 'function') {
              callBack()
            }
          }
        })
      },
      // 查询文件
      _afterDialogClose() {
        EventBus.$emit(this.bizKey + '-' + 'KalixDialogClose')
      }
    },
    computed: {},
    components: {
      PagedTable,
      KalixDateColumn: DateColumn
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .upload
    display inline-block
    position relative
    overflow hidden
    float left
    input
      position absolute
      top 0
      right -1px
      font-size 100px
      cursor pointer
      opacity 0

  .file-list
    .el-button
      vertical-align top
      text-decoration none
    .attachment-name
      white-space nowrap
      overflow hidden
      text-overflow ellipsis

  .kalix-table-pagination
    margin-top 20px
</style>
