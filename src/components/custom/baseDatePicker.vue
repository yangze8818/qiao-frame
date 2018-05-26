<template lang="pug">
  el-date-picker(v-model="currentValue"
  v-bind:type="type"
  v-bind:placeholder="placeholder"
  v-bind:format="format")
</template>
<script type="text/ecmascript-6">
  //  const dateFormat = require('date-fns/format')

  export default {
    props: ['value', 'type', 'placeholder', 'format'],
    data() {
      return {
        currentValue: this.value
      }
    },
    watch: {
      currentValue(nv) {
        let val = nv
        if (nv) {
//          val = dateFormat(nv, 'YYYY-MM-DD hh:mm:ss')
          let month = nv.getMonth() + 1
          let date = nv.getDate()
          let hours = nv.getHours()
          let minutes = nv.getMinutes()
          let seconds = nv.getSeconds()
          val = nv.getFullYear() + '-' +
            (month > 10 ? month : '0' + month) + '-' +
            (date > 10 ? date : '0' + date) + ' ' +
            (hours > 10 ? hours : '0' + hours) + ':' +
            (minutes > 10 ? minutes : '0' + minutes) + ':' +
            (seconds > 10 ? seconds : '0' + seconds)
        }
        this.$emit('input', val)
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
