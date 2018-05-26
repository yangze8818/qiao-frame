/**
 * 角色操作按钮定义
 * @type {[null,null,null,null,null]}
 */
const roleBtnList = [
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
    isPermission: true // 是否进行权限认证
  },
  {
    id: 'delete',
    title: '删除',
    isShow: true, // 是否显示
    isPermission: true // 是否进行权限认证
  },
  {
    id: 'addUser',
    title: '用户',
    toolTipTitle: '添加用户',
    isShow: true, // 是否显示
    isPermission: true // 是否进行权限认证
  },
  {
    id: 'auth',
    title: '权限',
    toolTipTitle: '权限分配',
    isShow: true, // 是否显示
    isPermission: true // 是否进行权限认证
  }
]

export {roleBtnList}
