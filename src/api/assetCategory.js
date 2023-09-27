import request from '@/utils/request'


export default {

  listAssetCategory() {
    return request({
      url: `/assetCategory/list`,
      method: 'get'
    })
  },

}


