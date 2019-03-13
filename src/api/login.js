import request from '@/utils/request'

export function loginByUsername(data) {
  // const data = {
  //   // username,
  //   // password
  // }
  return request({
    url: '/v1/login',
    method: 'post',
    data
  })
}
// 重置密码
export function resetPassword(data) {
  return request({
    url: '/v1/forgotpassword',
    method: 'post',
    data
  })
}
// 忘记密码发送验证码
export function forgetSendMa(data) {
  return request({
    url: '/v1/forgotpassword/verification',
    method: 'get',
    params: data
  })
}
// 用户登录
export function userLogin(data) {
  return request({
    url: '/v1/login',
    method: 'post',
    data
  })
}
// 邮箱注册发送验证码
export function sendma(data) {
  console.log(data)
  return request({
    url: '/v1/register/verification',
    method: 'get',
    params: { ...data }
  })
}
// 用户注册
export function userRegister(data) {
  // const data = {
  //   // username,
  //   // password
  // }
  return request({
    url: '/v1/user',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: 'v1/user/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/v1/user',
    method: 'get'
  })
}
// 加载配置文件
export function getConfigs() {
  return request({
    url: '/v1/config/info',
    method: 'get'
  })
}

