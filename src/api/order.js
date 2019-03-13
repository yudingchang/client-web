import request from '@/utils/request'
import qs from 'qs'

export function order(data) {
  return request({
    url: '/v1/inspection',
    method: 'post',
    data: data,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 通过Id请求数据
export function orderId(ID) {
  return request({
    url: '/v1/inspection' + ID,
    method: 'get'
  })
}

// 根据供应商名字查找其他信息
export function getOtherMessage(data) {
  return request({
    url: data.url,
    method: 'get',
    params: data
  })
}

// 获取所有的订单
export function getList(data, page, limit) {
  return request({
    url: '/v1/inspection',
    method: 'get',
    params: {
      searches: data,
      page,
      limit
    },
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 根据订单ID关闭订单
export function CloseOrder(data) {
  return request({
    url: `/v1/inspection/${data.orderId}/close`,
    method: 'put',
    params: data,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 根据订单ID删除订单
export function DeleteOrder(data) {
  return request({
    url: `/v1/inspection/${data.orderId}`,
    method: 'delete',
    params: data,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 根据订单ID退单
export function RefundOrder(data) {
  return request({
    url: `/v1/order/${data.orderId}/refund`,
    method: 'put',
    params: data,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 获取订单前期数据
export function orderDetail(data) {
  return request({
    url: data.url,
    method: 'get'
    // params:data
  })
}
// 预付款
export function confirmPay(data) {
  return request({
    url: data.url,
    method: 'get'
    // params:data
  })
}
// 付款
export function surePay(data) {
  return request({
    url: data.url,
    method: 'get',
    params: data
  })
}
// 获取订单详情
export function getOrderList(data) {
  return request({
    url: data.url,
    method: 'get'
    //   params:data
  })
}

// put放保存修改后的订单信息
export function orderRevise(data) {
  return request({
    url: '/v1/inspection/' + data.orderId,
    method: 'put',
    data: data,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 修改删除订单产品
export function productDelete(data) {
  return request({
    url: '/v1/inspection/product/' + data.id,
    method: 'delete',
    data: data,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 获取待完成订单信息
export function getWaitComplete(data) {
  return request({
    url: '/v1/dashboard',
    method: 'get',
    data: data
  })
}
