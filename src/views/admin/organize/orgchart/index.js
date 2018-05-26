import OrgChart from './orgchart.vue'

const components = [
  OrgChart
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}
export default main
