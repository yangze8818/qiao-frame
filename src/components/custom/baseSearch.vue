<!--
描述：table上方查询组件的二次封装
开发人：sunlf
开发日期：2017年8月17日

2017年8月31日
-->

<template lang="pug">
  div.kalix-search
    div.kalix-search-hd
      i.iconfont.icon-query
      | {{title}}
    div.kalix-search-bd
      el-form.search-container(ref="searchForm" v-bind:model="form" v-bind:inline="true")
        slot(name="searchFormSlot")
          el-form-item(v-for="item in searchFields" v-bind:label="item.label" v-bind:prop="item.prop" v-bind:key="item.prop")
            el-select(v-if="item.type==='select'" v-model="form[item.prop]" v-bind:class="bindCls(item.cls)" v-bind:data-type="item.dataType" v-bind:clearable="item.clearable")
              el-option(v-for="option in item.options" v-bind:key="option.value" v-bind:label="option.label" v-bind:value="option.value")
            el-input-number(v-else-if="item.type==='number'" v-model="form[item.prop]" v-bind:class="bindCls(item.cls)" v-bind:data-type="item.dataType")
            org-tree.inline(v-else-if="item.type==='orgTree'" v-model="form[item.prop]" v-bind:isAll="item.isAll")
            kalix-query-date-picker(v-else-if="item.type==='date'" v-model="form[item.prop]")
            kalix-query-date-picker(v-else-if="item.type==='year'" v-model="form[item.prop]" type="year")
            kalix-query-datetime-picker(v-else-if="item.type==='datetime'" v-model="form[item.prop]")
            kalix-dict-select(v-else-if="item.type==='dict'" v-bind:appName="item.appName" v-bind:dictType="item.dictType" v-model="form[item.prop]")
            Kalix-map-select(v-else-if="item.type==='map'" v-bind:appName="item.appName" v-bind:prop="item.prop" v-bind:selectUrl="item.selectUrl" v-model="form[item.prop]"
              v-bind:selectedOptions="item.options" v-on:getProp="getProp" v-on:input="getSelectValue" v-bind:stopChange="item.stopChange")
            input(v-else-if="item.type==='inputHidden'" v-model="form[item.prop]" type="hidden")
            el-input(v-else v-model="form[item.prop]")
        el-form-item
          el-button(type="primary" v-on:click="onSubmitClick")
            i.iconfont.icon-query
            | 查询
          el-button(type="success" v-on:click="onResetClick")
            i.iconfont.icon-reset
            | 重置
</template>

