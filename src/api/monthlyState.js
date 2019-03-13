import request from '@/utils/request'

export function outAccountData(query) {
  return request({
    url: '/v1/payment/iou/bill',
    method: 'get',
    params: query
  })
}

export function monthlyBillData(query) {
  return request({
    url: '/v1/payment/iou/bill/already/38',
    method: 'get',
    params: query
  })
}

export function ReimbursementData(query) {
  return request({
    url: '/v1/payment/iou/bill/reimbursement',
    method: 'get',
    params: query
  })
}

export function outstandingAccount(query) {
  return request({
    url: '/v1/payment/iou/bill/already/38',
    method: 'get',
    params: query
  })
}

export function AccountDeData(query) {
  return request({
    url: '/v1/payment/iou/bill/already/38',
    method: 'get',
    params: query
  })
}

export function ReimbursementDetailData(query) {
  return request({
    url: '/v1/payment/iou/bill/already/37',
    method: 'get',
    params: query
  })
}

// 新增发票信息
export function editFormVisibleData(data) {
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
