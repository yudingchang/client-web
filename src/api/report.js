import request from '@/utils/request'

export function reportManagementData(query) {
  return request({
    url: '/v1/payment/iou/bill',
    method: 'get',
    params: query
  })
}
