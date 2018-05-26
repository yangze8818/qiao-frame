import Menu from './menu.vue'
import MenuAdd from './menuAdd.vue'
import MenuEdit from './menuEdit.vue'
import MenuSearch from './menuSearch.vue'
import MenuView from './menuView.vue'

const components = [
  Menu,
  MenuAdd,
  MenuEdit,
  MenuSearch,
  MenuView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
