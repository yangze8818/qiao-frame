<template lang="pug">
  el-form-item(v-bind:label="label" v-bind:prop="prop" v-bind:required='required' v-bind:rules="rules.checkMobile" v-bind:label-width="labelWidth")
    el-input(v-model="currentValue" v-on:input="change($event)")
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      value: null,
      label: {
        type: String,
        default: '手机'
      },
      prop: {
        type: String,
        default: 'mobile'
      },
      required: {
        type: Boolean,
        default: false
      },
      labelWidth: {
        type: String,
        default: '140px'
      }
    },
    data() {
      var checkMobile = (rule, value, callback) => {
        if (value) {
          if (!(/^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(value))) {
            callback(new Error('请输入正确的手机号码,如13104317890,要求11位数字且号码有效'))
          } else {
            callback()
          }
        } else {
          if (this.required) {
            callback(new Error('请输入手机'))
          } else {
            callback()
          }
        }
      }
      return {
        currentValue: this.value,
        rules: {
          checkMobile: [{validator: checkMobile, trigger: 'blur'}]
        }
      }
    },
    components: {},
    mounted() {
    },
    watch: {},
    methods: {
      change(value) {
        this.$emit('input', value)
      }
    }
  }
</script>
