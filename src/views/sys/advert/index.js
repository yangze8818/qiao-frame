import Advert from './advert.vue'
import AdvertAdd from './advertAdd.vue'
import AdvertEdit from './advertEdit.vue'
import AdvertSearch from './advertSearch.vue'
import AdvertView from './advertView.vue'

const components = [
  Advert,
  AdvertAdd,
  AdvertEdit,
  AdvertSearch,
  AdvertView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
