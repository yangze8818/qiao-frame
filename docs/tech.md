## about table tool button
> 1. define button array
```xml
[[ToolButtonList]]
  id = "view"
  type = "text"
  size = "small"
  title = "查看"
[[ToolButtonList]]
  id = "edit"
  type = "text"
  size = "small"
  title = "编辑"
[[ToolButtonList]]
  id = "delete"
  type = "text"
  size = "small"
  title = "删除"
```

> 2. cycle output button
```vue
el-button(v-for="btn in btnList" :key="btn.id" v-on:click="toggle(scope.row,btn.id)"
          :type="btn.type" :size="btn.size") {{btn.title}}
```

> 3. toggle(scope.row,btn.id) should be under methods.
```js
toggle(row, btnId) {
        this.$emit(ON_TABLE_TOOL_CLICK, row, btnId)
      }
```

> 4. parent component will config as :
```js
slot(name="tableToolSlot")
        kalix-table-tool(:btnList="btnList" @onTableToolClick="btnClick")
```

> 5. when we need to custom button:
```
kalix-table-tool(slot="tableToolSlot" :btnList="customBtnList"
  @onTableToolClick="customBtnClick")
```

## register global component by config file
```
import {GlobalComponent} from 'config/global.toml'
GlobalComponent.forEach((item) => {
  console.log('[kalix] registry name is: ' + item.name, '; registry path is: ' + item.path)
  Vue.component(item.name, require('' + item.path))
})
```

## dynamic set props
> Hello.vue

```
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <component :is="whichtoshow" v-bind="subdata"></component>
    <button type="button" @click="click">click</button>
  </div>
</template>

<script>
  import Vue from 'vue'

  var Comp = Vue.extend(require('./comp.vue'))
  var Comp1 = Vue.extend(require('./comp1.vue'))

  export default {
    name: 'hello',
    methods: {
      click() {
        if (this.toggle) {
          this.whichtoshow = 'subcomponent'
          this.toggle = false
        } else {
          this.whichtoshow = 'subcomponent1'
          this.toggle = true
        }
      }
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        subdata: {
          propA: 'valA11',
          propB: 'valB22'
        },
        whichtoshow: '',
        toggle: false
      }
    },
    mounted() {
    },
    components: {
      subcomponent: Comp,
      subcomponent1: Comp1
    }
  }
</script>
```

> 技术关键
```
  Vue.extend(require('./comp.vue'))
  <component :is="whichtoshow" v-bind="subdata"></component>
```

## async loading vue from vue-router
> remove following code

```
import Massive from '@/components/Massive'
```

> change to

```
const Massive = resolve =>
require(['../components/Massive.vue'], resolve)
```

> also can do it

```
{
      path: '/show',
      name: 'Show',
      component: import('../components/Show.vue')
    }
```

## unit test
> https://github.com/mzabriskie/moxios

> https://github.com/ctimmerm/axios-mock-adapter

整理一下配置测试环境所需要的依赖：
* karma //test runner，提供测试所需的浏览器环境、监测代码改变自动重测、整合持续集成等功能
* phantomjs-prebuilt //phantomjs，在终端运行的浏览器虚拟机
* mocha //test framework，测试框架，运行测试
* chai //assertion framework, 断言库，提供多种断言，与测试框架配合使用
* sinon //测试辅助工具，提供 spy、stub、mock 三种测试手段，帮助捏造特定场景
* karma-webpack //karma 中的 webpack 插件
* karma-mocha //karma 中的 mocha 插件
* karma-sinon-chai //karma 中的 sinon-chai 插件
* sinon-chai //karma 中的 chai 插件
* karma-sourcemap-loader //karma 中的 sourcemap 插件
* karma-phantomjs-launcher //karma 中的 phantomjs 插件
* karma-spec-reporter //在终端输出测试结果
* istanbul-instrumenter-loader //代码覆盖率统计工具 istanbul
* karma-coverage-istanbul-reporter //代码覆盖率报告产出插件

> !测试框架 Mocha 实例教程[http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html]

> vue unit testing https://github.com/eddyerburgh/avoriaz

## 参数化一个属性
- 参考`baseDialog.vue`中的title属性
1. 设置title为props
2. 外暴方式修改title
```js
open(title, isEdit = false) {
        this.$emit('update:title', title)
        this.visible = true
        this.isEdit = isEdit
      }
```
3. 直接在父组件中自定义title数值(参考`processDefinitionView.vue`)
```js
methods: {
      initData(row) {
        this.title = '流程定义查看-' + row.name
        this.imgUrl = viewURL + row.id
      }
    }
```

## 定义table的列操作中的一个自定义按钮
> (参考`processDefinition.vue`) 
