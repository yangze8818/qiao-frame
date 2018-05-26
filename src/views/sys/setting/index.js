import Setting from './setting.vue'
import SettingEdit from './settingEdit.vue'
import SettingSearch from './settingSearch.vue'
import SettingView from './settingView.vue'

const components = [
  Setting,
  SettingEdit,
  SettingSearch,
  SettingView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
