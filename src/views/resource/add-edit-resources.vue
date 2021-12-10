<template>
  <div class="classifResources">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button size="small" @click='onAdd'>添加</el-button>
      </div>
       <el-table
        border
        :data="resourceCategories"
        style="width: 100%;">
        <el-table-column
          prop="id"
          align="center"
          label="编号"
          width="200">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="名称"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="createdTime"
          align="center"
          :formatter='carTimeFilter'
          label="创建时间"
           min-width="180">
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
           min-width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
           min-width="180">
             <template slot-scope="scope">
                <el-button
                @click="onEdit(scope.row)"
                type="text"
                size="small"
              >编辑</el-button>
                <el-button
                type="text"
                size="small"
                @click="onDelete(scope.row)"
              >删除</el-button>
             </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="isEdit?'编辑分类':'添加分类' "
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form label-width="80px"
      :model="form"
      ref='resource-edit-add-tree'
      >
        <el-form-item label="名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onConfirm()">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { getResourceCategoryPages, saveOrderUpdate, deleteCategory } from '@/services/resource-category'
export default Vue.extend({
  name: 'ResourceClassification',
  data () {
    return {
      resourceCategories: [],
      dialogVisible: false,
      isEdit: false,
      form: {
        name: '',
        sort: 0
      }
    }
  },
  created () {
    this.loadResourceCategories()
  },
  methods: {
    async loadResourceCategories () {
      const { data } = await getResourceCategoryPages()
      this.resourceCategories = data.data
    },
    carTimeFilter (row, column) {
      const daterc = row[column.property]
      if (daterc != null) {
        return new Date(daterc).toLocaleDateString()
      }
    },
    onAdd () {
      this.form.name = ''
      this.form.sort = 0
      this.isEdit = false
      this.dialogVisible = true
    },
    async onConfirm () {
      const form = Object.assign({}, this.row, this.form)
      this.row = null
      const { data } = await saveOrderUpdate(form)
      this.$message.success(data.mesg)
      this.dialogVisible = false
      this.loadResourceCategories()
    },
    onEdit (row) {
      this.row = row
      this.form.name = row.name
      this.form.sort = row.sort
      this.isEdit = true
      this.dialogVisible = true
    },
    onDelete (row) {
      this.$confirm('确认删除么？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteCategory(row.id)
          if (data.code === '000000') {
            this.loadResourceCategories()
            this.$message.success('删除成功')
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
