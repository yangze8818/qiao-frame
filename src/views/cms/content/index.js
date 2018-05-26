import Content from './content.vue'
import ContentAdd from './contentAdd.vue'
import ContentEdit from './contentEdit.vue'
import ContentSearch from './contentSearch.vue'
import ContentView from './contentView.vue'

const components = [
  Content,
  ContentAdd,
  ContentEdit,
  ContentSearch,
  ContentView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
