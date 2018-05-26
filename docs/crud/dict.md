!> 数据字典主要用于在table中，对column中的数据进行显示的替换。以`views/common/sender/sender.vue`为例
## 模板说明
```js
<template lang="pug">
  keep-alive
    base-table(bizKey="sender" title='发件列表'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine"
    bizSearch="CommonSenderSearch" v-bind:dictDefine="dictDefine")
</template>
```
其中 `v-bind:dictDefine="dictDefine"` 即为数据字典的定义引用。

## 代码说明
```js
  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'COMMON-DICT-KEY',
          type: '消息类别',
          targetField: 'categoryName',
          sourceField: 'category'
        }],
```
### cacheKey
数据字典中cache的key，一般为app名称大写加上-DICT-KEY。

!> 系统在每个系统模块加载后，就会加载数据字典的数据，并缓存在浏览器中。
### type
数据字典的类型，一般为中文名称。
### targetField
table中经过数据字典处理后的结果数据。
### sourceField
table中未经过数据字典处理的原始数据。
