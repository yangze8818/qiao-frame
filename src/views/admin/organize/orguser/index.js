import OrgUser from './orguser.vue'

const components = [
  OrgUser
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
