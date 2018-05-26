!> 以下对树形(Tree)组件进行了详细的描述
> 介绍
basetree
通过树形控件选定节点，对表进行增删改查信息操作，即表中有某一字段为树形结构，该树形结构字段需单独建表管理，对表进行维护操作时可使用该控件。
使用场景：如职务管理等，先选取组织机构树，再操作职务信息。

basetree2
选取树形表结构数据时，可以使用该控件
使用场景：如组织机构树等。

两个组件均为局部加载

> 使用

basetree

```
xxxxxx.vue

<template lang="pug">
  ...
  kalix-xxx-tree(v-bind:treeDataURL="xxxURL" v-bind:parentNodeId="xxxId" v-on:nodeClick="onXxxTreeClick")
  ...
</template>
<script>
  ...
  import XxxTree from '@/components/tree/basetree'
  ...
  export default {
    data() {
      return {
        ...
        targetURL: '',
        xxxId: -1,
        xxxName: '',
        xxxURL: '/camel/rest/xxxs'
      }
    },
    components: {
      ...
      KalixXxxTree: XxxTree,
      ...
    }
  },
  methods: {
    ...
    onXxxTreeClick(data) {
      this.xxxId = data.id
      this.xxxName = data.name
      this.targetURL = `/camel/rest/xxxs/${data.id}/majorcourses`
      this.dialogOptions = {
        xxxId: this.xxxId,
        xxxName: this.xxxName,
        targetURL: this.targetURL
      }
    }
    ...
  }
</script>
```

basetree2

```
xxxxxxAdd.vue

<template lang="pug">
  ...
  kalix-xxx-tree2(v-model="formModel.xxxId" v-bind:treeDataURL="xxxURL")
  ...
</template>
<script>
  ...
  import XxxTree2 from '@/components/tree/basetree2'
  ...
  export default {
    data() {
      return {
        ...
        xxxURL: '/camel/rest/xxxs'
      }
    },
    components: {
      ...
      KalixXxxTree2: XxxTree2,
      ...
    }
  }
</script>
```

```
xxxxxxView.vue

<template lang="pug">
  ...
  kalix-xxx-tree2(v-model="formModel.xxxId" v-bind:treeDataURL="xxxURL" disabled)
  ...
</template>
<script>
  ...
  import XxxTree2 from '@/components/tree/basetree2'
  ...
  export default {
    data() {
      return {
        ...
        xxxURL: '/camel/rest/xxxs'
      }
    },
    components: {
      ...
      KalixXxxTree2: XxxTree2,
      ...
    }
  }
</script>
```
