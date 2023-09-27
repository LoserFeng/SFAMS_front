<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="Index" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="AssetNumber">
        <template slot-scope="scope">
          {{ scope.row.asset.assetNumber }}
        </template>
      </el-table-column>
      <el-table-column label="AssetName">
        <template slot-scope="scope">
          {{ scope.row.asset.assetName }}
        </template>
      </el-table-column>
      <el-table-column label="Specification"  align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.asset.specification }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Quantity" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.asset.quantity }}</span>
        </template>
      </el-table-column>

      <el-table-column label="Status" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.statusName }}</span>
        </template>
      </el-table-column>

        <!-- <el-table-column label="Status" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.statusName }}</span>
          </template>
        </el-table-column> -->

<!--
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column> -->



      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column> -->



      <!-- <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)">删除</el-button>
          <router-link :to="'/asset_information/add?id=' + scope.row.asset.id">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="updateDataById(scope.row.asset.id)"
            >修改</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="current"
      :page-size="limit"
      :total="total"
      style="padding:30px 0;text-align:center;"
      layout="total,prev,pager,next,jumper"
      @current-change="togglePageList"
    />
  </div>
</template>

<script>
import assetApi from '@/api/asset'

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
      limit: 2, // 每页显示记录数
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
    fetchData() {
      this.listLoading = true
      pageAssets().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    togglePageList(page=1) {
      this.current = page
      assetApi
        .pageAssets(this.current, this.limit, this.searchObj)
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
      console.log("toggle to page:"+page)

    }, removeDataById(id) {


       this.$confirm('此操作将永久删除仓库物品信息,是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(response => {
        assetApi.removeAssetById(id).then((response) => {
          // 提示
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })

        console.log("if toggle?")
        this.togglePageList(this.current);
      })



    }, updateDataById(id) {
      this.$router.push({ path: `/asset_information/add?id=${id}`})

    }


  }
}
</script>
