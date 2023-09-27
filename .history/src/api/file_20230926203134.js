import request from '@/utils/request'

export default{
  fileUpload() {
    return request({
      url: `/asset/page/${page}/${limit}`,
      method: 'get',
      params: obj
    })

  }




}
