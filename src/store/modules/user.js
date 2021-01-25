import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
        .then(res => {
        setToken(res.token)
        commit('SET_TOKEN', res.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // getInfo(state.token).then(res => {
        console.log('----------------------------获取用户信息接口')
        let res = {
          msg: '操作成功',
          code: 200,
          permissions: ['*:*:*'],
          roles: ['admin'],
          user: {
            searchValue: null,
            createBy: 'admin',
            createTime: '2021-01-21 23:10:54',
            updateBy: null,
            updateTime: null,
            remark: '管理员',
            params: {},
            userId: 1,
            deptId: 103,
            userName: 'admin',
            nickName: '若依',
            email: 'ry@163.com',
            phonenumber: '15888888888',
            sex: '1',
            avatar: '',
            salt: null,
            status: '0',
            delFlag: '0',
            loginIp: '127.0.0.1',
            loginDate: '2021-01-21T23:10:54.000+0800',
            dept: {
              searchValue: null,
              createBy: null,
              createTime: null,
              updateBy: null,
              updateTime: null,
              remark: null,
              params: {},
              deptId: 103,
              parentId: 101,
              ancestors: null,
              deptName: '研发部门',
              orderNum: '1',
              leader: '若依',
              phone: null,
              email: null,
              status: '0',
              delFlag: null,
              parentName: null,
              children: []
            },
            roles: [
              {
                searchValue: null,
                createBy: null,
                createTime: null,
                updateBy: null,
                updateTime: null,
                remark: null,
                params: {},
                roleId: 1,
                roleName: '超级管理员',
                roleKey: 'admin',
                roleSort: '1',
                dataScope: '1',
                menuCheckStrictly: false,
                deptCheckStrictly: false,
                status: '0',
                delFlag: null,
                flag: false,
                menuIds: null,
                deptIds: null,
                admin: true
              }
            ],
            roleIds: null,
            postIds: null,
            admin: true
          }
        }
        const user = res.user
        const avatar = user.avatar == '' ? require('@/assets/images/profile.jpg') : process.env.VUE_APP_BASE_API + user.avatar
        if (res.roles && res.roles.length > 0) {
          // 验证返回的roles是否是一个非空数组
          commit('SET_ROLES', res.roles)
          commit('SET_PERMISSIONS', res.permissions)
        } else {
          commit('SET_ROLES', ['ROLE_DEFAULT'])
        }
        commit('SET_NAME', user.userName)
        commit('SET_AVATAR', avatar)
        resolve(res)
      }).catch(error => {
        reject(error)
      })
      // })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token)
        //   .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            commit('SET_PERMISSIONS', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      // })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
