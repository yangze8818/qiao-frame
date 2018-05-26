<template lang="pug">
  keep-alive
    kalix-base-dict(ref="baseTableRef" v-bind:bizKey="bizKey" v-bind:bizDialog="bizDialog" v-bind:dictComponent="dictComponent"
    v-bind:targetURL="targetURL" v-bind:dialogOptions="dialogOptions")
</template>

<script type="text/ecmascript-6">
  import {QiaoDictURL, QiaoDictsTypesListURL} from '../config.toml'
  export default {
    name: 'kalix-qiao-dict',
    data() {
      return {
        dialogOptions: {
          targetURL: QiaoDictURL,
          dictTypesListURL: QiaoDictsTypesListURL,
          bizKey: 'dict'
        },
        bizKey: 'dict',
        dictComponent: [],
        targetURL: QiaoDictURL,
        bizDialog: [
          {id: 'view', dialog: 'basedictView'},
          {id: 'edit', dialog: 'basedictAdd'},
          {id: 'add', dialog: 'basedictAdd'}
        ]
      }
    },
    created() {
    },
    methods: {},
    components: {
    }
  }
</script>

<style scoped lang="stylus">

</style>
