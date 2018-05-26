!> 开发过程中，经常会对table中的数据进行自定义的显示，下面以`views/common/receiver/receiver.vue`为例进行说明。
## 模板说明
### 表结构
```js
<template lang="pug">
  keep-alive
    base-table(bizKey="receiver" title='收件列表'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine"
    v-bind:customRender="customRender"
    bizSearch="CommonReceiverSearch")
</template>
```
### 树表结构
```js
<template lang="pug">
    kalix-tree-grid(title="功能管理"
    v-bind:columns='columns'
    v-bind:targetURL="treeUrl"
    v-bind:customRender="customRender")
</template>
```
其中 `v-bind:customRender="customRender"` 即为自定义数据列的声明。

## 代码说明
### 表结构实现
```js
  export default {
    methods: {
          customRender(_data) {
            _data.forEach(function (e) {
              e.isRead = e.read ? '是' : '否'
            })
          }
        }
```
### 树表结构实现
```js
  export default {
    methods: {
      customRender(_data) {
        if (_data) {
          _data.forEach((e) => {
            e.isRead = e.read ? '是' : '否'
            if (e.children) {
              this.customRender(e.children)
            }
          })
        }
      }
    }
```
receiver业务数据中，有一个字段是read，类型为boolean型，用于显示该信息是否阅读过。通过循环新增isRead字段，就把read的内容翻译成了是否。
