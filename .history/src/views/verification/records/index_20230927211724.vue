<template>
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="Index" width="95">
        <template slot-scope="scope">
          {{ scope.$index + limit*(current-1) }}
        </template>
      </el-table-column>
      <el-table-column label="AssetNumber">
        <template slot-scope="scope">
          {{ scope.row.assetNumber }}
        </template>
      </el-table-column>
      <el-table-column label="AssetName">
        <template slot-scope="scope">
          {{ scope.row.assetName }}
        </template>
      </el-table-column>
      <el-table-column label="UserNumber" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column label="UserName" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>


      <el-table-column label="VerificationDate" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.VerificationDate }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.statusName }}</span>
        </template>
      </el-table-column>



      <el-table-column label="Status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.verificationDate }}</span>
        </template>
      </el-table-column>










    </el-table>
    <el-pagination :current-page="current" :page-size="limit" :total="total" style="padding:30px 0;text-align:center;"
      layout="total,prev,pager,next,jumper" @current-change="togglePageList" />
  </div>
</template>

<script>
import leaserecordApi from '@/api/leaseRecord'

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
      current: 1, // 当前页
      limit: 5, // 每页显示记录数
      searchObj: {}, // 条件封装对象
      list: [], // 每页数据集合
      total: 0, // 总记录数
      multipleSelection: [],
      kindList: [],   // 种类列表
      listLoading: true
    }
  },
  created() {
    // this.initAssetList()
    this.togglePageList();
  },
  methods: {
    // fetchData() {
    //   this.listLoading = true
    //   leaserecordApi.pageRecords().then(response => {
    //     this.list = response.data.records
    //     this.listLoading = false
    //   })
    // },
    togglePageList(page = 1) {
      this.current = page
      leaserecordApi
        .pageRecords(this.current, this.limit, this.searchObj)
        .then((response) => {
          this.list = response.data.records
          this.total = response.data.total
          console.log(response)
          console.log('执行成功!')
          console.log(this.list)
          this.listLoading = false
        })
        .catch((error) => {
          console.log('出错了')
          console.log(error)
        })
      console.log("toggle to page:" + page)

    }


  }
}
</script>
