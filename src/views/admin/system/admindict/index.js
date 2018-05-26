import AdminDict from './admindict.vue'

const components = [
  AdminDict
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
