<!--
描述：支持远程查询的对象select组件
     显示对象名称，保存可选对象的id、名称
开发人：hqj
开发日期：2017年12月25日
-->
<template lang="pug">
  div
    template(v-if="multiple")
      el-select(v-model='currentValue' v-bind:placeholder='placeholder' v-bind:disabled="disabled" filterable multiple
      v-on:change="onChange")
        el-option(v-for='object in objects' v-bind:key='object[id]' v-bind:label='object[label]'
        v-bind:value='object[id]')
    template(v-else)
      el-select(v-model='currentValue' v-bind:placeholder='placeholder' v-bind:disabled="disabled" filterable clearable
      v-on:change="onChange")
        el-option(v-for='object in objects' v-bind:key='object[id]' v-bind:label='object[label]'
        v-bind:value='object[id]')
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      objectsUrl: '', // 对象字典请求服务地址(如：'/camel/rest/users')
      id: {
        default: 'id'
      },
      label: {
        default: 'name'
      },
      value: { // 用于绑定v-model
        required: true
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      multiple: { // 是否允许多选
        type: Boolean,
        default: false
      },
      jsonStr: '', // 对象字典查询条件字符串
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        objects: [],
        currentValue: null
      }
    },
    created() {
      this.fentch()
    },
    watch: {
      jsonStr(newValue) {
        this.fentch()
      },
      value(newValue) {
        this.initCurrentValue()
      }
    },
    methods: {
      // 组件初始化
      fentch() {
        this.getData()
        this.initCurrentValue()
      },
      // 获取数据
      getData() {
        if (!this.objectsUrl) {
          return
        }
        let _params = {
          jsonStr: this.jsonStr,
          page: 1,
          start: 0,
          limit: 200
        }
        this.axios.request({
          method: 'GET',
          url: this.objectsUrl,
          params: _params
        }).then(response => {
          if (response.data.data) {
            this.objects = response.data.data
          }
        })
      },
      // 初始值绑定
      initCurrentValue () {
        if (this.value) {
          if (this.multiple) {
            // 将初始值转换为数组
            let _ids = this.value.toString().split(',')
            // 将_ids字符串数组转化为数字数组
            let _idsInt = _ids.map(item => {
              return item * 1
            })
            this.currentValue = _idsInt
          } else {
            this.currentValue = this.value * 1
          }
        } else {
          this.currentValue = null
        }
      },
      onChange(value) {
        // 选择的对象
        let _selectObject = {}
        // 选择的对象id(多选用,分隔)
        let _objectIds = null
        // 选择的对象label(多选用,分隔)
        // let _objectLabels = null
        if (this.multiple) { // 多选
          let _objects = this.objects.filter((item) => {
            return (value.indexOf(item[this.id]) > -1)
          })
          _selectObject = _objects || []
          let _ids = []
          // let _labels = []
          _selectObject.forEach(e => {
            _ids.push(e[this.id])
            // _labels.push(e[this.label])
          })
          _objectIds = _ids.join(',')
          // _objectLabels = _labels.join(',')
        } else { // 单选
          let _objects = this.objects.filter((item) => {
            return item[this.id] === value
          })
          _selectObject = _objects[0] || {}
          _objectIds = _selectObject[this.id]
          // _objectLabels = _selectObject[this.label]
        }
        // 发送事件
        this.$emit('objectSelected', _selectObject)
        // 设置model的数值
        this.$emit('input', _objectIds)
      }
    }
  }
</script>
