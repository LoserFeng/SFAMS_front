<template>
  <div class="app-container">
    <h3 align="center">固定资产录入</h3>
    <el-form label-width="120px">
      <el-form-item label="资产名称">
        <el-input v-model="assetVo.asset.name" />
      </el-form-item>

      <el-form-item label="资产类型">
        <!-- 一级分类 -->
        <el-select v-model="assetVo.asset.assetCategoryId" placeholder="请选择">
          <el-option v-for="subject in assetCategoryList" :key="subject.id" :label="subject.assetCategoryName" :value="subject.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="资产原值">
        <el-input v-model="assetVo.asset.netValue" />
      </el-form-item>
      <el-form-item label="规格">
         <el-input v-model="assetVo.asset.specification" />
      </el-form-item>
      <el-form-item label="品牌 型号">
          <el-input v-model="assetVo.asset.brandModel" />
      </el-form-item>
      <el-form-item label="物品图示">
        <el-upload :show-file-list="false" :on-success="handleCoverSuccess" :before-upload="beforeCoverUpload"
          :on-error="handleCoverError" class="cover-uploader"
          action="upload">
          <img v-if="assetVo.asset.assetPhoto" :src="assetVo.asset.assetPhoto">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="assetVo.asset.quantity" />
      </el-form-item>
      <el-form-item label="预计使用年限">
        <el-input v-model="assetVo.asset.expectedLife" />
      </el-form-item>
      <el-form-item label="购置日期" required>
        <el-date-picker
            v-model="assetVo.asset.acquisitionDate"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="assetVo.asset.notes" />
      </el-form-item>
      <el-form-item label="使用人">
        <el-input v-model="assetVo.asset.uerNumber" />
      </el-form-item>
      <el-form-item label="部门单位">
        <el-input v-model="assetVo.asset.apartmentId" />
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="saveOrUpdate">保存
        </el-button></el-form-item>
    </el-form>
  </div>
</template>
<script>
import assetApi from '@/api/asset'
import departmentApi from '@/api/department'
import assetcategoryApi from '@/api/assetCategory'
import fileApi from '@/api/file'

export default {
  data() {
    return {
      assetVo: { "asset": {} },
      assetCategoryList: [], // 种类列表
      departmentList: [],
      assetId: null

    }
  },
  created() {


    this.assetVo = { "asset": {} }
    this.initCategoryList()
    this.initDepartmentList()
    this.assetId = this.$route.query.id
    if (this.assetId) { this.init() }
  },
  methods: {
    initCategoryList() {
      assetcategoryApi.listAssetCategory().then(r => {
        this.categoryList = r.data.assetCategoryList
      })
    },
    initDepartmentList() {
      departmentApi.listDepartment().then(r => {
        this.departmentList = r.data.departmentList
      })
    },
    init() {
      assetApi.getAssetById(this.assetId).then(response => {
        this.assetVo = {"asset": response.data.asset }
      })
    },
    saveOrUpdate() {
      this.save()
    },
    save() {
      if (!this.asset.id) {
        assetApi.addasset(this.assetVo.asset)
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
    upload(file) {

      fileApi.fileUpload(file).then(r => {
        this.assetVo.asset.assetPhoto=r.data
      })

    }


    ,
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
      const isLt2M = file.size / 1024 / 1024 < 4

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 4MB!')
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

