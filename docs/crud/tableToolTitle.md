!> 开发过程中，会对table中的操作按钮名称进行自定义的显示，下面以`views/oa/processdefinition/processdefinition.vue`为例进行说明。
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
template并没有什么特殊的地方。
## 代码说明
>btnList为“查看”和“无效”2个按钮,titleCompute为一个函数,通过该函数实现了按钮名称的按条件显示。

```js
btnList: [{
          id: 'view',
          title: '查看',
          isShow: true
        }, {
          id: 'suspend',
          title: '',
          isShow: true,
          titleCompute: (scope) => {
            return scope.row.suspensionState === 1 ? '停止' : '运行'
          }
        }]
```

## 子组件代码说明
```js
    el-table-column(label="操作" v-bind:width="columnWidth")
      template(scope="scope")
        div(v-for="btn in btnList" v-bind:key="btn.id"  )
          div(v-if="btn.titleCompute")
            el-button( v-if="btn.isShow" v-on:click="toggle(scope.row,btn.id)"
            type="text" size="small") {{btn.titleCompute(scope)}}
          div(v-else)
            el-button( v-if="btn.isShow" v-on:click="toggle(scope.row,btn.id)"
            type="text" size="small") {{btn.title}}
```

直接调用{{btn.titleCompute(scope)}}即可。


