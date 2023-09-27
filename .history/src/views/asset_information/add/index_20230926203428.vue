<template>
  <div class="app-container">
     <div>
      <input type="file" ref="fileInput" @change="uploadFile">
    </div>
  </div>
</template>

<script>
import fileApi  from '@/api/file'

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
    uploadFile(file) {

      fileApi.uploadFile(file)
    }

  }
}
</script>
