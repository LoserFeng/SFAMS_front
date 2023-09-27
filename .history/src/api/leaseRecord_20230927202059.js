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
      method: 'post',
      data: assetLeaseRecord
    })
  },
  revert(assetNumber) {

    console.log("assetNumber: " + assetNumber)
    return request({
      url: `/assetLease/revert`,
      method: 'post',
      params: assetNumber
    })

  }

}


