<template>
  <div class="app-container">
    <h3 align="center">固定资产归还</h3>
    <el-form label-width="120px">
      <el-form-item label="资产编号">
        <el-input v-model="assetNumber" />
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="confirm">确认
        </el-button></el-form-item>
    </el-form>
  </div>
</template>
<script>
import leaserecordApi from '@/api/leaseRecord'

export default {
  data() {
    return {
      record: {},
      assetNumber:null,

      assetId: null

    }
  },
  created() {

    this.record = {}
  },
  methods: {
    confirm() {
      if (this.assetNumber == null||this.assetNumber.length == 0) {
        alert("请输入要归还的资产编号");

      }


      leaserecordApi
        .revert(this.assetNumber).then((response) => {
          this.$message({
            type: 'success',
            message: '归还成功!'
          })

        })

      this.$router.push({ path: `/asset_lease/records` })
    }
  }
}
</script>
<style>
.cover-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.cover-uploader .el-upload:hover {
  border-color: #409EFF;
}

.cover-uploader .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 640px;
  height: 357px;
  line-height: 357px;
  text-align: center;
}

.cover-uploader img {
  width: 640px;
  height: 357px;
  display: block;
}

.tinymce-container {
  position: relative;
  line-height: normal;
}
</style>

