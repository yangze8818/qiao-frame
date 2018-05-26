import District from './district'
import DistrictAdd from './districtAdd.vue'
import DistrictEdit from './districtEdit.vue'
import DistrictSearch from './districtSearch.vue'
import DistrictView from './districtView.vue'

const components = [
  District,
  DistrictAdd,
  DistrictEdit,
  DistrictSearch,
  DistrictView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
