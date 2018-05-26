<template lang="pug">
  el-form-item(v-bind:label="label" v-bind:prop="prop" v-bind:required='required' v-bind:rules="rules.checkPhone" v-bind:label-width="labelWidth")
    el-input(v-model="currentValue" v-on:input="change($event)")
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      value: null,
      label: {
        type: String,
        default: '固定电话'
      },
      prop: {
        type: String,
        default: 'phone'
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
      var checkPhone = (rule, value, callback) => {
        if (value) {
          if (!(/^[0-9]*$/.test(value))) {
            callback(new Error('请输入数字值'))
          } else {
            callback()
          }
        } else {
          if (this.required) {
            callback(new Error('请输入固定电话'))
          } else {
            callback()
          }
        }
      }
      return {
        currentValue: this.value,
        rules: {
          checkPhone: [{validator: checkPhone, trigger: 'blur'}]
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
