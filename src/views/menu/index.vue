<template>
  <div class="menu">
    <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="$router.push({name: 'menu-create'})">添加菜单</el-button>
    </div>
    <el-table
      border
      :data="menus"
      style="width: 100%"
      >
      <el-table-column
        align="center"
        type='index'
        width="180px"
        label="编号">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="菜单名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="level"
        label="菜单级数">
      </el-table-column>
      <el-table-column
        align="center"
        prop="icon"
        label="前端图标">
      </el-table-column>
      <el-table-column
        align="center"
        prop="orderNum"
        label="排序">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
         <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDeleteClick(scope.row)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { getAll, deleteMenuItem } from '@/services/menu'
export default Vue.extend({
  name: 'MenuIndex',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadAllMenu()
  },
  methods: {
    async loadAllMenu () {
      const { data } = await getAll()
      if (data.code === '000000') {
        this.menus = data.data
      }
    },
    handleDeleteClick (row) {
      this.$confirm('确认删除么？', '删除提示', {})
        .then(async () => {
          const { data } = await deleteMenuItem(row.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            this.loadAllMenu()
          }
        })
        .catch(() => {
          this.$message.info('已取消删除')
        })
    },
    handleEditClick (row) {
      this.$router.push({
        name: 'menu-edit',
        params: { id: row.id }
      })
    }
  }
})
</script>

<style lang= 'scss' scoped>

</style>
