import request from '@/utils/request'

export default {

  pageRecords(page, limit, obj) {
    return request({
      url: `/verification/page/${page}/${limit}`,
      method: 'get',
      params: obj
    })
  },
  check(verification) {
    return request({
      url: `/verification/check`,
      method: 'post',
      params: obj
    })
  },



}


