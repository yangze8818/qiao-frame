!> 开发过程中，会对tableToolBar中的操作按钮名称进行自定义的显示，下面以`views/common/sender/sender.vue`为例进行说明。
## 模板说明
```js
<template lang="pug">
  keep-alive
    base-table(bizKey="sender" title='发件列表'
    ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine"
    v-bind:hasTableSelection="hasTableSelection"
    v-bind:isShowToolBar="isShowToolBar"
    v-bind:toolbarBtnList="toolbarBtnList"
    v-bind:deleteAllUrl="deleteAllUrl"
    v-bind:customToolbarClickEvents="customToolbarClickEvents"
    bizSearch="CommonSenderSearch")
</template>
```
其中 `v-bind:toolbarBtnList="toolbarBtnList" v-bind:customToolbarClickEvents="customToolbarClickEvents"` 即为自定义ToolBar操作按钮的声明。
## 代码说明
> toolBarbtnList 自定义按钮
```js
  toolbarBtnList: [
    {id: 'deleteChecked', isShow: true},
    {id: 'customBtn1', icon: 'icon-edit', title: '自定义按钮 1', isShow: true},
    {id: 'customBtn2', icon: 'icon-edit', title: '自定义按钮 2', isShow: true},
    {id: 'customBtn3', icon: 'icon-edit', title: '自定义按钮 3', isShow: true},
    {id: 'customBtn4', icon: 'icon-edit', title: '自定义按钮 4', isShow: true},
    {id: 'add', isShow: false}
  ],
```
> customToolbarClickEvents 为点击按钮执行事件对象，组件在 created 时绑定对应的事件对象，
```js
  created() {
    const that = this
    this.customToolbarClickEvents = {
      customBtn1() {
        that.customEventBtn1()
      },
      customBtn2() {
        that.customEventBtn2()
      },
      customBtn3() {
        that.customEventBtn3()
      },
      customBtn4() {
        that.customEventBtn4()
      }
    }
  }
```
> `const that = this` 解决 this 在对象内会指向对象本身而不是当前的组件。
> `this.customToolbarClickEvents` 属性名称必须和自定义按钮的 `id` 对应，否则会提示找不到事件
> 也可以这样写 `this.customToolbarClickEvents = this` 将当前的组件直接赋给 `this.customToolbarClickEvents`
> 在 `method` 定义对应的事件
```js
  methods: {
    customEventBtn1() {
      console.log('This is "自定义按钮 1" click event ~~~~')
    },
    customEventBtn2() {
      console.log('This is "自定义按钮 2" click event ~~~~')
    },
    customEventBtn3() {
      console.log('This is "自定义按钮 3" click event ~~~~')
    },
    customEventBtn4() {
      console.log('This is "自定义按钮 4" click event ~~~~')
    }
  }
```
