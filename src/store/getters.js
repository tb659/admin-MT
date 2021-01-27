const getters = {
  sidebar: state => state.app.sidebar, // 菜单栏状态
  size: state => state.app.size, // 按钮输入框大小
  device: state => state.app.device, // 设备
  visitedViews: state => state.tagsView.visitedViews, // 页签路由对象
  cachedViews: state => state.tagsView.cachedViews, // 页签路由name
  token: state => state.user.token, // token
  name: state => state.user.name, // 名称
  avatar: state => state.user.avatar, // 头像
  roles: state => state.user.roles, // 角色
  permissions: state => state.user.permissions, // 权限
  permission_routes: state => state.permission.routes, // 平级路由对象 含 *
  sidebarRouters: state => state.permission.sidebarRouters // 嵌套级路由对象
}
export default getters
