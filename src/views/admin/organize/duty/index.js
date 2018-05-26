import Duty from './duty.vue'
import DutyAdd from './dutyAdd.vue'
import DutyAddUser from './dutyAddUser.vue'
import DutySearch from './dutySearch.vue'
import DutyView from './dutyView.vue'

const components = [
  Duty,
  DutyAdd,
  DutyAddUser,
  DutySearch,
  DutyView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
