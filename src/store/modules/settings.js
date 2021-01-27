import variables from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { sideTheme, showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  theme: variables.theme, // 按钮
  sideTheme: sideTheme, // 菜单
  showSettings: showSettings, // 显示布局设置
  tagsView: tagsView, // 页签
  fixedHeader: fixedHeader, // 固定头部
  sidebarLogo: sidebarLogo // 菜单logo
}

const mutations = {
  // 设置改变
  CHANGE_SETTING: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
