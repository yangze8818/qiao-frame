/**
 * Created by sunlf on 2017/7/21.
 * 封装消息显示
 */
import {Message} from 'element-ui'

export default {
  message(_type, _msg, _showClose = true) {
    Message({
      type: _type,
      showClose: _showClose,
      message: _msg
    })
  },
  success(_msg, _showClose = true) {
    this.message('success', _msg, _showClose)
  },
  warning(_msg, _showClose = true) {
    this.message('warning', _msg, _showClose)
  },
  error(_msg, _showClose = true) {
    this.message('error', _msg, _showClose)
  },
  info(_msg, _showClose = true) {
    this.message('info', _msg, _showClose)
  },
  processResult(res) { // 处理返回结果
    if (res.data.success) {
      this.success(res.data.msg)
    } else {
      this.error(res.data.msg)
    }
  }
}
