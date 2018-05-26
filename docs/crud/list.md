## 模板说明
```vue
<template lang="pug">
  keep-alive
    base-table(bizKey="category" title='流程分类列表' v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel="formModel"
    v-bind:bizDialog="bizDialog"
    v-bind:bizSearch="'OaCategorySearch'" v-bind:btnList="btnList")
</template>
```
### bizKey
业务主键，用于生成自定义事件的名称。
### title
分类列表的名称，通常为业务名称加列表。如：`流程分类列表`
### tableFields
table中显示的业务字段定义。
```js
tableFields: [
          {prop: 'name', label: '分类名称'},
          {prop: 'key', label: '分类主键'},
          {prop: 'icon', label: '分类图标'},
          {prop: 'description', label: '分类描述'}
        ]
```
### targetURL
服务器的rest服务地址，一般为`/camel/rest/categorys`，在模板的config.toml文件中统一配置。

!> 系统中新增、修改、删除统一使用这一个地址。
### formModel
`categoryAdd.vue`中的业务模型定义。
```js
formModel: {
          name: '',
          key: '',
          icon: '',
          description: ''
        }
```

### btnList
table中每行数据的操作区的按钮定义,`OaCategoryComponent`在`config.toml`中定义，如下：定义了查看、编辑以及删除三个按钮。
```xml
# table 的默认按钮定义
[[ToolButtonList]]
  id = "view"
  title = "查看"
  isShow = true    # 是否显示
  isPermission = true   # 是否进行权限认证
[[ToolButtonList]]
  id = "edit"
  title = "编辑"
  isShow = true
  isPermission = true
[[ToolButtonList]]
  id = "delete"
  title = "删除"
  isShow = true
  isPermission = true
```

### bizDialog
table中每行数据的操作区的按钮点击弹出dialog的定义
```js
bizDialog: [
          {id: 'view', dialog: 'OaCategoryView'},
          {id: 'edit', dialog: 'OaCategoryAdd'},
          {id: 'add', dialog: 'OaCategoryAdd'}
        ]
```

!> 定义中的id需要与btnList中定义的id一致

### bizSearch
列表上方搜索区的查询条件定义组件，该值为系统中注册的组件名称。
## 代码说明
### 全局vue组件注册
```js
// 注册全局组件
  OaCategoryComponent.forEach((item) => {
    console.log('[kalix]-[oa] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })
```
该组件的注册的配置是在`config.toml`中定义的
```toml
# 需要自动注册成全局的Category组件
[[OaCategoryComponent]]
  path = "./categoryView.vue"
  name = "OaCategoryView"
[[OaCategoryComponent]]
  path = "./categoryAdd"
  name = "OaCategoryAdd"
[[OaCategoryComponent]]
  path = "./categorySearch"
  name = "OaCategorySearch"
```
