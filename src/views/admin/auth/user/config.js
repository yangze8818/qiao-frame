/**
 * 用户启用判断条件
 * @param scope
 * @returns {boolean}
 */
const startCond = (scope) => {
  return scope.row.available === 1
}

/**
 * 用户操作按钮定义
 * @type {[null,null,null,null,null]}
 */
const userBtnList = [
  {
    id: 'view',
    title: '查看',
    isShow: true, // 是否显示
    isPermission: true // 是否进行权限认证
  },
  {
    id: 'edit',
    title: '编辑',
    isShow: true, // 是否显示
    isPermission: true, // 是否进行权限认证
    cond: startCond
  },
  {
    id: 'startStopUsing',
    title: '',
    isShow: true, // 是否显示
    isPermission: true, // 是否进行权限认证
    titleCompute: (scope) => {
      return scope.row.available === 1 ? '停用' : '启用'
    }
  },
  {
    id: 'key',
    title: '密码',
    toolTipTitle: '重置密码',
    isShow: true, // 是否显示
    isPermission: true, // 是否进行权限认证
    cond: startCond
  },
  {
    id: 'auth',
    title: '权限',
    toolTipTitle: '权限查看',
    isShow: true, // 是否显示
    isPermission: true // 是否进行权限认证
  }
]

export {userBtnList}
