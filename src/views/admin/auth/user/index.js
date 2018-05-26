import User from './user.vue'
import userSearch from './userSearch.vue'
import userAdd from './userAdd.vue'
import userEdit from './userEdit.vue'
import userView from './userView.vue'
import userResetpwd from './userResetpwd.vue'
import userEditpwd from './userEditpwd.vue'

const components = [
  User,
  userSearch,
  userAdd,
  userEdit,
  userView,
  userResetpwd,
  userEditpwd
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
