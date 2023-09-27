import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/asset/list',
    method: 'get',
    params
  })
}
