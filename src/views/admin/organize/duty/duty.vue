<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.duty-row(:gutter="0")
        el-col.duty-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-org-tree(v-on:orgTreeClick="onOrgTreeClick")
        el-col.duty-col(:span="16")
          kalix-table.duty-wrapper(ref="kalixBaseTable"
          bizKey='duty' title='职务列表' v-bind:targetURL='targetURL'
          v-bind:bizDialog='bizDialog' v-bind:btnList='btnList' v-bind:customRender="customRender"
          v-bind:isFixedColumn="isFixedColumn" v-bind:dialogOptions="dialogOptions"
          v-bind:customTableTool="customTableTool")
            template(slot="tableColumnSlot")
              el-table-column(prop="name"  label="职务名称")
              el-table-column(prop="comment" label="职务描述")
              el-table-column(prop="orgNameCol" label="组织机构")
              el-table-column(prop="createBy" label="创建人")
              kalix-data-column(prop="creationDate" label="创建日期")
</template>

<script>
  import {DutyButtonList} from '../../config.toml'

  export default {
    name: 'kalix-admin-duty',
    watch: {},
    methods: {
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'addUser': {
            // 增加用户
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'addUser'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.$refs.kalixBizDialog.open('添加用户', false, row)
            }, 20)
            break
          }
        }
      },
      onOrgTreeClick(data) {
      // console.log('org data is ', data.id)
        this.orgId = data.id
        this.orgName = data.name
        this.targetURL = `/camel/rest/orgs/${data.id}/dutys`
        this.dialogOptions = {
          orgId: this.orgId,
          orgName: this.orgName,
          targetURL: this.targetURL
        }
        console.log('org targetURL data is ', this.targetURL)
        // this.$refs.kalixBaseTable.getData()
      },
      customRender(_data) {
        let that = this
        console.log('org _data data is ', _data)
        _data.forEach(function (e) {
          e.orgNameCol = that.orgName
        })
        console.log('org _data data is ', _data)
      }
    },

    data() {
      return {
        dialogOptions: {},
        isFixedColumn: true,
        btnList: DutyButtonList,
        targetURL: '',
        orgId: -1,
        orgName: '',
        bizDialog: [
          {id: 'view', dialog: 'AdminDutyView'},
          {id: 'edit', dialog: 'AdminDutyAdd'},
          {id: 'add', dialog: 'AdminDutyAdd'},
          {id: 'addUser', dialog: 'AdminDutyAddUser'}
        ],
        tableHeight: 0 //  列表组件高度
        // bizSearch: 'AdminDutySearch'
      }
    },
    mounted() {
    },
    computed: {
      tableContainerStyle() {
        return {}
      }
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

    .el-button
      .iconfont
        font-size 14px

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

  .duty-row
    height 100%
    .duty-col
      height 100%
      box-sizing border-box

  .duty-wrapper
    margin 8px 0
    .kalix-wrapper
      bottom 0 !important
</style>
