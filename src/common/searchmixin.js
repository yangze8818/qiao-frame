export const SearchDataMixin = {
  data() {
    return {
      formModel: {},
      beginDate_begin: '',
      beginDate_end: ''
    }
  },
  methods: {
    bindCls(label) {
      return label.length > 0 ? `${this.bizKey}-${label}` : ''
    },
    beginChange(val) {
      this.formModel.beginDate_begin = val
    },
    endChange(val) {
      this.formModel.beginDate_end = val
    }
  }
}
