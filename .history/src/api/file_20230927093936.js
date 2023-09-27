import request from '@/utils/request'

export default{
  fileUpload(obj) {
    return request({
      url: `/system/upload`,
      method: 'post',
      params: obj
    })

  }

}
