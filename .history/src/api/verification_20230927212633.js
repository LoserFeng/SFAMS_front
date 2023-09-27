import request from '@/utils/request'

export default {

  pageRecords(page, limit, obj) {
    return request({
      url: `/verification/page/${page}/${limit}`,
      method: 'get',
      params: obj
    })
  },
  pageRecords(page, limit, obj) {
    return request({
      url: `/assetLease/page/${page}/${limit}`,
      method: 'get',
      params: obj
    })
  },



}


