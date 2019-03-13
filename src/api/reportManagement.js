import request from '@/utils/request'

// 获取报告管理列表信息
export function getReportManagement(data) {
  return request({
    url: '/v1/report',
    method: 'get',
    params: data
  })
}

// 报告详情页面
export function getReportSelf(url) {
  return request({
    url: url,
    method: 'get'
    // params: data
  })
}

