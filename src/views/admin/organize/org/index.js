import Org from './org.vue'
import OrgAdd from './orgAdd.vue'
import OrgAddUser from './orgAddUser.vue'
import OrgEdit from './orgEdit.vue'
import OrgSearch from './orgSearch.vue'

const components = [
  Org,
  OrgAdd,
  OrgAddUser,
  OrgEdit,
  OrgSearch
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
