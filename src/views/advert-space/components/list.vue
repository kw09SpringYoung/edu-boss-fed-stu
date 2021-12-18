<template>
  <div class="advert-space-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="addAdvertSpace">添加广告位</el-button>
      </div>

      <el-table
        border
        :data="advertSpaces"
        style="width: 100%">
        <el-table-column
          center
          prop="spaceKey"
          label="spaceKey"
          width="180">
        </el-table-column>
        <el-table-column
          center
          prop="name"
          label="广告名称"
          width="180">
        </el-table-column>
        <el-table-column
          center
          prop="createTime"
          label="创建时间"
          :formatter="setDate">
        </el-table-column>
        <el-table-column
          center
          prop="updateTime"
          :formatter="setDate"
          label="更新时间">
        </el-table-column>
        <el-table-column
          center
          label="操作">
          <template slot-scope="scope">
              <el-button type="warning" size="small" @click="handleEditClick(scope.row)">编辑</el-button>
              <!-- <el-button type="text" size="small" @click="handleDeleteClick(scope.row)">删除</el-button> -->
            </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { getAllSpaces } from '@/services/advert'
export default Vue.extend({
  name: 'AdvertSpacelist',
  data () {
    return {
      advertSpaces: []
    }
  },
  created () {
    this.loadAdvertSpaces()
  },
  methods: {
    async loadAdvertSpaces () {
      const { data } = await getAllSpaces()
      this.advertSpaces = data.content
    },
    // handleDeleteClick (row) {
    // this.$confirm('确认删除么？', '删除提示', {})
    //   .then(async () => {
    //     const { data } = await deleteAdvertsItem(row.id)
    //     if (data.code === '000000') {
    //       this.$message.success('删除成功')
    //       this.loadAllAdverts()
    //     }
    //   })
    //   .catch(() => {
    //     this.$message.info('已取消删除')
    //   })
    // },
    addAdvertSpace () {
      this.$router.push({
        name: 'addAdvertSpace'
      })
    },
    handleEditClick (row) {
      this.$router.push({
        name: 'editAdvertSpace',
        params: { id: row.id }
      })
    },
    setDate (row, column) {
      return new Date(row[column.property]).toLocaleString()
    }
  }
})
</script>

<style lang= 'scss' scoped>

</style>
