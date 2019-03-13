import request from '@/utils/request'
import qs from 'qs'

// 请求全部国家
export function fetchList(url, query) {
  return request({
    url: 'v1/location/list/all_country',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}

// 请求省市区
export function fetchCounty(query) {
  return request({
    url: 'v1/location/list/country_pcd',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}
