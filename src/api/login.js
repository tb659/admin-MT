import request from '@/utils/request'

// 登录方法
export function login(username, password, code, uuid) {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data: data,
    // headers: {
    //   isToken: false
    //   // 可以自定义 Authorization
    //   // 'Authorization': 'Basic d2ViOg=='
    // },
    // baseURL: process.env.VUE_APP_BASE_API // 覆盖 不同的baseURL
  });
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getInfo',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
