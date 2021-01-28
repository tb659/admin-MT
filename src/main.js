import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'

import i18n from '@/i18n'

import '@/assets/styles/common.scss' // common css
import styles from '@/assets/styles/index.scss'
import * as utils from '@/utils'

import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'

import './assets/icons' // icon
import './permission' // permission control

import Pagination from '@/components/Pagination'
// 自定义表格工具扩展
import RightToolbar from '@/components/RightToolbar'

// 全局主题挂载
Vue.prototype.$styles = styles //  主题样式

// 全局方法挂载
Vue.prototype.$utils = utils // 工具方法

Vue.prototype.msgSuccess = function(msg, cb) {
  this.$message({
    showClose: true,
    message: msg,
    type: 'success',
    duration: 1000,
    onClose: cb
  })
}

Vue.prototype.msgError = function(msg) {
  this.$message({ showClose: true, message: msg, type: 'error' })
}

Vue.prototype.msgInfo = function(msg) {
  this.$message.info(msg)
}

// 全局组件挂载
Vue.component('Pagination', Pagination) // 分页
Vue.component('RightToolbar', RightToolbar) // 表格工具栏

Vue.use(permission)

Vue.use(Element, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  i18n,
  el: '#app',
  router,
  store,
  render: h => h(App)
})
