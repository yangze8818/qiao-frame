import Column from './column.vue'
import ColumnAdd from './columnAdd.vue'
import ColumnEdit from './columnEdit.vue'
import ColumnSearch from './columnSearch.vue'
import ColumnView from './columnView.vue'

const components = [
  Column,
  ColumnAdd,
  ColumnEdit,
  ColumnSearch,
  ColumnView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
