import Genealogy from './genealogy'

const components = [
  Genealogy
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
