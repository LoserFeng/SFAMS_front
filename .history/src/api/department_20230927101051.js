import request from '@/utils/request'


export default {

  listDepartment() {
    return request({
      url: `/department/list`,
      method: 'get'
    })
  },

}
