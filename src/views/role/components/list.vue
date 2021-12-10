<template>
  <div class="role">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>筛选搜索</span>
         <el-form :inline="true"
          :model="form"
          class="demo-form-inline"
          style="margin-top: 30px"
          ref="search-role-form"
        >
            <el-form-item label="输入搜索" prop='name'>
              <el-input v-model="form.name" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item class="btnCls btn1">
              <el-button size="small" type="primary" @click="searchRole" :disabled='isLoading'>查询搜索</el-button>
            </el-form-item>
            <el-form-item class="btnCls btn2">
              <el-button size="small" @click='onReset' :disabled='isLoading'>重置</el-button>
            </el-form-item>
          </el-form>
      </div>
      <div>
        <el-button size="small" type="primary" @click="handleAdd" :disabled='isLoading' >添加角色</el-button>
      </div>
    </el-card>
    <el-card class="box-card" shadow="never" style="margin-top: 10px">
      <el-table
        border
        :data="roles"
        style="width: 100%;"
         v-loading="isLoading"
      >
        <el-table-column
          align='center'
          prop="id"
          label="编号"
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          prop="name"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          prop="description"
          label="描述">
        </el-table-column>
        <el-table-column
          align='center'
          prop="createdTime"
          :formatter='carTimeFilter'
          label="添加时间">
        </el-table-column>
        <el-table-column
          align='center'
          label="操作"
          width="140"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="allcoMenu(scope.row)">分配菜单</el-button>
            <el-button type="text" size="small" @click='allcoResource(scope.row)'>分配资源</el-button>
            <el-button type="text" size="small" @click='handleEdit(scope.row)'>编辑</el-button>
            <el-button type="text" size="small" @click='handleDelete(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="form.current"
      :page-sizes="[2, 5, 10, 20, 30, 50, 100]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- :before-close="handleClose" -->
    <el-dialog
      :title="isEdit?'编辑角色':'添加角色'"
      :visible.sync="dialogVisible"
      width="30%">
      <!-- v-if="dialogVisible" 解决弹出层默认缓存的问题-->
      <create-or-edit
      v-if="dialogVisible"
      @success='onSuccess'
      @cancel='dialogVisible = false'
      :roleId='roleId'
      :isEdit='isEdit'
      />
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import { getRolePages, deleteRoleById } from '@/services/role'
import CreateOrEdit from './createOrEdit.vue'
export default Vue.extend({
  name: 'RoleList',
  data () {
    return {
      roles: [],
      dialogVisible: false, // 控制添加/编辑角色对话框的显示和隐藏
      roleId: null, // 编辑角色的Id
      isEdit: false,
      form: {
        current: 1, // 当前页，默认1
        size: 5, // 每页数据条数
        name: ''
      },
      isLoading: true,
      total: 0 // 数据总条数
    }
  },
  components: {
    CreateOrEdit
  },
  created () {
    this.loadRoles()
  },
  methods: {
    carTimeFilter (row, column) {
      const daterc = row[column.property]
      if (daterc) {
        return new Date(daterc).toLocaleDateString()
      }
    },
    async loadRoles () {
      this.isLoading = true
      const { data } = await getRolePages(this.form)
      if (data.code === '000000') {
        this.roles = data.data.records
        this.total = data.data.total
      }
      this.isLoading = false
    },
    onSuccess () {
      this.dialogVisible = false // 关闭对话框
      this.$message.success('操作成功')
      this.loadRoles() // 重新加载数据列表
    },
    handleEdit (row) {
      this.dialogVisible = true
      this.isEdit = true
      this.roleId = row.id
    },
    async handleDelete (row) {
      this.$confirm('确认删除么？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteRoleById(row.id)
          if (data.code === '000000') {
            this.loadRoles()
            this.$message.success('删除成功')
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleAdd () {
      this.isEdit = false
      this.dialogVisible = true
    },
    allcoMenu (row) {
      this.$router.push({
        name: 'alloc-menu',
        params: {
          roleId: row.id
        }
      })
    },
    allcoResource (row) {
      this.$router.push({
        name: 'alloc-resource',
        params: {
          roleId: row.id
        }
      })
    },
    searchRole () {
      this.form.current = 1
      this.loadRoles()
    },
    onReset () {
      this.$refs['search-role-form'].resetFields()
      this.form.current = 1
      this.loadRoles()
    },
    handleSizeChange (val) {
      this.form.size = val
      this.form.current = 1
      this.loadRoles()
    },
    handleCurrentChange (val) {
      this.form.current = val
      this.loadRoles()
    }
  }
})
</script>

<style lang= 'scss' scoped>
.el-form {
  position: relative;
}
.btnCls {
  position: absolute;
  top: -57px;
}
.btn1 {
 right: 0;
}
.btn2 {
  right: 100px;
}
</style>
