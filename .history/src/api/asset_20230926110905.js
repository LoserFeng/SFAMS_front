import request from '@/utils/request'

// export function listAssets(params) {
//   return request({
//     url: '/asset/list',
//     method: 'get',
//     params
//   })
// }
export function listAssets(page, limit, obj) {
  return request({
    url: '/asset/page/${page}/${limit}',
    method: 'get',
    params: obj
  })
}

export function getAssetById(id) {
  return request({
    url: `/asset/details/${id}`,
    method: 'get'
  })
}


export function removeAssetById(id) {
  return request({
    url: `/asset/remove/${id}`,
    method: 'delete'
  })
}
