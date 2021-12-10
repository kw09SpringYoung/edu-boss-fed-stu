<template>
  <div class="resource">
    <el-card class="box-card">
      <el-form :inline="true" :model="form" class="demo-form-inline" ref='form'>
        <el-form-item prop='name' label="资源名称">
          <el-input v-model="form.name" placeholder="资源名称"></el-input>
        </el-form-item>
        <el-form-item prop='url' label="资源路径">
          <el-input v-model="form.url" placeholder="资源路径"></el-input>
        </el-form-item>
        <el-form-item prop='categoryId' label="资源分类">
          <el-select v-model="form.categoryId" placeholder="全部" clearable>
            <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in resourceCategories"
            :key='item.id'
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
          type="primary"
          @click="onReset('form')"
          :disabled='isLoading'
          >重置</el-button>
          <el-button type="primary"
           @click="onSubmit"
           :disabled='isLoading'
           >查询搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- button card -->
    <el-card class="box-card" shadow="never">
      <div>
        <el-button size="small" @click="handleAddClick">添加</el-button>
        <resource-classify/>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never">
      <el-table
      :data="resources"
       border
      style="width: 100%;margin-bottom: 20px"
      v-loading='isLoading'
      >
        <el-table-column
          align="center"
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="资源名称"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="url"
          min-width="180"
          label="资源路径">
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          align="center"
          prop="createdTime"
          label="添加时间"
          :formatter="carTimeFilter"
          >
        </el-table-column>
        <el-table-column
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEditClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small" @click="onDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- total 总条数  page-size 每页显示条目个数 -->
      <el-pagination
      :disabled='isLoading'
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="form.current"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
      </el-pagination>
      <!-- 弹窗 -->
      <el-dialog
        title="添加资源"
        :visible.sync="dialogVisible"
        width="30%"
       >
        <create-or-edit
        v-if="dialogVisible"
          :resourceCategories='resourceCategories'
          @onSuccess='onSuccessEvent'
          :isEdit='isEdit'
          :row='rowObj'
          @cancel='dialogVisible=false'
        />
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { getResourcePages, deleteResource } from '@/services/resource'
import { getResourceCategoryPages } from '@/services/resource-category'
import CreateOrEdit from './createOrEdit.vue'
import ResourceClassify from './resourceclassify.vue'
export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      resources: [],
      form: {
        current: 1, // 当前页，默认1
        size: 5, // 每页数据条数
        total: 0,
        categoryId: '',
        name: '',
        url: ''
      },
      totalCount: 0, // 数据总条数
      resourceCategories: [],
      isLoading: true,
      dialogVisible: false,
      isEdit: false,
      rowObj: null

    }
  },
  components: {
    CreateOrEdit,
    ResourceClassify
  },
  created () {
    this.loadResources()
    this.loadResourcesCategories()
  },
  methods: {
    carTimeFilter (row, column) {
      const daterc = row[column.property]
      if (daterc) {
        return new Date(daterc).toLocaleDateString()
      }
    },
    async loadResourcesCategories () {
      const { data } = await getResourceCategoryPages()
      this.resourceCategories = data.data
    },
    async loadResources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      this.resources = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },
    handleSizeChange (val) {
      this.form.size = val
      this.form.current = 1
      this.loadResources()
    },
    handleCurrentChange (val) {
      this.form.current = val
      this.loadResources()
      console.log(`当前页: ${val}`)
    },
    onSubmit () {
      this.form.current = 1 // 筛选查询从第一页开始
      this.loadResources()
    },
    onReset (formName) {
      this.$refs[formName].resetFields()
      this.form.current = 1
      this.loadResources()
    },
    handleEditClick (row) {
      this.dialogVisible = true
      this.isEdit = true
      this.rowObj = row
    },
    handleAddClick () {
      this.dialogVisible = true
      this.isEdit = false
    },
    onSuccessEvent () {
      this.dialogVisible = false
      this.loadResources()
    },
    onDelete (row) {
      this.$confirm('确认删除么？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteResource(row.id)
          if (data.code === '000000') {
            this.$message.success(data.mesg)
            this.loadResources()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style lang= 'scss' scoped>

</style>
