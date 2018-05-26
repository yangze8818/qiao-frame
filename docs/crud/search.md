!> `studentSearch.vue`中实现了业务的搜索定制功能
## 模板说明
``` html
<template lang="pug">
  kalix-search(title="学生查询" v-bind:searchFields="searchFields")
</template>
```
其中 `v-bind:searchFields="searchFields"` 即为自定义搜索条件的声明。
## 代码说明
> searchFields 定义
``` js
  searchFields: [
    {label: '姓名', prop: 'name'},
    {label: '所属班级', prop: 'classId', type: 'orgTree', dataType: 'number', isAll: true},
    {
      label: '性别',
      prop: 'sex',
      type: 'select',
      options: [
        {value: '男', label: '男'},
        {value: '女', label: '女'}
      ]
    },
    {label: '出生日期', prop: 'birthdayBegin', type: 'date', field: 'birthday:begin:gt'},
    {label: '-', prop: 'birthdayEnd', type: 'date', field: 'birthday:end:lt'},
    {label: '入学年份', prop: 'entranceYearBegin', type: 'year', field: 'entranceYear:begin:gt'},
    {label: '-', prop: 'entranceYearEnd', type: 'year', field: 'entranceYear:end:lt'}
  ]
```
> 字段说明

>`label`:搜索字段说明，【必填】

>`prop`:搜索字段对应 form 的 v-model 绑定名，【必填】，在同一个 form 里必须是唯一的

>`type`:搜索控件类型，可选值（select，orgTree，date，year，datetime）
> > `orgTree`:组织结构树组件，可用属性（`isAll`：是否显示全部，String型）
> > `select`:下拉列表，必填属性（`options`:下拉列表选项，Array Object型，每个 `Object={value: '男', label: '男'}`）

>`dataType`:搜索控件数据类型，可选值（number，text，string）

> > 默认 string，搜索结果前后带有 %（百分号）和"（冒号），

> > 例如：
```js
searchFields = [{label: '姓名', prop: 'name'}]
输入 ‘张三’ 返回
{"%name%":"\u5f20\u4e09"}
```

> > 如果是 text 返回的搜索 json 项不会带有带有 % 百分号

> > 例：
```js
searchFields = [{label: '标题', prop: 'title', dataType:'text'}]
输入 ‘张三’ 返回
{"title":"\u5f20\u4e09"}
```

>`field`:搜索关键词，默认搜索关键词为 `prop`，如果`field`不为空返回的搜索 json 项为`field`的值

> > 例：
``` js
searchFields = [{label: '出生日期', prop: 'birthdayBegin', type: 'date', field: 'birthday:begin:gt'}]
输入 ‘2017-9-27’ 返回
{"birthday:begin:gt":"2017-9-27"}
```
