const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  sex: state => state.user.sex,
  name: state => state.user.name,
  email: state => state.user.email,
  personal: state => state.user.personal,
  company: state => state.user.company,
  phone_number: state => state.user.phone_number,
  is_paypassword: state => state.user.is_paypassword,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  configs: state => state.config.configs
}
export default getters