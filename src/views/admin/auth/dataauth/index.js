import dataauth from './dataauth.vue'
import dataauthAdd from './dataauthAdd.vue'
import dataauthAddUser from './dataauthAddUser.vue'
import dataauthSearch from './dataauthSearch.vue'
import dataauthView from './dataauthView.vue'

const components = [
  dataauth,
  dataauthAdd,
  dataauthAddUser,
  dataauthSearch,
  dataauthView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
