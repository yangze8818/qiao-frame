!> 开发过程中，经常会对table中的操作按钮进行自定义的显示，下面以`views/oa/processdefinition/processdefinition.vue`为例进行说明。
## 模板说明
```js
<template lang="pug">
  keep-alive
    base-table(:isShowToolBar="isShowToolBar" bizKey="processDefinition" title='流程定义列表'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:bizDialog="bizDialog"
    v-bind:customRender="customRender"
    bizSearch="ProcessDefinitionSearch"
    v-bind:btnList="btnList" v-bind:customTableTool="customTableTool")
</template>
```
其中 `v-bind:btnList="btnList" v-bind:customTableTool="customTableTool"` 即为自定义操作列的声明。
## 代码说明
>btnList为“查看”和“无效”2个按钮

```js
bizDialog: [
          {id: 'view', dialog: 'OaProcessDefinitionView'},
          {id: 'suspend', dialog: 'OaProcessDefinitionView'}
        ]
```

> 执行代码为

```js
customTableTool(row, btnId) {
        switch (btnId) {
          case 'suspend': {
            this.$confirm('确定要执行该操作吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              return this.axios.request({
                method: 'GET',
                url: row.suspensionState === 1 ? WorkflowSuspendURL + row.key : WorkflowActivateURL + row.key,
                params: {},
                data: {
                  id: row.id
                }
              })
            }).then(response => {
              EventBus.$emit(ON_REFRESH_DATA)
              Message.success(response.data.msg)
            }).catch(() => {
            })
            break
          }
        }
      }
```
