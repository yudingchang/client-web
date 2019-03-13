import request from '@/utils/request'
import qs from 'qs'

export function getConfigInfo(query) {
  return request({
    url: 'v1/config/info',
    method: 'get',
    params: query,
    paramsSerializer: function(params) {
      return qs.stringify(params, { indices: true })
    }
  })
}
