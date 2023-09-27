import request from '@/utils/request'

export default {

  check(page, limit, obj) {
    return request({
      url: `/assetLease/page/${page}/${limit}`,
      method: 'get',
      params: obj
    })
  },



}


