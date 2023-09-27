import request from '@/utils/request'

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
      url: `/assetLease/revert/${assetNumber}`,
      method: 'post'
    })

  }

}


