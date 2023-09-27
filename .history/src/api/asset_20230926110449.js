import request from '@/utils/request'

export function listAssets(params) {
  return request({
    url: '/asset/list',
    method: 'get',
    params
  })
}
