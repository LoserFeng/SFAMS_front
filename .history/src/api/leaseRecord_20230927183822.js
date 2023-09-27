import request from '@/utils/request'

// export function listAssets(params) {
//   return request({
//     url: '/asset/list',
//     method: 'get',
//     params
//   })
// }

export default {

  pageRecords(page, limit, obj) {
    return request({
      url: `/assetLease/page/${page}/${limit}`,
      method: 'get',
      params: obj
    })
  },
  lend(assetLeaseRecord) {
    return request({
      url: `/assetLease/lend`,
      method: 'get',
      data: assetLeaseRecord
    })


  },
  revert(assetNumber) {


  }

}


