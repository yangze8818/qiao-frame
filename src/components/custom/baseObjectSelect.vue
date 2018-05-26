<!--
描述：支持远程查询的对象select组件
     显示对象名称，保存可选对象的id、名称
开发人：hqj
开发日期：2017年9月29日
-->
<template>
  <el-select
    v-model='currentValue'
    filterable
    remote
    :multiple="multiple"
    :placeholder='placeholder'
    :remote-method='remoteMethod'
    :loading='loading'
    v-on:change="onChange">
    <el-option
      v-for='object in objectList'
      :key='object[id]'
      :label='object[label]'
      :value='object[id]'>
    </el-option>
  </el-select>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      placeholder: {
        type: String,
        default: '请输入名称'
      },
      value: {
        required: true
      },   // 用于绑定v-model
      multiple: { // 是否允许多选
        type: Boolean,
        default: false
      },
      params: {}, // 附加搜索参数
      defaultOptions: {},
      defaultIds: '',     // 已选择的 id 逗号分隔字符串,
      objectsUrl: '',
      objectNames: '',
      objectIds: '',
      label: {
        default: 'name'
      },
      id: {
        default: 'id'
      }
    },
    data() {
      return {
        objectList: [],
        loading: false,
        currentValue: this.value,
        selectUser: {}
      }
    },
    created() {
      // 如果有传入 defaultIds
      let _data = {
        id: this.defaultIds,
        page: 1,
        start: 0,
        limit: 200
      }
      this.axios.get(this.objectsUrl, {
        params: _data
      }).then(response => {
        this.objects = response.data.data
        if (this.objectIds) {
          this.objectList = response.data.data
          if (this.multiple) {
            let _defaultIds = this.objectIds.toString().split(',') // 将 userIds 转换为 数组
            let _defaultIdsInt = _defaultIds.map(item => {    // 将 _defaultIds 字符串数组转化为 数字
              return item * 1
            })
            this.currentValue = _defaultIdsInt  // 用户ID集合 赋给 currentValue
          } else {
            this.currentValue = this.objectIds * 1
          }
          let that = this
          setTimeout(() => {  // 清空 下拉列表
            that.objectList = []
          }, 20)
        }
      })
    },
    methods: {
      onChange(value) {
        let _selectObject = {}
        let _objects = null
        let _objectIds = null
        if (this.multiple) {  // 多选
          let oList = this.objects || this.objectList
          let objects = oList.filter((item) => {
            return (value.indexOf(item[this.id]) > -1)
          })
          _selectObject = objects || []
          _objects = []
          _objectIds = []
          _selectObject.forEach(e => {
            _objects.push(e[this.label])
            _objectIds.push(e[this.id])
          })
          _objects = _objects.join(',')
          _objectIds = _objectIds.join(',')
        } else {  // 单选
          let objects = this.objectList.filter((item) => {
            return item[this.id] === value
          })
          _selectObject = objects[0] || {}
          _objects = _selectObject[this.label]
          _objectIds = _selectObject[this.id]
        }
        this.$emit('update:objectNames', _objects)
        this.$emit('update:objectIds', _objectIds)
        this.$emit('objectSelected', _selectObject)  // 发送事件
      },
      remoteMethod(query) {
        if (query && query !== '') {
//          this.$emit('input', this.currentValue)  // 设置model的数值
          this.loading = true
          setTimeout(() => {
            this.loading = false
            let _jsonStr = {}
            _jsonStr['%' + this.label + '%'] = query
            _jsonStr = Object.assign(_jsonStr, this.params)
            let _data = {
              jsonStr: JSON.stringify(_jsonStr),
              page: 1,
              start: 0,
              limit: 200
            }
            this.axios.get(this.objectsUrl, {
              params: _data
            }).then(response => {
              this.objectList = response.data.data
            })
          }, 100)
        } else {
          this.objectList = []
        }
      }
    },
    watch: {
      currentValue(newValue) {
        this.$emit('input', newValue)  // 设置model的数值
      }
    }
  }
</script>
