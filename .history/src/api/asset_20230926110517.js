import request from '@/utils/request'

// export function listAssets(params) {
//   return request({
//     url: '/asset/list',
//     method: 'get',
//     params
//   })
// }
export function listAssets(params) {
  return request({
    url: '/asset/page',
    method: 'get',
    params
  })
}
