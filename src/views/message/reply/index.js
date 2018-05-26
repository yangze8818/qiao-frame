import Reply from './reply.vue'
import ReplyAdd from './replyAdd.vue'
import ReplyEdit from './replyEdit.vue'
import ReplySearch from './replySearch.vue'
import ReplyView from './replyView.vue'

const components = [
  Reply,
  ReplyAdd,
  ReplyEdit,
  ReplySearch,
  ReplyView
]

const main = {
  install(Vue) {
    components.map((component) => {
      Vue.component(component.name, component)
    })
  }
}

export default main
