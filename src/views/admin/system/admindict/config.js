import admindict from './admindict.vue'

const components = [
  admindict
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
