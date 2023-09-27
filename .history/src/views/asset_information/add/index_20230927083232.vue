<template>
  <div class="app-container">
    <h3 align="center">固定资产录入</h3>
    <el-form label-width="120px">
      <el-form-item label="资产名称">
        <el-input v-model="asset.name" />
      </el-form-item>

      <el-form-item label="资产类型">
        <!-- 一级分类 -->
        <el-select v-model="asset.kind" placeholder="请选择">
          <el-option v-for="subject in kindList" :key="subject.id" :label="subject.name" :value="subject.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="资产原值">
        <el-input v-model="asset.description" />
      </el-form-item>
      <el-form-item label="规格">
         <el-input v-model="asset.description" />
      </el-form-item>
      <el-form-item label="品牌 型号">
          <el-input v-model="asset.description" />
      </el-form-item>
      <el-form-item label="物品图示">
        <el-upload :show-file-list="false" :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload"
          :on-error="handleCoverError" class="cover-uploader"
          action="http://localhost:8140/admin/asset/upload?module=cover">
          <img v-if="asset.cover" :src="asset.cover">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="初始数量">
        <el-input v-model="asset.number" />
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="asset.price" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存
        </el-button></el-form-item>
    </el-form>
  </div>
</template>
<script>
import assetApi from '@/api/asset'
export default {
  data() {
    return {
      asset: {},
      kindList: [] // 种类列表
    }
  },
  created() {
    this.asset = {}
    this.initKindList()
    this.asset.id = this.$route.query.id
    if (this.asset.id) { this.init() }
  },
  methods: {
    initKindList() {
      assetApi.listKind().then(r => {
        this.kindList = r.data
      })
    },
    init() {
      assetApi.getassetById(this.asset.id).then(response => {
        this.asset = response.data
      })
    },
    saveOrUpdate() {
      this.save()
    },
    save() {
      if (!this.asset.id) {
        assetApi.addasset(this.asset)
          .then((response) => {
            // 提示
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.kinds.name = ''
          })
      } else {
        assetApi.updateasset(this.asset)
          .then((response) => {
            // 提示
            this.$message({
              type: 'success',
              message: '修改成功!'
            })
            this.kinds.name = ''
          })
      }
    },
    // 上传成功回调
    handleCoverSuccess(res, file) {
      if (res.success) {
        // console.log(res)
        this.asset.cover = res.data
        console.log('res.data.url:' + res.data)
        // 强制重新渲染
        this.$forceUpdate()
      } else {
        this.$message.error('上传失败1')
      }
    },
    // 上传校验
    beforeCoverUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },

    // 错误处理
    handleCoverError() {
      console.log('error')
      this.$message.error('上传失败2')
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

