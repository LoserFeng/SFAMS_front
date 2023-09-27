<template>
  <div class="app-container">
     <div>
      <input type="file" ref="fileInput" @change="uploadFile">
    </div>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {

    }
  },
  created() {

  },
  methods: {


  }
}
</script>
