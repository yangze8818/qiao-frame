import Blogroll from './blogroll.vue'
import BlogrollAdd from './blogrollAdd.vue'
import BlogrollEdit from './blogrollEdit.vue'
import BlogrollSearch from './blogrollSearch.vue'
import BlogrollView from './blogrollView.vue'

const components = [
  Blogroll,
  BlogrollAdd,
  BlogrollEdit,
  BlogrollSearch,
  BlogrollView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