<script>
  import {strToUnicode} from 'common/unicode-convert'
  import {isEmptyObject} from 'common/util'
  import EventBus from 'common/eventbus'
  import {ON_SEARCH_BUTTON_CLICK} from './event.toml'
  import QueryDatepicker from 'components/biz/date/datepicker'
  import QueryDatetimepicker from 'components/biz/date/datetimepicker'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import BaseMapSelect from '@/components/custom/baseMapSelect'

  export default {
    activated() {
      console.log('[kalix] base search ' + '  is activated')
    },
    deactivated() {
      console.log('[kalix] base search ' + '  is deactivated')
    },
    data() {
      return {
        form: {},
        isSearch: false,
        queryStrs: {}
      }
    },
    props: {
      bizKey: {
        type: String,
        default: ''
      },
      searchForm: {
        type: Object
      },
      title: {
        type: String,
        default: ''
      },
      searchFields: { // 搜索查询的字段
        type: Array
      },
      formRules: null
    },
    created() {
      this._currentForm()
    },
    mounted() {
    },
    methods: {
      bindFormDataType(e) {
        this.formDataType[e.prop] = e.dataType || e.type || 'string'
        this.formDataField[e.prop] = e.field || null
      },
      bindCls(label) {
        if (label) {
          return label.length > 0 ? `${this.bizKey}-${label}` : ''
        }
        return ''
      },
      _currentForm() {
        this.isSearchFrom = false
        this.formDataType = {}
        this.formDataField = {}
        if (!isEmptyObject(this.searchForm)) {  // 是否传入 searchForm
          this.form = this.searchForm
          this.isSearchFrom = true
        } else {
          this.searchFields.forEach(item => {
            this.bindFormDataType(item)
            if (item.defaultVal) {
              this.$set(this.form, item.prop, item.defaultVal)
            } else {
              this.$set(this.form, item.prop, null)
            }
          })
        }
      },
      // 提交查询
      onSubmitClick() {
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
            console.log('onSubmitClick')
//            todo: 增加查询组成json串
            let requestDatas = []
            for (let item in this.form) {
              const itemVal = this.form[item]
              if (this.isSearchFrom) {  // 如果有 SearchFrom 传入
                let dataType = typeof itemVal
                let field = item
                let docItems = document.getElementsByClassName(`${this.bizKey}-${item}`)  //  根据 bizKey 和 v-model名 查找 dom 标签
                if (docItems && docItems.length === 1) {
                  //  如果 docItems 存在并且只有一个，获取当前字段的数据类型并赋值给 dataType
                  let docItem = docItems[0]
                  dataType = docItem.getAttribute('data-type')
                  field = docItem.getAttribute('field')
                  if (field && itemVal.length) {
                    let key = `"${field}"`   //  绑定 查询 key
                    let val = `${itemVal}`   //  绑定 查询 value
                    switch (dataType) {
                      case 'string':
                        //  如果 dataType 是 String 格式，key 和 val 增加双引号
                        key = `"%${field}%"`
                        if (this.isChinese(itemVal)) {
                          val = `"${strToUnicode(itemVal)}"`
                        } else {
                          val = `"${itemVal}"`
                        }
                        break
                      case 'datetime':
                        //  如果 dataType 是 Datetime 格式，val 增加双引号
                        key = `"${field}"`
                        val = `"${itemVal}"`
                        break
                      case 'orgTree':
                        val = `${itemVal}`
                        break
                    }
                    requestDatas.push(`${key}: ${val}`)
                  }
                }
              } else {
                if (itemVal) {
                  let field = item
                  let key = `"${field}"`   //  绑定 查询 key
                  let val = `"${itemVal}"`   //  绑定 查询 value
                  if (this.formDataField[item]) {
                    key = `"${this.formDataField[item]}"`
                  } else if (this.formDataType[item] === 'string') {
                    key = `"%${field}%"`
                  }
                  switch (this.formDataType[item]) {
                    case 'string':
                      if (this.isChinese(itemVal)) {
                        val = `"${strToUnicode(itemVal)}"`
                      }
                      break
                    case 'number':
                      val = `${itemVal}`
                      break
                  }
                  requestDatas.push(`${key}: ${val}`)
                }
              }
            }
            let searchObj = {}
            if (requestDatas.length > 0) {
              searchObj.jsonStr = `{${requestDatas.join(',')}}`
//              console.log('[Search]', `{${requestDatas.join(',')}}`)
            }
            this.isSearch = true
            // 兼容多个basetable查询情况
            let searchObjAll = {}
            if (this.bizKey) {
              searchObjAll.searchObj = searchObj
              searchObjAll.bizKey = this.bizKey
            } else {
              searchObjAll = searchObj
            }
            // EventBus.$emit(ON_SEARCH_BUTTON_CLICK, searchObj)
            EventBus.$emit(ON_SEARCH_BUTTON_CLICK, searchObjAll)
          } else {
            console.log('ERR')
          }
        })
      },
      // 重置搜索框
      onResetClick() {
        this.$refs.searchForm.resetFields()
        if (this.isSearch) {
          EventBus.$emit(ON_SEARCH_BUTTON_CLICK, {})
          this.isSearch = false
        }
      },
      // 是否是数字
      isNumberData(_data) {
        const regNumber = /^[0-9]+.?[0-9]*$/
        return regNumber.test(_data)
      },
      isChinese(str) {
        let strExp = new RegExp(/^[\u4E00-\u9FA5]+$/)
        if (strExp.test(str)) {
          return true
        }
        return false
      },
      getProp(val) {
        this.$emit('getProp', val)
      },
      getSelectValue(val) {
        this.$emit('selectVal', val)
      }
    },
    components: {
      KalixQueryDatePicker: QueryDatepicker,
      KalixQueryDatetimePicker: QueryDatetimepicker,
      KalixDictSelect: BaseDictSelect,
      KalixMapSelect: BaseMapSelect
    },
    computed: {
    },
    watch: {}
  }
</script>

<style lang='stylus' type='text/stylus'>
  @import "~@/assets/stylus/color.styl"
  @import "~@/assets/stylus/kalix-color.styl"
  .kalix-search
    margin 10px
    background-color $background-color-1
    .kalix-search-hd
      background-color $plank-title-background-color
      color $plank-title-color
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-search-bd
      border-top 1px solid border-color_1
      font-size 0
      padding 8px 12px
      text-align left
      .search-container
        margin-bottom -12px
    .el-form-item
      margin-right 12px
      margin-bottom 12px
    .el-button
      .iconfont
        font-size 14px
</style>
