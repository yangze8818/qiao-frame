<template lang="pug">
  el-select(v-model="currentValue" v-bind:placeholder="placeholder" v-bind:disabled="disabled" v-on:input="change($event)" style="width:100%;")
    el-option(v-for="item in options" v-bind:key="item[id]" v-bind:label="item[label]" v-bind:value="item[id]")
</template>
<script type="text/ecmascript-6">
  import Cache from 'kalix-vue-lib/src/common/cache'

  export default {
    props: {
      requestUrl: {
        type: String, default: ''
      },
      placeholder: {
        type: String, default: ''
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
    watch: {
      value(newValue, oldValue) {
        this.currentValue = newValue
        // this.$emit('input', newValue)
        this.initOptions()
      },
      requestUrl(newValue) {
        this.initOptions()
      }
    },
    methods: {
      initOptions() {
        if (!this.requestUrl) {
          return
        }
        const DictKey = `${this.appName.toUpperCase()}-KEY`
        if (!Cache.get(DictKey)) {
          this.$http
            .get(this.requestUrl, {
              params: {page: 1, start: 0, limit: 20}
            })
            .then(res => {
              if (res.data) {
                this.options = this.dealWithOptions(res.data)
              }
              Cache.save(DictKey, JSON.stringify(this.options))
            })
        } else {
          this.options = JSON.parse(Cache.get(DictKey))
        }
      },
      dealWithOptions(array) {
        let rtn = []
        if (array && array.length > 0) {
          for (let i = 0; i < array.length; i++) {
            if (array[i].children && array[i].children.length > 0) {
              for (let j = 0; j < array[i].children.length; j++) {
                rtn.push(array[i].children[j])
              }
            }
          }
        }
        return rtn
      },
      change(value) {
        this.$emit('input', value)
        let item = this.options.find(e => {
          return e.id === value
        })
        this.$emit('selectChange', item)
        console.log('newValue====:', item)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
