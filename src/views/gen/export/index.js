import Export from './export'

const components = [
  Export
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
