import request from '@/utils/request'

export default{
  fileUpload() {
    return request({
      url: `/system/upload`,
      method: 'post',
      params: obj
    })

  }




}
