# 定制table行数据
!> 开发过程中，会对table中的一行数据进行自定义的显示，下面以`views/oa/processhistory/processhistory.vue`为例进行说明。
## 模板说明
```js
<template lang="pug">
  keep-alive
    base-table(:isShowToolBar="isShowToolBar" bizKey="myprocesshistory" title='我的流程列表'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:bizDialog="bizDialog"
    bizSearch="OaProcessHistorySearch"
    v-bind:tableRowClassName="tableRowClassName"
    v-bind:btnList="btnList")
</template>
```
其中 `v-bind:tableRowClassName="tableRowClassName""` 即为自定义一行数据的声明。
## 代码说明
> tableRowClassName 方法定义
```js
methods: {
      tableRowClassName(row, index) {
        if (row.status === '结束') {
          return 'finish-row'
        } 
        return ''
      }
    },
```
> 样式定义
```stylus
  .el-table
    .finish-row
      td
        background-color #c9e5f5 !important
```
# 定制table列数据
!> 开发过程中，会对table中的一列数据进行自定义的显示，下面以`views/oa/processhistory/processhistory.vue`为例进行说明。
## 模板说明
```js
<template lang="pug">
  keep-alive
    base-table(:isShowToolBar="isShowToolBar" bizKey="myprocesshistory" title='我的流程列表'
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:bizDialog="bizDialog"
    bizSearch="OaProcessHistorySearch"
    v-bind:tableRowClassName="tableRowClassName"
    v-bind:btnList="btnList")
      template(slot="tableColumnSlot")
        el-table-column(prop="name" label="编号" width="280")
          template(scope="scope")
            el-popover(trigger="hover" placement="top")
              p 业务名称: {{ scope.row.title }}
              p 启动用户: {{ scope.row.startUserId }}
              p 状态:
                span(style="color:#f00" v-if="scope.row.status === '结束'") {{ scope.row.status }}
                span(v-else) {{ scope.row.status }}
              div(slot="reference" class="name-wrapper")
                el-tag {{ scope.row.name }}
        el-table-column(prop="title" label="业务名称" width="280")
        el-table-column(prop="startUserId" label="启动用户")
        el-table-column(prop="startTime" label="开始时间")
        el-table-column(prop="endTime" label="结束时间")
        el-table-column(prop="durationInMillis" label="持续时长")
        el-table-column(prop="status" label="状态")
          template(scope="scope")
            span(style="color:#f00" v-if="scope.row.status === '结束'") {{ scope.row.status }}
            span(v-else) {{ scope.row.status }}
</template>
```
## 代码说明
1. 去掉props的tableFields声明
2. 使用baseTable中的`template(slot="tableColumnSlot")`
