import request from '@/utils/request'

// export function listAssets(params) {
//   return request({
//     url: '/asset/list',
//     method: 'get',
//     params
//   })
// }

export default {

  pageAssets(page, limit, obj) {
    return request({
      url: `/asset/page/${page}/${limit}`,
      method: 'get',
      params: obj
    })
  },

  getAssetById(id) {
    return request({
      url: `/asset/details/${id}`,
      method: 'get'
    })
}
,

  removeAssetById(id) {
    return request({
      url: `/asset/remove/${id}`,
      method: 'delete'
    })
  },
  addAsset(asset) {
    return request({
      url: `/asset/input`,
      method: 'post',
      data: asset
    })
  }

}


