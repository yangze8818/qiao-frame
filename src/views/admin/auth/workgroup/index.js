import WorkGroup from './workgroup.vue'
import WorkGroupAdd from './workgroupAdd.vue'
import WorkGroupAddRole from './workgroupAddRole.vue'
import WorkGroupAddUser from './workgroupAddUser.vue'
import WorkGroupSearch from './workgroupSearch.vue'
import WorkGroupView from './workgroupView.vue'

const components = [
  WorkGroup,
  WorkGroupAdd,
  WorkGroupAddRole,
  WorkGroupAddUser,
  WorkGroupSearch,
  WorkGroupView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
