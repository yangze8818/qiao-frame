/**
 * 定义表格列上的按钮
 * add by yangz 2018-1-31
 **/
const startedCond = (scope) => {
  return scope.category === '待审核'
}

// const unstartCond = (scope) => {
//   return scope.category === '已审核'
// }

const forumConfigBtnList = [
  {
    id: 'view',
    title: '查看',
    isShow: true,
    isPermission: true
  }, {
    id: 'edit',
    title: '编辑',
    isShow: true,
    isPermission: true
  }, {
    id: 'auditing',
    title: '审核',
    isShow: true,
    isPermission: true,
    cond: startedCond
  }, {
    id: 'delete',
    title: '删除',
    isShow: true,
    isPermission: true // 是否进行权限认证
  }]

export {forumConfigBtnList}
