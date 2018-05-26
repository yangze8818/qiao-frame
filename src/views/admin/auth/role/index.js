import role from './role.vue'
import roleAdd from './roleAdd.vue'
import roleEdit from './roleEdit.vue'
import roleAddUser from './roleAddUser.vue'
import roleAuth from './roleAuth.vue'
import roleSearch from './roleSearch.vue'
import roleView from './roleView.vue'

const components = [
  role,
  roleAdd,
  roleAddUser,
  roleAuth,
  roleSearch,
  roleView,
  roleEdit
]
const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
