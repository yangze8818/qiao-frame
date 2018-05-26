!> 在实际的业务开发过程中，经常遇到的一种情况就是，根据业务的不同，赋予用户的操作也是不同的。
   以`views/oa/meetingapply/meetingapply.vue`为例说明如何实现该功能。
## 模板说明
!> `baseTableTool.vue` 中做如下修改：
```js
    template(scope="scope")
      template(v-for="btn in btnList")
        template(v-if="btn.titleCompute")
          el-button(v-if="(btn.isShow && !btn.cond) || btn.cond(scope)" v-on:click="toggle(scope.row,btn.id)"
          type="text" size="small") {{btn.titleCompute(scope)}}
        template(v-else)
          el-button(v-if="btn.isShow && !btn.cond || btn.cond(scope)" v-on:click="toggle(scope.row,btn.id)"
          type="text" size="small") {{btn.title}}
```
其中`(btn.isShow && !btn.cond) || btn.cond(scope)`是新增内容。
通过校验btnList的cond函数来完成该行按钮的是否显示。

## 代码说明
在`views/oa/meetingapply/meetingapply.vue`中定义btnList列表，如下：
```js
btnList: [
          {
            id: 'view',
            title: '查看',
            isShow: true,   // 是否显示
            isPermission: true  // 是否进行权限认证
          },
          {
            id: 'edit',
            title: '编辑',
            isShow: true,   // 是否显示
            isPermission: true,  // 是否进行权限认证
            cond: unstartCond
          },
          {
            id: 'delete',
            title: '删除',
            isShow: true,   // 是否显示
            isPermission: true,  // 是否进行权限认证
            cond: unstartCond
          },
          {
            id: 'progress',
            title: '进度',
            isShow: true,   // 是否显示
            isPermission: true,  // 是否进行权限认证
            cond: startedCond
          },
          {
            id: 'start',
            title: '启动',
            isShow: true,   // 是否显示
            isPermission: true,  // 是否进行权限认证
            cond: unstartCond
          }

        ]
```
cond函数定义为：
```js
const startedCond = (scope) => {
    return scope.row.status === 1
  }

  const unstartCond = (scope) => {
    return scope.row.status === 0
  }
```
