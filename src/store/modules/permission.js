import { constantRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView'

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    sidebarRouters: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_SIDEBAR_ROUTERS: (state, routers) => {
      state.sidebarRouters = constantRoutes.concat(routers)
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise(resolve => {
        // 向后端请求路由数据
        // getRouters().then(res => {
        console.log('----------------------------------------向后端请求路由数据')
        let res = {
          msg: '操作成功',
          code: 200,
          data: [
            {
              name: 'DataFill',
              path: '/dataFill',
              hidden: false,
              redirect: 'noRedirect',
              component: 'Layout',
              alwaysShow: true,
              meta: { title: '数据填报', icon: 'date', noCache: false },
              children: [
                {
                  name: 'MyTest',
                  path: 'myTest',
                  hidden: false,
                  component: 'dataFill/myTest/index',
                  meta: { title: '我的任务', icon: 'user', noCache: false }
                }
              ]
            },
            {
              name: 'TeskManager',
              path: '/teskManager',
              hidden: false,
              redirect: 'noRedirect',
              component: 'Layout',
              alwaysShow: true,
              meta: { title: '任务管理', icon: 'date', noCache: false },
              children: [
                {
                  name: 'SponsorTesk',
                  path: 'sponsorTesk',
                  hidden: false,
                  component: 'teskManager/sponsorTesk/index',
                  meta: { title: '发起任务', icon: 'user', noCache: false }
                },
                {
                  name: 'CollectAudit',
                  path: 'collectAudit',
                  hidden: false,
                  component: 'teskManager/collectAudit/index',
                  meta: { title: '汇总审核', icon: 'user', noCache: false }
                }
              ]
            },
            {
              name: 'ReportAudit',
              path: '/reportAudit',
              hidden: false,
              redirect: 'noRedirect',
              component: 'Layout',
              alwaysShow: true,
              meta: { title: '提报审核', icon: 'date', noCache: false },
              children: [
                {
                  name: 'Index',
                  path: 'index',
                  hidden: false,
                  component: 'reportAudit/reportAudit/index',
                  meta: { title: '提报审核', icon: 'user', noCache: false }
                }
              ]
            },
            {
              name: 'System',
              path: '/system',
              hidden: false,
              redirect: 'noRedirect',
              component: 'Layout',
              alwaysShow: true,
              meta: { title: '系统管理', icon: 'system', noCache: false },
              children: [
                {
                  name: 'User',
                  path: 'user',
                  hidden: false,
                  component: 'system/user/index',
                  meta: { title: '用户管理', icon: 'user', noCache: false }
                }
              ]
            },
            {
              name: 'StatisticalStatement',
              path: '/statisticalStatement',
              hidden: false,
              redirect: 'noRedirect',
              component: 'Layout',
              alwaysShow: true,
              meta: { title: '统计报表', icon: 'date', noCache: false },
              children: [
                {
                  name: 'Index',
                  path: 'index',
                  hidden: false,
                  component: 'statisticalStatement/statisticalStatement/index',
                  meta: { title: '统计报表', icon: 'user', noCache: false }
                }
              ]
            }
          ]
        }
        const sdata = JSON.parse(JSON.stringify(res.data))
        const rdata = JSON.parse(JSON.stringify(res.data))
        const sidebarRoutes = filterAsyncRouter(sdata)
        const rewriteRoutes = filterAsyncRouter(rdata, true)
        rewriteRoutes.push({ path: '*', redirect: '/404', hidden: true })
        commit('SET_ROUTES', rewriteRoutes)
        commit('SET_SIDEBAR_ROUTERS', sidebarRoutes)
        resolve(rewriteRoutes)
        // })
      })
    }
  }
}

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap, isRewrite = false) {
  return asyncRouterMap.filter(route => {
    if (isRewrite && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else {
        route.component = loadView(route.component)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, isRewrite)
    }
    return true
  })
}

function filterChildren(childrenMap) {
  var children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView') {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    children = children.concat(el)
  })
  return children
}

export const loadView = view => {
  // 路由懒加载
  return resolve => require([`@/views/${view}`], resolve)
}

export default permission
