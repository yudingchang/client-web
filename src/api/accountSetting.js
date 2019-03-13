import request from '@/utils/request'
import qs from 'qs'

// 验证登录密码是否正确
export function validpassword(query) {
  return request({
    url: '/v1/inspector/validpassword',
    method: 'post',
    data: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 验证登录密码是否正确
export function resetpassword(query) {
  return request({
    url: '/v1/inspector/resetpassword',
    method: 'post',
    data: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 修改用户手机号，电子邮箱
export function changeUserInfo(query) {
  return request({
    url: '/v1/inspector/info',
    method: 'post',
    data: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

//   设置支付密码
export function set_password(query) {
  return request({
    url: '/v1/inspector/set_password',
    method: 'post',
    data: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

//  验证支付密码
export function verifypaypassword(query) {
  return request({
    url: '/v1/inspector/verifypaypassword',
    method: 'post',
    data: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

//  重置支付密码
export function resetpaypassword(query) {
  return request({
    url: '/v1/inspector/resetpaypassword',
    method: 'post',
    data: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 重置支付密码发送验证码
export function forgotpaypasswordMa(query) {
  return request({
    url: '/v1/forgotpaypassword/verification',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}
// 重置支付密码忘记密码
export function forgotpaypassword(query) {
  return request({
    url: '/v1/forgotpaypassword',
    method: 'post',
    params: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 发送验证码
export function sendMa(data) {
  return request({
    url: '/v1/verificationcode/send',
    method: 'GET',
    params: data
  })
}

