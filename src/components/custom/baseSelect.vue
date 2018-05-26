<template lang="pug">
  el-select(v-model="currentValue" v-bind:placeholder="placeholder" v-bind:disabled="disabled" v-on:input="change($event)" v-bind:clearable="clearable" style="width:100%;")
    el-option(v-for="item in options"
    v-bind:key="item[id]"
    v-bind:label="item[label]"
    v-bind:value="item[id]")
</template>
<script type="text/ecmascript-6">
  import Cache from 'common/cache'
  import Message from 'common/message'

  export default {
    props: {
      requestUrl: {
        type: String, default: ''
      },
      placeholder: {
        type: String, default: ''
      },
      warnMsg: {
        type: String, default: '数据获得失败!'
      },
      value: null,
      appName: {
        type: String, default: ''
      },
      label: {
        default: 'name'
      },
      id: {
        default: 'id'
      },
      disabled: {
        type: Boolean, default: false
      },
      paramObj: {
        type: Object,
        default: () => {
          return {page: 1, start: 0, limit: 20}
        }
      },
      defaultSelect: {
        type: Boolean,
        default: false
      },
      defaultSelectLabel: {
        type: String,
        default: ''
      },
      clearable: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentValue: this.value,
        options: []
      }
    },
    mounted() {
      this.initOptions()
    },
    methods: {
      initOptions() {
        const DictKey = `${this.appName.toUpperCase()}-KEY`
        if (!Cache.get(DictKey)) {
//          console.log('this.requestUrl 111:')
          this.$http
            .get(this.requestUrl, {
              // params: {page: 1, start: 0, limit: 20}
              params: this.paramObj
            })
            .then(res => {
              this.options = res.data
              if (res.data.totalCount === 0) {
                Message.warning(this.warnMsg)
              }
              if (res.data.data) {
                this.options = res.data.data
                this.defaultSelectVal()
              }
              Cache.save(DictKey, JSON.stringify(this.options))
            })
        } else {
          this.options = JSON.parse(Cache.get(DictKey))
          this.defaultSelectVal()
        }
      },
      change(value) {
        this.$emit('input', value)
        let item = this.options.find(e => {
          return e.id === value
        })
        this.$emit('selectChange', item)
      },
      defaultSelectVal() {
        if (this.defaultSelect) {
          this.options.forEach((item) => {
            if (this.defaultSelectLabel === item[this.label]) {
              this.currentValue = item[this.id]
              this.$emit('vauleSetForm', this.currentValue)
            }
          })
        }
      }
    },
    watch: {
      value(newValue, oldValue) {
        this.currentValue = newValue
//        this.$emit('input', newValue)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
