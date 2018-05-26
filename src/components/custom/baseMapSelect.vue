<!--
描述：数据字典select组件
开发人：sunlf
开发日期：2017年8月24日
-->
<template lang="pug">
  div(v-if="multiple")
    el-select(v-model='selectedOptions' v-bind:disabled="disabled"
    v-bind:placeholder='placeholder' v-bind:multiple="multiple"  style="width:100%;" ref="mapSelect")
      el-option(v-for="item in items" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value")
  div(v-else)
    el-select(v-model='currentValue' v-bind:prop="prop" v-bind:stopChange="stopChange" v-on:input="change($event)" v-bind:disabled="disabled"
    v-bind:placeholder='placeholder' v-bind:multiple="multiple"  style="width:100%;" ref="mapSelect")
      el-option(v-for="item in items" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value")
</template>

<script type="text/ecmascript-6">
  import Cache from 'common/cache'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '请选择'
      },
      appName: {  // 应用名称
        type: String
      },
      prop: {  // search中定义的prop属性
        type: String
      },
      disabled: Boolean, // 是否禁止
      value: null,
      multiple: {
        type: Boolean,
        default: false
      },
      selectUrl: {
        type: String
      },
      paramStr: {
        type: String
      },
      selectedOptions: {
        type: Array
      },
      stopChange: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        items: [],
        currentValue: this.value
        // selectedOptions: []
      }
    },
    mounted() {
      this.getDict()
    },
    methods: {
      change: function (val) {
        this.$emit('getProp', this.prop)
        if (this.stopChange === false) {
          this.$emit('input', val)
        }
      },
      getDict() {
        if (this.selectUrl) {
          this.name = this.appName.toUpperCase()
          if (this.name) {
            const MapKey = `${this.name.toUpperCase()}-MAP-KEY`
            if (!Cache.get(MapKey)) {
              this.axios.get(this.selectUrl, {
                params: this.paramStr
              }).then(response => {
                if (response.data) {
                  Cache.save(MapKey, JSON.stringify(response.data.data))
                  this.initItems(response.data.data)
                }
              })
            } else {
              this.visibleChange()
            }
          }
        } else {
          this.items = this.selectedOptions
        }
      },
      visibleChange() {
        const MapKey = `${this.appName.toUpperCase()}-MAP-KEY`
        let data_ = JSON.parse(Cache.get(MapKey)) // get data from cache
        this.initItems(data_)
        if (this.multiple) {
          this.selectedOptions = JSON.parse('[' + this.value + ']')
        }
      },
      initItems(data_) {
        // this.items = data_.filter(item => {
        //   return item.type === this.keyType
        // })
        this.items = data_
      }
    },
    watch: {
      value(nv, ov) {
        if (this.multiple) {
          this.selectedOptions = JSON.parse('[' + nv + ']')
        } else {
          this.currentValue = nv
        }
      },
      selectedOptions(nv) {
        let rtn = nv.join(',')
        this.$emit('input', rtn)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
