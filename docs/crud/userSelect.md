# userSelect.vue 搜索选择一个或多个用户
!> `meetingApplyAdd.vue`中实现了搜索选择一个或多个用户选择和修改功能
## 模板说明
```
  kalix-user-select(v-bind:params="params" style="width:100%"
  v-model="importantAttendees"
  v-bind:multiple="multiple"
  v-bind:userIds.sync="formModel.importantAttendees"
  v-bind:userNames.sync="formModel.importantAttendeesName"
  placeholder="请输入重要出席人")
```

> `v-bind:params="params"` 为搜索条件

>`v-model="meetingSummaryPerson"` 绑定的 model 对象，只读属性，多选：返回对象集合，单选：返回当前对对象

>`v-bind:multiple="multiple"` 是否可以多选，`true`多选，`false`单选

>`v-bind:userIds.sync="formModel.meetingSummaryPerson"` 设置文本框默认用户，返回当前被选中的用户 id。多选：返回逗号分隔的字符串，例：`'1,2,3,4,5'`，单选：返回当前id，Int型，例：`1`

>`v-bind:userNames.sync="formModel.meetingSummaryPersonName"` 只读属性，返回当前被选中的用户 name，多选：返回逗号分隔的字符串，例：`'老大,老二,老三,老四,老五'`，单选：返回当前name，String型，例：`'老大'`

>`placeholder="请输入重要出席人"` 文本框为空时的占位字符
